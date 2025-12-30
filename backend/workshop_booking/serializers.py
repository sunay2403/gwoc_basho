from rest_framework import serializers
from .models import Booking
from workshops.models import WorkshopSlot

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def validate(self, data):
        slot: WorkshopSlot = data["slot"]
        if data["participants"] > slot.remaining_slots():
            raise serializers.ValidationError("Not enough seats available")
        return data
