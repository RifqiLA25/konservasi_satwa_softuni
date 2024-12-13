from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Animal, Conservation, News, UserProfile

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password1', 'password2')

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar', 'location']

class AnimalForm(forms.ModelForm):
    class Meta:
        model = Animal
        fields = ['nama', 'species', 'status', 'populasi', 'deskripsi', 'gambar', 'lokasi']

class ConservationForm(forms.ModelForm):
    class Meta:
        model = Conservation
        fields = ['nama', 'animal', 'deskripsi', 'tanggal_mulai', 'tanggal_selesai', 'status']
        widgets = {
            'tanggal_mulai': forms.DateInput(attrs={'type': 'date'}),
            'tanggal_selesai': forms.DateInput(attrs={'type': 'date'}),
        }

class NewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = ['judul', 'konten', 'gambar', 'animals'] 