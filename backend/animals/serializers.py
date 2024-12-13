from rest_framework import serializers
from .models import Animal, ConservationProject, NewsArticle, Donation, UserProfile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

class ConservationProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConservationProject
        fields = '__all__'

class NewsArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = NewsArticle
        fields = '__all__'

class DonationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ['user']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    interests = AnimalSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']
