from django.db import models

# Create your models here.
from django.db import models
from workshops.models import WorkshopSlot

class Booking(models.Model):
    slot = models.ForeignKey(
        WorkshopSlot,
        related_name="bookings",
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    participants = models.PositiveIntegerField(default=1)
    gst = models.CharField(max_length=20, blank=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} – {self.slot.title}"
