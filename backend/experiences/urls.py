from django.urls import path
from .views import ExperienceListCreateView, TextTestimonialListView, GalleryImageListView, VideoTestimonialListView

urlpatterns = [
    path('experiences/', ExperienceListCreateView.as_view(), name='experience-list'),
    path('text-testimonials/', TextTestimonialListView.as_view(), name='text-testimonial-list'),
    path('gallery/', GalleryImageListView.as_view(), name='gallery-list'),
    path('video-testimonials/', VideoTestimonialListView.as_view(), name='video-testimonial-list'),
]
