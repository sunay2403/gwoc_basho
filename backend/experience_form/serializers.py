from rest_framework import serializers
from .models import ExperienceRegistration

class ExperienceRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceRegistration
        fields = "__all__"
