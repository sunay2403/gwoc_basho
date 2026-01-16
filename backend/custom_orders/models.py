from django.db import models
from product.models import Product 


class CustomOrder(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    requirements = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.created_at.date()}"


class CustomOrderImage(models.Model):
    order = models.ForeignKey(
        CustomOrder,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="custom_orders/")
