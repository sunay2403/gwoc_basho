from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Exhibition
from .serializers import ExhibitionSerializer


class ExhibitionSplitView(APIView):
    def get(self, request):
        today = now().date()

        upcoming = Exhibition.objects.filter(date__gte=today)
        past = Exhibition.objects.filter(date__lt=today)

        return Response({
            "upcoming": ExhibitionSerializer(upcoming, many=True).data,
            "past": ExhibitionSerializer(past, many=True).data,
        })
