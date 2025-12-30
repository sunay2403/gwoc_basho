from django.db import models

# Create your models here.
from django.db import models

class WorkshopSlot(models.Model):
    title = models.CharField(max_length=100)
    date_label = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=True)

    def remaining_slots(self):
        booked = sum(b.participants for b in self.bookings.all())
        return self.capacity - booked

    def __str__(self):
        return self.title
