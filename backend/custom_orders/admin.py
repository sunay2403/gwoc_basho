from django.contrib import admin
from .models import CustomOrder, CustomOrderImage


class CustomOrderImageInline(admin.TabularInline):
    model = CustomOrderImage
    extra = 1


@admin.register(CustomOrder)
class CustomOrderAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "product", "created_at")
    inlines = [CustomOrderImageInline]
