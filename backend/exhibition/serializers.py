from rest_framework import serializers
from .models import Exhibition,StudioHours,StudioPolicy


class ExhibitionSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)
    class Meta:
        model = Exhibition
        fields ="__all__"

class StudioPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioPolicy
        fields = ["id", "text"]


class StudioHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioHours
        fields = ["id", "content"]
