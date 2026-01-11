from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags


def send_payment_success_email(order):
    """
    Send payment success confirmation email to user
    """
    try:
        subject = f"Payment Confirmation - Order {order.razorpay_order_id}"
        
        # Prepare context for email template
        context = {
            'user_name': order.user.full_name or order.user.email.split('@')[0],
            'user_email': order.user.email,
            'order_id': order.razorpay_order_id,
            'payment_id': order.razorpay_payment_id,
            'amount': order.amount,
            'currency': order.currency,
            'description': order.description,
            'items': order.items_snapshot,
            'created_at': order.created_at.strftime('%d %B %Y, %H:%M'),
        }
        
        # Render HTML template
        html_message = render_to_string('emails/payment_success.html', context)
        plain_message = strip_tags(html_message)
        
        # Create email
        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[order.user.email]
        )
        
        email.attach_alternative(html_message, "text/html")
        email.send(fail_silently=False)
        
        return True
    except Exception as e:
        print(f"Error sending payment success email: {str(e)}")
        return False


def send_payment_error_email(user_email, user_name, error_message, order_id=None, amount=None):
    """
    Send payment error notification email to user
    """
    try:
        subject = "Payment Failed - Action Required"
        
        # Prepare context for email template
        context = {
            'user_name': user_name or user_email.split('@')[0],
            'user_email': user_email,
            'error_message': error_message,
            'order_id': order_id,
            'amount': amount,
            'support_email': settings.DEFAULT_FROM_EMAIL,
        }
        
        # Render HTML template
        html_message = render_to_string('emails/payment_error.html', context)
        plain_message = strip_tags(html_message)
        
        # Create email
        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user_email]
        )
        
        email.attach_alternative(html_message, "text/html")
        email.send(fail_silently=False)
        
        return True
    except Exception as e:
        print(f"Error sending payment error email: {str(e)}")
        return False


def send_payment_admin_notification(order, status):
    """
    Send payment status notification to admin for monitoring
    """
    try:
        subject = f"Payment {status.upper()} - Order {order.razorpay_order_id}"
        
        context = {
            'user_email': order.user.email,
            'user_name': order.user.full_name,
            'order_id': order.razorpay_order_id,
            'payment_id': order.razorpay_payment_id,
            'amount': order.amount,
            'status': status,
            'created_at': order.created_at.strftime('%d %B %Y, %H:%M'),
        }
        
        html_message = render_to_string('emails/payment_admin_notification.html', context)
        plain_message = strip_tags(html_message)
        
        # Send to admin
        admin_email = settings.DEFAULT_FROM_EMAIL
        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[admin_email]
        )
        
        email.attach_alternative(html_message, "text/html")
        email.send(fail_silently=False)
        
        return True
    except Exception as e:
        print(f"Error sending admin notification email: {str(e)}")
        return False
