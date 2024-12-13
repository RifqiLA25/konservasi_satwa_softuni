from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Species, Location, Animal, Conservation, News
from .serializers import (
    UserSerializer, SpeciesSerializer, LocationSerializer,
    AnimalSerializer, ConservationSerializer, NewsSerializer
)
from .permissions import IsOwnerOrReadOnly, IsStaffOrReadOnly, IsAdminOrStaffReadOnly

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Izinkan semua request GET, HEAD, OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        # Hanya admin yang bisa melakukan perubahan
        return request.user and request.user.is_staff

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':  # Registration
            return [permissions.AllowAny()]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class SpeciesViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    permission_classes = [IsAdminOrReadOnly]

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAdminOrReadOnly]

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all().prefetch_related('species', 'lokasi')
    serializer_class = AnimalSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsAdminOrReadOnly()]

class ConservationViewSet(viewsets.ModelViewSet):
    queryset = Conservation.objects.all()
    serializer_class = ConservationSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update']:
            return [IsStaffOrReadOnly()]
        elif self.action == 'destroy':
            return [IsAdminOrStaffReadOnly()]
        return [permissions.AllowAny()]

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        return [permissions.AllowAny()]
