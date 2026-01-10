from django.urls import path
from .views import ExhibitionSplitView

urlpatterns = [
    path("/", ExhibitionSplitView.as_view()),
]
