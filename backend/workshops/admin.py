from django.contrib import admin
from .models import WorkshopSlot


@admin.register(WorkshopSlot)
class WorkshopSlotAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "date_label",
        "capacity",
        "price",
        "remaining_seats",
    )

    readonly_fields = ("remaining_seats",)

    def remaining_seats(self, obj):
        booked = sum(b.participants for b in obj.bookings.all())
        return obj.capacity - booked

    remaining_seats.short_description = "Remaining Seats"
