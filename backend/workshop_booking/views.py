from django.shortcuts import render

# Create your views here.
from rest_framework.generics import CreateAPIView
from .models import Booking
from .serializers import BookingSerializer

class BookingCreateView(CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
