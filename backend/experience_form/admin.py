from django.contrib import admin
from .models import ExperienceRegistration


@admin.register(ExperienceRegistration)
class ExperienceRegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "experience",
        "date",
        "participants",
        "email",
        "phone",
        "created_at",
    )

    list_filter = (
        "experience",
        "date",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "phone",
    )

    readonly_fields = ("created_at",)

    fieldsets = (
        ("Basic Information", {
            "fields": (
                "name",
                "email",
                "phone",
                "experience",
            )
        }),
        ("Experience Details", {
            "fields": (
                "date",
                "participants",
                "extra_data",
                "message",
            )
        }),
        ("System", {
            "fields": ("created_at",)
        }),
    )
