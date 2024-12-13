from django.contrib import admin
from .models import Animal, ConservationProject, NewsArticle, Donation, UserProfile

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('name', 'scientific_name', 'conservation_status', 'population')
    list_filter = ('conservation_status',)
    search_fields = ('name', 'scientific_name')

@admin.register(ConservationProject)
class ConservationProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'status', 'budget', 'start_date')
    list_filter = ('status',)
    search_fields = ('title', 'location')

@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date')
    list_filter = ('published_date',)
    search_fields = ('title', 'content')

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'project', 'donation_date')
    list_filter = ('donation_date',)
    search_fields = ('user__username', 'project__title')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at')
    search_fields = ('user__username', 'location')
