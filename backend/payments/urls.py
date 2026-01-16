from django.urls import path
from .views import create_order, verify_payment, UserPurchaseHistoryView

urlpatterns = [
    path("create-order/", create_order),
    path("verify-payment/", verify_payment),
    path("purchase-history/", UserPurchaseHistoryView.as_view(), name="purchase-history"),
]
