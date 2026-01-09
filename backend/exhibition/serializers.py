from rest_framework import serializers
from .models import Exhibition


class ExhibitionSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)
    class Meta:
        model = Exhibition
        fields ="__all__"
