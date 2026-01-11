from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'razorpay_order_id',
            'razorpay_payment_id',
            'razorpay_signature',
            'user_email',
            'user_name',
            'amount',
            'currency',
            'status',
            'description',
            'items_snapshot',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
