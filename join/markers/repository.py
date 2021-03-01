from .models import Marker
from .serializers import MarkerSerializer
from django.core.exceptions import ObjectDoesNotExist


class MarkersRepository:
    def __init__(self):
        self.marker = Marker

    def get_all_markers(self):
        markers = self.marker.objects.all()
        if markers.exists():
            return MarkerSerializer(markers, many=True).data

    def get_marker_by_id(self, id: int):
        marker: object = self.marker.objects.filter(id=id)
        if marker.exists():
            return MarkerSerializer(marker, many=True).data

    def save_marker(self, marker_obj: object):
        marker_created: object = self.marker.objects.create(
            nome=marker_obj.nome,
            latitude=marker_obj.latitude,
            longitude=marker_obj.longitude,
            expiracao=marker_obj.expiracao
        )
        if marker_created.exists():
            return True

    def update_marker(self, marker_obj: object):
        marker: object = self.marker.objects.filter(id=marker_obj.id)
        marker.upadate(**self.mount_dict_marker(marker_obj))
        marker.save()

        return True

    def mount_dict_marker(self, marker_obj: object):
        marker: dict = {
            'nome': marker_obj.nome,
            'latitude': marker_obj.latitude,
            'longitude': marker_obj.longitude,
            'expiracao': marker_obj.expiracao
        }
        return marker

    def delete_marker(self, id: int):
        marker: object = self.marker.objects.filter(id=id)
        marker.remove()

        return True



