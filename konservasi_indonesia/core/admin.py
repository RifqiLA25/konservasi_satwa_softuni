from django.contrib import admin
from .models import Species, Location, Animal, Conservation, News

# Register your models here.

@admin.register(Species)
class SpeciesAdmin(admin.ModelAdmin):
    list_display = ('nama', 'nama_latin', 'created_at', 'updated_at')
    search_fields = ('nama', 'nama_latin')
    list_filter = ('created_at',)
    ordering = ('nama',)

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('nama', 'provinsi', 'pulau')
    search_fields = ('nama', 'provinsi', 'pulau')
    list_filter = ('pulau', 'provinsi')
    ordering = ('pulau', 'provinsi', 'nama')

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('nama', 'species', 'status', 'populasi')
    search_fields = ('nama', 'species__nama', 'status')
    list_filter = ('status', 'species', 'lokasi')
    filter_horizontal = ('lokasi',)
    ordering = ('nama',)

@admin.register(Conservation)
class ConservationAdmin(admin.ModelAdmin):
    list_display = ('nama', 'animal', 'status', 'tanggal_mulai', 'tanggal_selesai', 'penanggung_jawab')
    search_fields = ('nama', 'animal__nama', 'status')
    list_filter = ('status', 'tanggal_mulai', 'tanggal_selesai')
    ordering = ('-tanggal_mulai',)
    date_hierarchy = 'tanggal_mulai'

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('judul', 'penulis', 'created_at')
    search_fields = ('judul', 'konten', 'penulis__username')
    list_filter = ('created_at', 'penulis')
    filter_horizontal = ('animals',)
    ordering = ('-created_at',)
