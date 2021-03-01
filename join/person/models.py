from django.db import models

# Create your models here.


class Cargo(models.Model):
    nome = models.CharField(max_length=244, null=True, blank=True)


class Pessoa(models.Model):
    nome = models.CharField(max_length=244, null=True, blank=True)
    cargo = models.ForeignKey('Cargo', on_delete=models.CASCADE)
    admissao = models.DateField(null=True, blank=True)
