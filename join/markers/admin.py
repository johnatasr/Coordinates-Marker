from django.contrib import admin
from .models import Marker


# Register your models here.
class MarkesrAdmin(admin.ModelAdmin):
    fields = ['nome', 'latitude', 'longitude', 'expiracao']
    list_display = ['nome', 'latitude', 'longitude', 'expiracao']
    search_fields = ['nome']


admin.site.register(Marker, MarkesrAdmin)
