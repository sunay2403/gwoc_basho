from django.contrib import admin
from .models import Exhibition, StudioPolicy, StudioHours

admin.site.register(Exhibition)


@admin.register(StudioPolicy)
class StudioPolicyAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "order")
    ordering = ("order", "id")
    search_fields = ("text",)


@admin.register(StudioHours)
class StudioHoursAdmin(admin.ModelAdmin):
    list_display = ("content",)
