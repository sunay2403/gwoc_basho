from django.contrib import admin
from .models import Exhibition,StudioPolicy,StudioHours

admin.site.register(Exhibition)

# Base admin class to set a common menu label
class StudioSettingsAdmin(admin.ModelAdmin):
    
    def get_model_perms(self, request):
        perms = super().get_model_perms(request)
        return perms


# StudioPolicy admin
@admin.register(StudioPolicy)
class StudioPolicyAdmin(StudioSettingsAdmin):
    list_display = ("text", "order")
    list_editable = ("order",)
    ordering = ("order",)
    search_fields = ("text",)
    fieldsets = (
        (None, {"fields": ("text", "order")}),
    )

# StudioHours admin
@admin.register(StudioHours)
class StudioHoursAdmin(StudioSettingsAdmin):
    list_display = ("content",)
    fieldsets = (
        ("Studio Hours", {
            "fields": ("content",),
            "description": "Edit the display text for studio hours. Keep it short and readable."
        }),
    )


StudioPolicy._meta.verbose_name_plural = "Studio Policies"
StudioPolicy._meta.verbose_name = "Studio Policy"

StudioHours._meta.verbose_name_plural = "Studio Hours"
StudioHours._meta.verbose_name = "Studio Hours"
