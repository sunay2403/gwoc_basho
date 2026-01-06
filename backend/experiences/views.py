from rest_framework import generics
from .models import Experience, TextTestimonial, GalleryImage, VideoTestimonial
from .serializers import ExperienceSerializer, TextTestimonialSerializer, GalleryImageSerializer, VideoTestimonialSerializer

class ExperienceListCreateView(generics.ListCreateAPIView):
    queryset = Experience.objects.all().order_by('-created_at')
    serializer_class = ExperienceSerializer

class TextTestimonialListView(generics.ListAPIView):
    queryset = TextTestimonial.objects.all().order_by('-created_at')
    serializer_class = TextTestimonialSerializer

class GalleryImageListView(generics.ListAPIView):
    queryset = GalleryImage.objects.all().order_by('-created_at')
    serializer_class = GalleryImageSerializer

class VideoTestimonialListView(generics.ListAPIView):
    queryset = VideoTestimonial.objects.all().order_by('-created_at')
    serializer_class = VideoTestimonialSerializer
