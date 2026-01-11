from django.db import models
from product.models import Product  # adjust import if needed


class CustomOrder(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="custom_orders"
    )

    name = models.CharField(max_length=100)
    email = models.EmailField()
    requirements = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Custom Order by {self.name}"
    

class CustomOrderImage(models.Model):
    order = models.ForeignKey(
        CustomOrder,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="custom_orders/")

    def __str__(self):
        return f"Image for order {self.order.id}"

