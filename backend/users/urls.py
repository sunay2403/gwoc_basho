from django.urls import path
from .views import FirebaseAuthView, CustomLoginView, CustomSignupView, ProfileView

urlpatterns = [
    path("firebase-login/", FirebaseAuthView.as_view()),
    path("custom/signup/", CustomSignupView.as_view()),
    path("custom/login/", CustomLoginView.as_view()),
    path("me/", ProfileView.as_view()),
    
]
