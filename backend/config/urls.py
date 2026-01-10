from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
<<<<<<< HEAD
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
    path('api/experiences/', ExperienceListCreateView.as_view(), name='experience-list'),
    path('api/text-testimonials/', TextTestimonialListView.as_view(), name='text-testimonial-list'),
    path('api/gallery/', GalleryImageListView.as_view(), name='gallery-list'),
    path('api/video-testimonials/', VideoTestimonialListView.as_view(), name='video-testimonial-list'),

    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('experiences.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
>>>>>>> 006faee5cf08d8b6d4d28e369a39c6ec8ddaddfd
