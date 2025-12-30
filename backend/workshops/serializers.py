from rest_framework import serializers
from .models import WorkshopSlot

class WorkshopSlotSerializer(serializers.ModelSerializer):
    remaining = serializers.IntegerField(source="remaining_slots", read_only=True)

    class Meta:
        model = WorkshopSlot
        fields = ["id", "title", "date_label", "capacity", "remaining", "price"]
