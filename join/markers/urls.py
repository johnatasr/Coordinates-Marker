from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MarkerViewSet

router = DefaultRouter(trailing_slash=False)

router.register('', MarkerViewSet.get_markers)
router.register('get_marker/<int:pk>', MarkerViewSet.get_marker)
router.register('save_marker', MarkerViewSet.save_marker)
router.register('update_marker', MarkerViewSet.update_marker)
router.register('delete_marker/<int:pk>', MarkerViewSet.update_marker)

app_name = 'markers'

urlpatterns = [
    path('', include(router.urls)),
]
