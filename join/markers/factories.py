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
        data: dict = request.data

        @dataclass(unsafe_hash=True)
        class Marker(object):
            nome: str = data['nome']
            latitude: float = data['latitude']
            longitude: float = data['longitude']
            expiracao: datetime = data['expiracao']

        return Marker
