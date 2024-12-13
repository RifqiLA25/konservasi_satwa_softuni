from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Animal, ConservationProject, NewsArticle, Donation, UserProfile
from .serializers import (
    AnimalSerializer, 
    ConservationProjectSerializer,
    NewsArticleSerializer,
    DonationSerializer,
    UserProfileSerializer,
    UserSerializer
)

class RegisterView(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                validate_password(request.data['password'])
                user = User.objects.create_user(
                    username=request.data['username'],
                    password=request.data['password'],
                    email=request.data.get('email', ''),
                    first_name=request.data.get('first_name', ''),
                    last_name=request.data.get('last_name', '')
                )
                UserProfile.objects.create(user=user)
                return Response({
                    'message': 'User registered successfully',
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({'error': list(e.messages)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, User.auth_token.RelatedObjectDoesNotExist):
            pass
        return Response({'message': 'Successfully logged out'})

# Class-based views for API
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ConservationProjectViewSet(viewsets.ModelViewSet):
    queryset = ConservationProject.objects.all()
    serializer_class = ConservationProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.action == 'list':
            return UserProfile.objects.filter(user=self.request.user)
        return UserProfile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Traditional Django Class-based views (for template rendering if needed)
class AnimalListView(ListView):
    model = Animal
    template_name = 'animals/animal_list.html'
    context_object_name = 'animals'

class AnimalDetailView(DetailView):
    model = Animal
    template_name = 'animals/animal_detail.html'
    context_object_name = 'animal'

class ConservationProjectListView(ListView):
    model = ConservationProject
    template_name = 'animals/project_list.html'
    context_object_name = 'projects'

class ConservationProjectDetailView(DetailView):
    model = ConservationProject
    template_name = 'animals/project_detail.html'
    context_object_name = 'project'

class NewsArticleListView(ListView):
    model = NewsArticle
    template_name = 'animals/news_list.html'
    context_object_name = 'articles'
    ordering = ['-published_date']

class DonationCreateView(LoginRequiredMixin, CreateView):
    model = Donation
    template_name = 'animals/donation_form.html'
    fields = ['amount', 'project', 'message']
    success_url = reverse_lazy('donation-success')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class UserProfileUpdateView(LoginRequiredMixin, UpdateView):
    model = UserProfile
    template_name = 'animals/profile_form.html'
    fields = ['bio', 'location', 'profile_picture', 'interests']
    success_url = reverse_lazy('profile')
