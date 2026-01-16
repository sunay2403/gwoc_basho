from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Exhibition,StudioPolicy,StudioHours
from .serializers import ExhibitionSerializer,StudioHoursSerializer,StudioPolicySerializer


class ExhibitionSplitView(APIView):
    def get(self, request):
        today = now().date()

        upcoming = Exhibition.objects.filter(date__gte=today)
        past = Exhibition.objects.filter(date__lt=today)

        return Response({
            "upcoming": ExhibitionSerializer(upcoming, many=True).data,
            "past": ExhibitionSerializer(past, many=True).data,
        })

class StudioInfoView(APIView):
    def get(self, request):
        policies = StudioPolicy.objects.all()
        hours = StudioHours.objects.first()

        policies_data = StudioPolicySerializer(policies, many=True).data
        hours_data = (
            StudioHoursSerializer(hours).data if hours else None
        )

        return Response({
            "policies": policies_data,
            "hours": hours_data
        })