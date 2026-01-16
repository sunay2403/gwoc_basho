from django.urls import path
from .views import CreateCustomOrder, CustomOrderShowcase

urlpatterns = [
    path("create/", CreateCustomOrder.as_view()),
    path("showcase/", CustomOrderShowcase.as_view()),
]
