from django.urls import path
from .views import CustomOrderCreateView,CustomOrderShowcaseView

urlpatterns = [
    path("create/", CustomOrderCreateView.as_view(), name="custom-order-create"),
    path("showcase/", CustomOrderShowcaseView.as_view()),

]
