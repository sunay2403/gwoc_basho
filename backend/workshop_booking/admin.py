from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "slot",
        "participants",
        "created_at",
    )

    list_filter = ("slot", "created_at")
    search_fields = ("name", "email")
    readonly_fields = ("created_at",)
