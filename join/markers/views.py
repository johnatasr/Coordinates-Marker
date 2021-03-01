# Create your views here.
from rest_framework import viewsets
from django.core.exceptions import EmptyResultSet, RequestAborted
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR
)
from rest_framework.response import Response
from .repository import MarkersRepository
from .factories import create_marker_object


# Register your viewsets here.
class MarkerViewSet(viewsets.ModelViewSet):

    marker_repo = MarkersRepository()
    http_method_names = ['get', 'post', 'put', 'delete']

    @action(methods=['GET'], detail=False, url_path='get-markers', url_name='get_markers')
    def get_markers(self, request):
        try:
            markers = self.marker_repo.get_all_markers()

            if not isinstance(markers, list or dict):
                raise EmptyResultSet

            return Response(markers, status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel carregar os marcadores do mapa', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['GET'], detail=False, url_path='get-marker/(?P<id>[0-9]+)', url_name='get_markers')
    def get_marker(self, request, id: str):
        try:
            marker = self.marker_repo.get_marker_by_id(id=int(id))

            if not isinstance(marker, list or dict):
                raise EmptyResultSet

            return Response(marker, status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel carregar o marcador', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['POST'], detail=False, url_path='save-marker', url_name='save_marker')
    def save_marker(self, request):
        try:
            marker: object = create_marker_object(request)
            self.marker_repo.save_marker(marker)

            return Response('Marcador salvo com sucesso!', status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel salvar o marcador', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['PUT'], detail=False, url_path='update-marker/(?P<id>[0-9]+)', url_name='update_marker')
    def update_marker(self, request, id: str):
        try:
            marker: object = create_marker_object(request)
            self.marker_repo.update_marker(marker, int(id))

            return Response('Marcador atualizado com sucesso!', status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel atualizar o marcador', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['DELETE'], detail=False, url_path='delete-marker/(?P<id>[0-9]+)', url_name='delete_marker')
    def delete_marker(self, request, id: int):
        try:
            self.marker_repo.delete_marker(id=int(id))

            return Response('Marcador deletado com sucesso', status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel carregar os componentes', status=HTTP_500_INTERNAL_SERVER_ERROR)

