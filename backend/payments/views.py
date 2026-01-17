import razorpay
import hashlib
import hmac
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, views
import json
from .models import Order
from product.models import Product
from emails.services import (
    send_payment_success_email,
    send_payment_error_email,
    send_payment_admin_notification,
)

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


def decrease_product_stock(order):
    """
    Decrease product stock based on items in the order
    """
    try:
        items = order.items_snapshot
        print("DEBUG : Order items snapshot:", items)
        print("DEBUG : Type of items:", type(items))
        for item in items:
            try:
                print("DEBUG : Processing item:", item)
                product = Product.objects.get(id=item.get('product').get('id'))
                quantity = item.get('quantity', 1)
                product.stock = max(0, product.stock - quantity)
                product.save()
                print(f"DEBUG : Decreased stock for product {product.id} by {quantity}. New stock: {product.stock}")
            except Product.DoesNotExist:
                print(f"DEBUG : Product with ID {item.get('product_id') or item.get('id')} does not exist.")
                continue
    except Exception as e:
        print(f"Error decreasing stock for order {order.id}: {str(e)}")

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    """
    Create a Razorpay order
    """
    try:
        data = json.loads(request.body)
        user = request.user
        
        amount = int(data.get("amount", 0)) * 100  # INR → paise
        description = data.get("description", "Basho Studio Order")
        items = data.get("items", [])

        if amount <= 0:
            return JsonResponse(
                {"error": "Invalid amount"},
                status=400
            )

        # Create Razorpay order
        order_data = {
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        }
        
        razorpay_order = client.order.create(order_data)

        # Create Order record in database
        order = Order.objects.create(
            user=user,
            razorpay_order_id=razorpay_order["id"],
            amount=amount / 100,  # Convert back to rupees
            currency="INR",
            description=description,
            items_snapshot=items,
            status='pending'
        )

        return JsonResponse({
            "order_id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "key": settings.RAZORPAY_KEY_ID,
            "db_order_id": order.id
        })
    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )


@csrf_exempt
@require_http_methods(["POST"])
def verify_payment(request):
    """
    Verify Razorpay payment and send confirmation email
    """
    try:
        data = json.loads(request.body)
        
        razorpay_order_id = data.get('razorpay_order_id')
        razorpay_payment_id = data.get('razorpay_payment_id')
        razorpay_signature = data.get('razorpay_signature')

        if not all([razorpay_order_id, razorpay_payment_id, razorpay_signature]):
            return JsonResponse(
                {"error": "Missing payment details"},
                status=400
            )

        # Verify signature
        message = f"{razorpay_order_id}|{razorpay_payment_id}"
        generated_signature = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode(),
            message.encode(),
            hashlib.sha256
        ).hexdigest()

        if generated_signature != razorpay_signature:
            return JsonResponse(
                {"error": "Payment verification failed: Invalid signature"},
                status=400
            )

        # Get order from database
        try:
            order = Order.objects.get(razorpay_order_id=razorpay_order_id)
        except Order.DoesNotExist:
            return JsonResponse(
                {"error": "Order not found"},
                status=404
            )

        # Fetch payment details from Razorpay to confirm
        try:
            payment = client.payment.fetch(razorpay_payment_id)
            
            if payment['status'] == 'captured' or payment['status'] == 'authorized':
                # Update order status
                order.razorpay_payment_id = razorpay_payment_id
                order.razorpay_signature = razorpay_signature
                order.status = 'paid'
                order.save()

                # Decrease product stock for paid order
                print("DEBUG : Decreasing product stock for order", order.id)
                decrease_product_stock(order)

                # Send success email to user
                if order.user:
                    send_payment_success_email(order)
                    
                    # Send admin notification
                    send_payment_admin_notification(order, 'paid')

                return JsonResponse({
                    "success": True,
                    "message": "Payment verified successfully",
                    "order_id": order.razorpay_order_id,
                    "payment_id": razorpay_payment_id,
                })
            else:
                order.status = 'failed'
                order.save()
                
                # Send error email
                if order.user:
                    send_payment_error_email(
                        order.user.email,
                        order.user.full_name,
                        f"Payment status: {payment['status']}",
                        order.razorpay_order_id,
                        order.amount
                    )
                    send_payment_admin_notification(order, 'failed')
                
                return JsonResponse(
                    {"error": f"Payment not completed. Status: {payment['status']}"},
                    status=400
                )

        except Exception as e:
            order.status = 'failed'
            order.save()
            
            if order.user:
                send_payment_error_email(
                    order.user.email,
                    order.user.full_name,
                    f"Error verifying payment: {str(e)}",
                    order.razorpay_order_id,
                    order.amount
                )
                send_payment_admin_notification(order, 'failed')
            
            return JsonResponse(
                {"error": f"Error verifying payment: {str(e)}"},
                status=400
            )

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid request body"},
            status=400
        )
    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )


class UserPurchaseHistoryView(views.APIView):
    """
    Get list of products purchased by authenticated user from paid orders
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Get all paid orders for the user
            print("DEBUG : Fetching purchase history for user", request.user)
            paid_orders = Order.objects.filter(
                user=request.user,
                status='paid'
            ).order_by('-created_at')

            # Extract all products from paid orders
            purchased_products = {}
            purchase_data = []

            for order in paid_orders:
                items = order.items_snapshot
                for item in items:
                    product_id = item.get('product').get('id')
                    try:
                        product = Product.objects.get(id=product_id)
                        if product_id not in purchased_products:
                            purchased_products[product_id] = {
                                'product_id': product.id,
                                'product_name': product.name,
                                'product_slug': product.slug,
                                'product_price': float(product.price),
                                'total_quantity_purchased': 0,
                                'orders': []
                            }
                        purchased_products[product_id]['total_quantity_purchased'] += item.get('quantity', 0)
                        purchased_products[product_id]['orders'].append({
                            'order_id': order.id,
                            'razorpay_order_id': order.razorpay_order_id,
                            'quantity': item.get('quantity', 1),
                            'price': item.get('price', float(product.price)),
                            'purchase_date': order.created_at.isoformat(),
                            'order_amount': float(order.amount)
                        })
                    except Product.DoesNotExist:
                        continue

            # Convert to list and sort by most recent purchase
            purchase_data = list(purchased_products.values())
            purchase_data.sort(
                key=lambda x: x['orders'][0]['purchase_date'] if x['orders'] else '',
                reverse=True
            )

            return Response({
                'count': len(purchase_data),
                'results': purchase_data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )