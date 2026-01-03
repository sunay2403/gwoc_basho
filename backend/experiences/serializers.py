from rest_framework import serializers
from .models import Experience, TextTestimonial, GalleryImage, VideoTestimonial

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class TextTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextTestimonial
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'

class VideoTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoTestimonial
        fields = '__all__'
