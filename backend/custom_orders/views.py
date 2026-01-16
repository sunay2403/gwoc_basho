from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import CustomOrder, CustomOrderImage
from .serializers import CustomOrderSerializer
from product.models import Product

class CreateCustomOrder(APIView):
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        requirements = request.data.get("requirements")
        product_id = request.data.get("product_id")

        if not name or not email or not requirements:
            return Response(
                {"error": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = None
        if product_id:
            product = get_object_or_404(Product, id=product_id)

        order = CustomOrder.objects.create(
            name=name,
            email=email,
            requirements=requirements,
            product=product
        )

        images = request.FILES.getlist("images")
        for img in images:
            CustomOrderImage.objects.create(order=order, image=img)

        return Response(
            {"message": "Custom order created successfully"},
            status=status.HTTP_201_CREATED
        )
class CustomOrderShowcase(APIView):
    def get(self, request):
        orders = CustomOrder.objects.prefetch_related("images").order_by("-created_at")
        serializer = CustomOrderSerializer(orders, many=True)
        return Response(serializer.data)

