from rest_framework import serializers
from .models import CorporateInquiry




class CorporateInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = CorporateInquiry
        fields = "__all__"
