from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView
from .models import WorkshopSlot
from .serializers import WorkshopSlotSerializer

class WorkshopSlotListView(ListAPIView):
    queryset = WorkshopSlot.objects.filter(active=True)
    serializer_class = WorkshopSlotSerializer
