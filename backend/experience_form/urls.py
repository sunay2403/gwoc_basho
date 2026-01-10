from django.urls import path
from .views import ExperienceRegistrationCreateView

urlpatterns = [
    path("register/", ExperienceRegistrationCreateView.as_view()),
]
