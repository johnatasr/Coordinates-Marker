
from rest_framework import serializers
from markers.models import Marker


class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = "__all__"