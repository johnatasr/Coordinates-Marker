# Create your views here.
from rest_framework import viewsets
from django.core.exceptions import ObjectDoesNotExist, EmptyResultSet, RequestAborted
from rest_framework.decorators import action
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED,
    HTTP_500_INTERNAL_SERVER_ERROR
)
from rest_framework.response import Response
from .repository import MarkersRepository
from django.http import HttpResponseRedirect
from .factories import create_marker_object


# Register your viewsets here.
class MarkerViewSet(viewsets.ModelViewSet):

    marker_repo = MarkersRepository()
    http_method_names = ['get', 'post', 'update', 'delete']

    @action(methods=['GET'], detail=False)
    def get_markers(self, request):
        try:
            markers = self.marker_repo.get_all_markers()

            if isinstance(markers, list or dict):
                raise EmptyResultSet

            return Response(markers, status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel carregar os marcadores do mapa', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['GET'], detail=False)
    def get_marker(self, request):
        try:
            marker = self.marker_repo.get_marker_by_id(request.query.get('id'))

            if not isinstance(marker, list or dict):
                raise EmptyResultSet

            return Response(marker, status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel carregar o marcador', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['POST'], detail=False)
    def save_marker(self, request):
        try:
            marker: object = create_marker_object(request)
            saved = self.marker_repo.save_marker(marker)

            if saved is not True:
                raise RequestAborted

            return Response('Marcador salvo com sucesso!', status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel salvar o marcador', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['UPDATE'], detail=False)
    def update_marker(self, request):
        try:
            marker: object = create_marker_object(request)
            saved: bool = self.marker_repo.update_marker(marker)

            if saved is not True:
                raise RequestAborted

            return Response('Marcador atualizado com sucesso!', status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel atualizar o marcador', status=HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['DELETE'], detail=False)
    def delete_marker(self, request):
        try:
            saved: bool = self.marker_repo.delete_marker(request.query.get('id'))

            if saved is not True:
                raise RequestAborted

            return Response('Marcador deletado com sucesso', status=HTTP_200_OK)
        except Exception as error:
            return Response('Não foi possivel carregar os componentes', status=HTTP_500_INTERNAL_SERVER_ERROR)

