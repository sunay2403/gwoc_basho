from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "image", "alt_text", "is_primary")


class ProductAdminSerializer(serializers.ModelSerializer):
    images = ProductImageAdminSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = "__all__"
