from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags


def _safe_send(email, tag="email"):
    """
    Never allow email sending to crash the app.
    """
    try:
        email.send(fail_silently=False)
        print(f"{tag} sent successfully")
    except Exception as e:
        print(f"{tag} send failed:", e)


def send_payment_success_email(order):
    """
    Send payment success confirmation email to user
    """
    try:
        subject = f"Payment Confirmation - Order {order.razorpay_order_id}"

        context = {
            "user_name": order.user.full_name or order.user.email.split("@")[0],
            "user_email": order.user.email,
            "order_id": order.razorpay_order_id,
            "payment_id": order.razorpay_payment_id,
            "amount": order.amount,
            "currency": order.currency,
            "description": order.description,
            "items": order.items_snapshot,
            "created_at": order.created_at.strftime("%d %B %Y, %H:%M"),
        }

        html_message = render_to_string("emails/payment_success.html", context)
        plain_message = strip_tags(html_message)

        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[order.user.email],
        )

        email.attach_alternative(html_message, "text/html")

        _safe_send(email, "Payment success email")
        return True

    except Exception as e:
        print("Error preparing payment success email:", e)
        return False


def send_payment_error_email(
    user_email, user_name, error_message, order_id=None, amount=None
):
    """
    Send payment error notification email to user
    """
    try:
        subject = "Payment Failed - Action Required"

        context = {
            "user_name": user_name or user_email.split("@")[0],
            "user_email": user_email,
            "error_message": error_message,
            "order_id": order_id,
            "amount": amount,
            "support_email": settings.DEFAULT_FROM_EMAIL,
        }

        html_message = render_to_string("emails/payment_error.html", context)
        plain_message = strip_tags(html_message)

        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user_email],
        )

        email.attach_alternative(html_message, "text/html")

        _safe_send(email, "Payment error email")
        return True

    except Exception as e:
        print("Error preparing payment error email:", e)
        return False


def send_payment_admin_notification(order, status):
    """
    Send payment status notification to admin for monitoring
    """
    try:
        subject = f"Payment {status.upper()} - Order {order.razorpay_order_id}"

        context = {
            "user_email": order.user.email,
            "user_name": order.user.full_name,
            "order_id": order.razorpay_order_id,
            "payment_id": order.razorpay_payment_id,
            "amount": order.amount,
            "status": status,
            "created_at": order.created_at.strftime("%d %B %Y, %H:%M"),
        }

        html_message = render_to_string(
            "emails/payment_admin_notification.html", context
        )
        plain_message = strip_tags(html_message)

        email = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.DEFAULT_FROM_EMAIL],
        )

        email.attach_alternative(html_message, "text/html")

        _safe_send(email, "Admin payment notification")
        return True

    except Exception as e:
        print("Error preparing admin notification email:", e)
        return False
