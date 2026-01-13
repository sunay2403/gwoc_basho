import threading
from .services import (
    send_payment_success_email,
    send_payment_error_email,
    send_payment_admin_notification,
)

def send_payment_success_async(order):
    def task():
        try:
            send_payment_success_email(order)
            send_payment_admin_notification(order, "paid")
        except Exception as e:
            print("Async success email failed:", e)

    threading.Thread(target=task, daemon=True).start()


def send_payment_failed_async(order, reason):
    def task():
        try:
            if order.user:
                send_payment_error_email(
                    order.user.email,
                    order.user.full_name,
                    reason,
                    order.razorpay_order_id,
                    order.amount
                )
            send_payment_admin_notification(order, "failed")
        except Exception as e:
            print("Async failure email failed:", e)

    threading.Thread(target=task, daemon=True).start()
