from django.urls import path
from .admin_views import (
    AdminProductCreateView,
    AdminProductUpdateView,
    AdminProductDeleteView,
)

urlpatterns = [
    path("products/", AdminProductCreateView.as_view()),
    path("products/<int:id>/", AdminProductUpdateView.as_view()),
    path("products/<int:id>/delete/", AdminProductDeleteView.as_view()),
]
