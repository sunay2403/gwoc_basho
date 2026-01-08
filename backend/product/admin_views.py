from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Product, ProductImage
from .admin_serializers import ProductAdminSerializer
from user.permissions import IsAdminOrStaff

class AdminProductCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def post(self, request):
        serializer = ProductAdminSerializer(data=request.data)

        if serializer.is_valid():
            product = serializer.save()

            # Optional image support
            images = request.FILES.getlist("images")
            for img in images:
                ProductImage.objects.create(product=product, image=img)

            return Response(ProductAdminSerializer(product).data, status=201)

        return Response(serializer.errors, status=400)

class AdminProductUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def put(self, request, id):
        product = get_object_or_404(Product, id=id)
        serializer = ProductAdminSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            product = serializer.save()

            images = request.FILES.getlist("images")
            for img in images:
                ProductImage.objects.create(product=product, image=img)

            return Response(ProductAdminSerializer(product).data)

        return Response(serializer.errors, status=400)

class AdminProductDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def delete(self, request, id):
        product = get_object_or_404(Product, id=id)
        product.delete()
        return Response({"message": "Product deleted"})
