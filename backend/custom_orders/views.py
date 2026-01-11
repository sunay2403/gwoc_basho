from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.generics import ListAPIView

from .models import CustomOrder, CustomOrderImage
from .serializers import CustomOrderSerializer,CustomOrderShowcaseSerializer


class CustomOrderCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        order = CustomOrder.objects.create(
            product_id=request.data.get("product_id"),
            name=request.data.get("name"),
            email=request.data.get("email"),
            requirements=request.data.get("requirements"),
        )

        images = request.FILES.getlist("images")
        for img in images:
            CustomOrderImage.objects.create(order=order, image=img)

        serializer = CustomOrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class CustomOrderShowcaseView(ListAPIView):
    queryset = CustomOrder.objects.prefetch_related("images").order_by("-created_at")
    serializer_class = CustomOrderShowcaseSerializer

