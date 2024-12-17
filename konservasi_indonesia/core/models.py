from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Species(models.Model):
    nama = models.CharField(max_length=100)
    nama_latin = models.CharField(max_length=100)
    deskripsi = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Species"

    def __str__(self):
        return self.nama

class Location(models.Model):
    nama = models.CharField(max_length=100)
    provinsi = models.CharField(max_length=100)
    pulau = models.CharField(max_length=100)
    deskripsi = models.TextField()
    koordinat = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

class Animal(models.Model):
    STATUS_CHOICES = [
        ('CR', 'Critically Endangered'),
        ('EN', 'Endangered'),
        ('VU', 'Vulnerable'),
        ('NT', 'Near Threatened'),
        ('LC', 'Least Concern'),
    ]

    nama = models.CharField(max_length=100)
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES)
    populasi = models.IntegerField()
    deskripsi = models.TextField()
    gambar = models.ImageField(upload_to='animals/')
    lokasi = models.ManyToManyField(Location)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

class Conservation(models.Model):
    nama = models.CharField(max_length=100)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    deskripsi = models.TextField()
    tanggal_mulai = models.DateField()
    tanggal_selesai = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=100)
    penanggung_jawab = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

class News(models.Model):
    judul = models.CharField(max_length=200)
    konten = models.TextField()
    gambar = models.ImageField(upload_to='news/')
    penulis = models.ForeignKey(User, on_delete=models.CASCADE)
    animals = models.ManyToManyField(Animal, related_name='news')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "News"

    def __str__(self):
        return self.judul

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

    class Meta:
        ordering = ['-created_at']

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except UserProfile.DoesNotExist:
        UserProfile.objects.create(user=instance)