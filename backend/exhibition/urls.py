from django.urls import path
from .views import ExhibitionSplitView,StudioInfoView

urlpatterns = [
    path("/", ExhibitionSplitView.as_view()),
    path("meta/", StudioInfoView.as_view()),
]
