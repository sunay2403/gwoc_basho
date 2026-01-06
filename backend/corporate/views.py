from rest_framework.generics import CreateAPIView
from .models import CorporateInquiry
from .serializers import CorporateInquirySerializer


class CorporateInquiryCreateView(CreateAPIView):
    queryset = CorporateInquiry.objects.all()
    serializer_class = CorporateInquirySerializer
