from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from animals.models import Animal, ConservationProject, NewsArticle, Donation, UserProfile
from django.utils import timezone
from decimal import Decimal
import random
from datetime import timedelta

class Command(BaseCommand):
    help = 'Populates the database with dummy data'

    def handle(self, *args, **kwargs):
        # Create superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Superuser created'))

        # Create some regular users
        users = []
        for i in range(5):
            username = f'user{i}'
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=f'user{i}@example.com',
                    password='password123'
                )
                users.append(user)
                UserProfile.objects.create(
                    user=user,
                    bio=f'Bio for {username}',
                    location='Indonesia',
                    profile_picture=f'https://picsum.photos/200/200?random={i}'
                )
        self.stdout.write(self.style.SUCCESS('Users created'))

        # Create animals
        animals_data = [
            {
                'name': 'Orangutan',
                'scientific_name': 'Pongo pygmaeus',
                'description': 'The orangutan is a great ape native to the rainforests of Indonesia and Malaysia.',
                'habitat': 'Tropical Rainforest',
                'conservation_status': 'Critically Endangered',
                'population': 104700,
                'image': 'https://picsum.photos/400/300?random=1'
            },
            {
                'name': 'Sumatran Tiger',
                'scientific_name': 'Panthera tigris sumatrae',
                'description': 'The Sumatran tiger is a tiger subspecies native to the Indonesian island of Sumatra.',
                'habitat': 'Tropical Forest',
                'conservation_status': 'Critically Endangered',
                'population': 400,
                'image': 'https://picsum.photos/400/300?random=2'
            },
            {
                'name': 'Javan Rhinoceros',
                'scientific_name': 'Rhinoceros sondaicus',
                'description': 'The Javan rhinoceros is one of the rarest large mammals on Earth.',
                'habitat': 'Tropical Forest',
                'conservation_status': 'Critically Endangered',
                'population': 74,
                'image': 'https://picsum.photos/400/300?random=3'
            },
            {
                'name': 'Komodo Dragon',
                'scientific_name': 'Varanus komodoensis',
                'description': 'The Komodo dragon is the largest living species of lizard.',
                'habitat': 'Tropical Savanna',
                'conservation_status': 'Endangered',
                'population': 6000,
                'image': 'https://picsum.photos/400/300?random=4'
            },
            {
                'name': 'Sumatran Elephant',
                'scientific_name': 'Elephas maximus sumatranus',
                'description': 'The Sumatran elephant is one of three recognized subspecies of the Asian elephant.',
                'habitat': 'Tropical Forest',
                'conservation_status': 'Critically Endangered',
                'population': 2400,
                'image': 'https://picsum.photos/400/300?random=5'
            }
        ]

        animals = []
        for animal_data in animals_data:
            animal, created = Animal.objects.get_or_create(**animal_data)
            animals.append(animal)
        self.stdout.write(self.style.SUCCESS('Animals created'))

        # Create conservation projects
        projects_data = [
            {
                'title': 'Orangutan Habitat Protection',
                'description': 'Protecting and restoring orangutan habitats in Borneo.',
                'location': 'Borneo',
                'start_date': timezone.now().date(),
                'status': 'Active',
                'budget': Decimal('500000.00')
            },
            {
                'title': 'Tiger Conservation Initiative',
                'description': 'Anti-poaching and habitat conservation for Sumatran tigers.',
                'location': 'Sumatra',
                'start_date': timezone.now().date(),
                'status': 'Active',
                'budget': Decimal('750000.00')
            },
            {
                'title': 'Rhino Protection Program',
                'description': 'Protecting the last remaining Javan rhinoceros population.',
                'location': 'Java',
                'start_date': timezone.now().date(),
                'status': 'Active',
                'budget': Decimal('1000000.00')
            }
        ]

        projects = []
        for project_data in projects_data:
            project, created = ConservationProject.objects.get_or_create(**project_data)
            project.animals.add(random.choice(animals))
            projects.append(project)
        self.stdout.write(self.style.SUCCESS('Conservation projects created'))

        # Create news articles
        articles_data = [
            {
                'title': 'New Baby Orangutan Born in Conservation Center',
                'content': 'Exciting news as a new baby orangutan is born in our conservation center...',
                'image': 'https://picsum.photos/400/300?random=6'
            },
            {
                'title': 'Tiger Population Shows Signs of Recovery',
                'content': 'Recent surveys show promising signs of recovery in the Sumatran tiger population...',
                'image': 'https://picsum.photos/400/300?random=7'
            },
            {
                'title': 'Success in Rhino Conservation Efforts',
                'content': 'Conservation efforts have led to an increase in the Javan rhinoceros population...',
                'image': 'https://picsum.photos/400/300?random=8'
            }
        ]

        for article_data in articles_data:
            article = NewsArticle.objects.create(
                author=random.choice(users),
                **article_data
            )
            article.related_animals.add(random.choice(animals))
        self.stdout.write(self.style.SUCCESS('News articles created'))

        # Create donations
        for user in users:
            Donation.objects.create(
                user=user,
                amount=Decimal(random.randint(10, 1000)),
                project=random.choice(projects),
                message='Thank you for your great work!'
            )
        self.stdout.write(self.style.SUCCESS('Donations created'))

        self.stdout.write(self.style.SUCCESS('Database successfully populated with dummy data!'))
