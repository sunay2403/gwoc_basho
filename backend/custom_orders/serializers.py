from rest_framework import serializers
from .models import CustomOrder, CustomOrderImage


class CustomOrderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomOrderImage
        fields = ["id", "image"]


class CustomOrderSerializer(serializers.ModelSerializer):
    images = CustomOrderImageSerializer(many=True, read_only=True)

    class Meta:
        model = CustomOrder
        fields = [
            "id",
            "product",
            "name",
            "email",
            "requirements",
            "images",
            "created_at",
        ]

class CustomOrderShowcaseSerializer(serializers.ModelSerializer):
    images = CustomOrderImageSerializer(many=True, read_only=True)

    class Meta:
        model = CustomOrder
        fields = [
            "id",
            "requirements",
            "images",
            "created_at",
        ]
