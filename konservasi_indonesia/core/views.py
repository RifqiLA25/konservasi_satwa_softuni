from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Species, Location, Animal, Conservation, News, UserProfile
from .serializers import (
    UserSerializer, SpeciesSerializer, LocationSerializer,
    AnimalSerializer, ConservationSerializer, NewsSerializer, UserProfileSerializer, MyTokenObtainPairSerializer
)
from .permissions import IsOwnerOrReadOnly, IsStaffOrReadOnly, IsAdminOrStaffReadOnly
from rest_framework_simplejwt.views import TokenObtainPairView

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
        if self.action in ['profile', 'me', 'update_profile']:
            return [permissions.IsAuthenticated()]
        elif self.action == 'create':  # Registration
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['get', 'put', 'patch'], url_path='me/profile')
    def profile(self, request):
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            profile = UserProfile.objects.create(user=request.user)
        
        if request.method in ['PUT', 'PATCH']:
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

class SpeciesViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    permission_classes = [IsStaffOrReadOnly]

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsStaffOrReadOnly]

from rest_framework.parsers import MultiPartParser, FormParser

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            print(f"Error creating animal: {str(e)}")  # Untuk debugging
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

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

    def perform_create(self, serializer):
        serializer.save(penulis=self.request.user)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
