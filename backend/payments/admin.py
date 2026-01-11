from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'razorpay_order_id',
        'user',
        'amount',
        'status',
        'created_at'
    ]
    list_filter = ['status', 'currency', 'created_at']
    search_fields = [
        'razorpay_order_id',
        'razorpay_payment_id',
        'user__email',
        'user__full_name'
    ]
    readonly_fields = [
        'razorpay_order_id',
        'razorpay_payment_id',
        'razorpay_signature',
        'created_at',
        'updated_at',
        'items_snapshot'
    ]
    fieldsets = (
        ('Payment Information', {
            'fields': (
                'razorpay_order_id',
                'razorpay_payment_id',
                'razorpay_signature'
            )
        }),
        ('Order Details', {
            'fields': (
                'user',
                'amount',
                'currency',
                'status',
                'description'
            )
        }),
        ('Items', {
            'fields': ('items_snapshot',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    ordering = ['-created_at']
