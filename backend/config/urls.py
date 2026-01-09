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
from django.conf import settings
from django.conf.urls.static import static
from workshops.views import WorkshopSlotListView
from workshop_booking.views import BookingCreateView
from user.views import FirebaseAuthView
from corporate.views import (
    
    CorporateInquiryCreateView,
)
from experiences.views import ExperienceListCreateView, TextTestimonialListView, GalleryImageListView, VideoTestimonialListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/workshops/", WorkshopSlotListView.as_view()),
    path("api/bookings/", BookingCreateView.as_view()),
    path("api/corporate/inquiry/", CorporateInquiryCreateView.as_view()),
    path('api/auth/firebase/', FirebaseAuthView.as_view()),
    path('api/products/', include('product.urls')),
    path("api/admin/", include("product.admin_urls")),
    path('api/cart/', include('cart.urls')),
    path('api/experiences/', ExperienceListCreateView.as_view(), name='experience-list'),
    path('api/text-testimonials/', TextTestimonialListView.as_view(), name='text-testimonial-list'),
    path('api/gallery/', GalleryImageListView.as_view(), name='gallery-list'),
    path('api/video-testimonials/', VideoTestimonialListView.as_view(), name='video-testimonial-list'),
    path('api/payments/', include('payments.urls')),


    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)