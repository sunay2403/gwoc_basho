from rest_framework import generics
from .models import ExperienceRegistration
from .serializers import ExperienceRegistrationSerializer

class ExperienceRegistrationCreateView(generics.CreateAPIView):
    queryset = ExperienceRegistration.objects.all()
    serializer_class = ExperienceRegistrationSerializer
