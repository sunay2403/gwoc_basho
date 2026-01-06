"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from workshops.views import WorkshopSlotListView
from workshop_booking.views import BookingCreateView
from corporate.views import (
    
    CorporateInquiryCreateView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("users.urls")),
    path("api/workshops/", WorkshopSlotListView.as_view()),
    path("api/bookings/", BookingCreateView.as_view()),
    path("api/corporate/inquiry/", CorporateInquiryCreateView.as_view()),

    
]
