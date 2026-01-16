from rest_framework import serializers
from .models import CustomOrder, CustomOrderImage


class CustomOrderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomOrderImage
        fields = ("id", "image")


class CustomOrderSerializer(serializers.ModelSerializer):
    images = CustomOrderImageSerializer(many=True, read_only=True)

    class Meta:
        model = CustomOrder
        fields = (
            "id",
            "name",
            "email",
            "product",
            "requirements",
            "images",
            "created_at",
        )
