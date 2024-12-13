from django.db import models
from django.contrib.auth.models import User

class Animal(models.Model):
    CONSERVATION_STATUS_CHOICES = [
        ('Critically Endangered', 'Critically Endangered'),
        ('Endangered', 'Endangered'),
        ('Vulnerable', 'Vulnerable'),
        ('Near Threatened', 'Near Threatened'),
        ('Least Concern', 'Least Concern'),
    ]

    name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100)
    description = models.TextField()
    habitat = models.CharField(max_length=200)
    conservation_status = models.CharField(max_length=50, choices=CONSERVATION_STATUS_CHOICES)
    population = models.IntegerField()
    image = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ConservationProject(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Planned', 'Planned'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    animals = models.ManyToManyField(Animal, related_name='conservation_projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class NewsArticle(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.URLField(blank=True, null=True)
    published_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Donation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    project = models.ForeignKey(ConservationProject, on_delete=models.CASCADE, related_name='donations')
    donation_date = models.DateTimeField(auto_now_add=True)
    message = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)
    interests = models.ManyToManyField(Animal, related_name='interested_users', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
