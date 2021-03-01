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
        try:
            self.marker.objects.create(
                nome=marker_obj.nome,
                latitude=marker_obj.latitude,
                longitude=marker_obj.longitude,
                expiracao=marker_obj.expiracao
            )
        except ObjectDoesNotExist:
            raise ObjectDoesNotExist

    def update_marker(self, marker_obj: object, id: int):
        try:
            params = self.mount_dict_marker(marker_obj)
            marker: object = self.marker(id=id, **params)
            marker.save()
        except Exception as error:
            raise Exception

    def mount_dict_marker(self, marker_obj: object):
        marker: dict = {
            'nome': marker_obj.nome,
            'latitude': marker_obj.latitude,
            'longitude': marker_obj.longitude,
            'expiracao': marker_obj.expiracao
        }
        return marker

    def delete_marker(self, id: int):
        try:
            marker: object = self.marker.objects.filter(id=id)
            marker.delete()
        except Exception as error:
            raise error




