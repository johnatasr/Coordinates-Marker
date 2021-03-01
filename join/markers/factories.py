from django.core.exceptions import (
    ValidationError,
    EmptyResultSet,
)
from dataclasses import dataclass
from datetime import datetime


def get_id_from_query(request):
    ...


def create_marker_object(request, keys=['nome', 'latitude', 'longitude', 'expiracao']):
    if not all(key in keys for key in request.data):
        raise ValidationError
    else:
        @dataclass(unsafe_hash=True)
        class Marker(object):
            nome: str = request['nome']
            latitude: float = request['latitude']
            longitude: float = request['longitude']
            expiracao: datetime = request['expiracao']

        return Marker
