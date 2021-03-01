from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MarkerViewSet

router = DefaultRouter(trailing_slash=False)

router.register('markers', MarkerViewSet, basename='markers')

app_name = 'markers'

urlpatterns = [
    path('', include(router.urls)),
]
