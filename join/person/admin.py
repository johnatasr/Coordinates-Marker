from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Pessoa, Cargo


# Register your models here.
class PessoaAdmin(admin.ModelAdmin):
    fields = ['nome', 'cargo', 'admissao']
    list_display = ['nome', 'cargo', 'admissao']
    search_fields = ['nome']


class CargoAdmin(admin.ModelAdmin):
    fields = ['nome']
    list_display = ['nome']
    search_fields = ['nome']


admin.site.register(Pessoa, PessoaAdmin)
admin.site.register(Cargo, CargoAdmin)