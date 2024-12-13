from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('animals', views.AnimalViewSet, basename='animal')
router.register('news', views.NewsViewSet, basename='news')
router.register('locations', views.LocationViewSet, basename='location')
router.register('species', views.SpeciesViewSet, basename='species')
router.register('conservation', views.ConservationViewSet, basename='conservation')

urlpatterns = router.urls + [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/me/profile/', views.UserViewSet.as_view({'get': 'profile', 'put': 'profile'})),
]
