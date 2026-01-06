from django.contrib import admin
from .models import Experience, TextTestimonial, GalleryImage, VideoTestimonial

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    search_fields = ('title', 'author', 'story')

@admin.register(TextTestimonial)
class TextTestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'category', 'location', 'created_at')
    list_filter = ('category',)
    search_fields = ('author', 'text')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('caption', 'type', 'likes', 'created_at')
    list_filter = ('type',)
    search_fields = ('caption',)

@admin.register(VideoTestimonial)
class VideoTestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'duration', 'created_at')
    search_fields = ('author', 'quote')
