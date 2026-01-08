from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView

urlpatterns = [
    path("", ProductListView.as_view()),
    path("categories/", CategoryListView.as_view()),
    path("<slug:slug>/", ProductDetailView.as_view()),
]
