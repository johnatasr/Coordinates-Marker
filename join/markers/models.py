from django.db import models


# Create your models here.
class Marker(models.Model):
    nome = models.CharField(max_length=244, null=False, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    expiracao = models.DateField()