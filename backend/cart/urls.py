from django.urls import path
from .views import (
    CartRetrieveView,
    CartAddItemView,
    CartUpdateItemView,
    CartRemoveItemView,
    CartClearView,
)

urlpatterns = [
    path('', CartRetrieveView.as_view(), name='cart-detail'),
    path('items/', CartAddItemView.as_view(), name='cart-add-item'),
    path('items/<int:item_id>/', CartUpdateItemView.as_view(), name='cart-update-item'),
    path('items/<int:item_id>/remove/', CartRemoveItemView.as_view(), name='cart-remove-item'),
    path('clear/', CartClearView.as_view(), name='cart-clear'),
]
