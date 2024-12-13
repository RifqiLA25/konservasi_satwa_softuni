from django.contrib import admin
from .models import Animal, Conservation, News, Species, Location, UserProfile

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('nama', 'species', 'status', 'populasi', 'created_at')
    list_filter = ('status', 'species', 'created_at')
    search_fields = ('nama', 'species', 'deskripsi')
    ordering = ('nama',)
    date_hierarchy = 'created_at'
    list_per_page = 20

@admin.register(Conservation)
class ConservationAdmin(admin.ModelAdmin):
    list_display = ('nama', 'animal', 'status', 'tanggal_mulai', 'tanggal_selesai')
    list_filter = ('status', 'tanggal_mulai')
    search_fields = ('nama', 'deskripsi')
    date_hierarchy = 'tanggal_mulai'
    list_per_page = 20

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('judul', 'penulis', 'created_at', 'updated_at')
    list_filter = ('created_at', 'penulis')
    search_fields = ('judul', 'konten')
    date_hierarchy = 'created_at'
    list_per_page = 20
    filter_horizontal = ('animals',)

@admin.register(Species)
class SpeciesAdmin(admin.ModelAdmin):
    list_display = ('nama', 'nama_latin', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('nama', 'nama_latin')
    ordering = ('nama',)

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('nama', 'provinsi', 'pulau')
    list_filter = ('provinsi', 'pulau')
    search_fields = ('nama', 'deskripsi')
    ordering = ('nama',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'bio')
    date_hierarchy = 'created_at'
