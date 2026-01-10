from rest_framework.decorators import api_view
from rest_framework.response import Response
from razorpay.errors import SignatureVerificationError
from .utils import client


@api_view(["POST"])
def create_order(request):
    amount = request.data.get("amount")  # amount in rupees

    order = client.order.create({
        "amount": int(amount) * 100,  # rupees → paise
        "currency": "INR",
        "payment_capture": 1
    })

    return Response({
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
        "key": "rzp_test_xxxxx"  # ONLY key_id, safe for frontend
    })


@api_view(["POST"])
def verify_payment(request):
    data = request.data

    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"],
        })
        return Response({"status": "success"})
    except SignatureVerificationError:
        return Response({"status": "failed"}, status=400)
