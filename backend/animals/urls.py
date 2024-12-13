from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    AnimalViewSet,
    ConservationProjectViewSet,
    NewsArticleViewSet,
    DonationViewSet,
    UserProfileViewSet,
    RegisterView,
    UserViewSet,
)

router = DefaultRouter()
router.register(r'animals', AnimalViewSet, basename='animal')
router.register(r'projects', ConservationProjectViewSet, basename='project')
router.register(r'news', NewsArticleViewSet, basename='news')
router.register(r'donations', DonationViewSet, basename='donation')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'register', RegisterView, basename='register')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
