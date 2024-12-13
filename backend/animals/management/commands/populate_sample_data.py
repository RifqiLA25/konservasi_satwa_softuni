from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from animals.models import Animal, ConservationProject, NewsArticle
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **kwargs):
        try:
            # Create superuser if it doesn't exist
            if not User.objects.filter(username='admin').exists():
                User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
                self.stdout.write(self.style.SUCCESS('Created superuser'))

            # Get or create a user for news articles
            user, created = User.objects.get_or_create(
                username='conservation_writer',
                email='writer@example.com',
                defaults={'is_staff': True}
            )
            if created:
                user.set_password('writer123')
                user.save()
                self.stdout.write(self.style.SUCCESS('Created writer user'))

            # Create sample animals
            animals_data = [
                {
                    'name': 'Sumatran Tiger',
                    'scientific_name': 'Panthera tigris sumatrae',
                    'description': 'The Sumatran tiger is a rare tiger subspecies that inhabits the Indonesian island of Sumatra.',
                    'habitat': 'Tropical rainforest',
                    'conservation_status': 'Critically Endangered',
                    'population': 400,
                    'image': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sumatran_Tiger_Berlin_Tierpark.jpg',
                },
                {
                    'name': 'Javan Rhinoceros',
                    'scientific_name': 'Rhinoceros sondaicus',
                    'description': 'The Javan rhinoceros is one of the most endangered large mammals in the world.',
                    'habitat': 'Tropical rainforest',
                    'conservation_status': 'Critically Endangered',
                    'population': 74,
                    'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Rhinoc%C3%A9ros_de_Java.jpg/1200px-Rhinoc%C3%A9ros_de_Java.jpg',
                },
                {
                    'name': 'Orangutan',
                    'scientific_name': 'Pongo abelii',
                    'description': 'The Sumatran orangutan is one of the three species of orangutans.',
                    'habitat': 'Tropical rainforest',
                    'conservation_status': 'Critically Endangered',
                    'population': 14000,
                    'image': 'https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG',
                },
            ]

            for animal_data in animals_data:
                Animal.objects.get_or_create(
                    name=animal_data['name'],
                    defaults=animal_data
                )
            self.stdout.write(self.style.SUCCESS('Created sample animals'))

            # Create conservation projects
            projects_data = [
                {
                    'title': 'Save the Sumatran Tiger',
                    'description': 'A conservation project aimed at protecting the Sumatran tiger population.',
                    'location': 'Sumatra, Indonesia',
                    'start_date': timezone.now().date(),
                    'status': 'Active',
                    'budget': 500000.00,
                },
                {
                    'title': 'Javan Rhino Protection',
                    'description': 'Protecting the last remaining Javan rhinoceros population.',
                    'location': 'Java, Indonesia',
                    'start_date': timezone.now().date(),
                    'status': 'Active',
                    'budget': 750000.00,
                },
            ]

            for project_data in projects_data:
                project, created = ConservationProject.objects.get_or_create(
                    title=project_data['title'],
                    defaults=project_data
                )
                if created:
                    # Add related animals to the project
                    related_animals = Animal.objects.all()[:2]  # Get first two animals
                    project.animals.set(related_animals)

            self.stdout.write(self.style.SUCCESS('Created conservation projects'))

            # Create news articles
            news_data = [
                {
                    'title': 'New Tiger Cubs Born in Conservation Center',
                    'content': 'Two Sumatran tiger cubs were born at our conservation center, marking a significant success in our breeding program.',
                    'image': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sumatran_Tiger_Berlin_Tierpark.jpg',
                    'author': user,
                },
                {
                    'title': 'Successful Rhino Protection Program',
                    'content': 'Our Javan rhinoceros protection program has shown promising results with an increase in population numbers.',
                    'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Rhinoc%C3%A9ros_de_Java.jpg/1200px-Rhinoc%C3%A9ros_de_Java.jpg',
                    'author': user,
                },
                {
                    'title': 'New Conservation Area Established',
                    'content': 'A new protected area has been established to help preserve the habitat of endangered species.',
                    'image': 'https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG',
                    'author': user,
                },
            ]

            for article_data in news_data:
                NewsArticle.objects.get_or_create(
                    title=article_data['title'],
                    defaults=article_data
                )

            self.stdout.write(self.style.SUCCESS('Created news articles'))
            self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error populating database: {str(e)}'))
            raise
