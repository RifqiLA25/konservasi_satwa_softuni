from django.db import migrations
from django.utils import timezone


def create_sample_data(apps, schema_editor):
    Animal = apps.get_model('animals', 'Animal')
    NewsArticle = apps.get_model('animals', 'NewsArticle')

    # Create 10 animals
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
        {
            'name': 'Komodo Dragon',
            'scientific_name': 'Varanus komodoensis',
            'description': 'The largest living species of lizard, found in Indonesia.',
            'habitat': 'Tropical savanna',
            'conservation_status': 'Endangered',
            'population': 6000,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/1/18/Komodo_dragon_%28Varanus_komodoensis%29.jpg',
        },
        {
            'name': 'Proboscis Monkey',
            'scientific_name': 'Nasalis larvatus',
            'description': 'Endemic to Borneo, known for its distinctive nose.',
            'habitat': 'Mangrove forests',
            'conservation_status': 'Endangered',
            'population': 7000,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Proboscis_Monkey_in_Borneo.jpg',
        },
        {
            'name': 'Sumatran Elephant',
            'scientific_name': 'Elephas maximus sumatranus',
            'description': 'A subspecies of Asian elephant native to Sumatra.',
            'habitat': 'Tropical forest',
            'conservation_status': 'Critically Endangered',
            'population': 2400,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Sumatran_Elephant_at_Way_Kambas_National_Park.jpg',
        },
        {
            'name': 'Bali Myna',
            'scientific_name': 'Leucopsar rothschildi',
            'description': 'A critically endangered bird endemic to Bali.',
            'habitat': 'Tropical forest',
            'conservation_status': 'Critically Endangered',
            'population': 100,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Bali_Myna_at_Bali_Bird_Park.jpg',
        },
        {
            'name': 'Sumatran Rhinoceros',
            'scientific_name': 'Dicerorhinus sumatrensis',
            'description': 'The smallest of living rhinoceroses.',
            'habitat': 'Tropical rainforest',
            'conservation_status': 'Critically Endangered',
            'population': 80,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sumatran_Rhinoceros_at_Cincinnati_Zoo.jpg/1200px-Sumatran_Rhinoceros_at_Cincinnati_Zoo.jpg',
        },
        {
            'name': 'Sunda Pangolin',
            'scientific_name': 'Manis javanica',
            'description': 'A critically endangered mammal known for its scales.',
            'habitat': 'Various forest types',
            'conservation_status': 'Critically Endangered',
            'population': 1000,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Sunda_Pangolin.jpg',
        },
        {
            'name': 'Hawksbill Sea Turtle',
            'scientific_name': 'Eretmochelys imbricata',
            'description': 'A critically endangered sea turtle found in tropical waters.',
            'habitat': 'Coral reefs',
            'conservation_status': 'Critically Endangered',
            'population': 20000,
            'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Hawksbill_Sea_Turtle.jpg/1200px-Hawksbill_Sea_Turtle.jpg',
        },
    ]

    for data in animals_data:
        Animal.objects.create(**data)

    # Create 10 news articles
    news_data = [
        {
            'title': 'New Tiger Cubs Born in Conservation Center',
            'content': 'Two Sumatran tiger cubs were born at our conservation center, marking a significant success in our breeding program.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sumatran_Tiger_Berlin_Tierpark.jpg',
        },
        {
            'title': 'Successful Rhino Protection Program',
            'content': 'Our Javan rhinoceros protection program has shown promising results with an increase in population numbers.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Rhinoc%C3%A9ros_de_Java.jpg/1200px-Rhinoc%C3%A9ros_de_Java.jpg',
        },
        {
            'title': 'New Conservation Area Established',
            'content': 'A new protected area has been established to help preserve the habitat of endangered species.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG',
        },
        {
            'title': 'Komodo Dragon Population Growing',
            'content': 'Recent surveys show an increase in the Komodo dragon population in protected areas.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/1/18/Komodo_dragon_%28Varanus_komodoensis%29.jpg',
        },
        {
            'title': 'Elephant Conservation Success',
            'content': 'New anti-poaching measures have led to a decrease in elephant poaching incidents.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Sumatran_Elephant_at_Way_Kambas_National_Park.jpg',
        },
        {
            'title': 'Bali Myna Breeding Program',
            'content': 'The Bali Myna breeding program has successfully released new birds into the wild.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Bali_Myna_at_Bali_Bird_Park.jpg',
        },
        {
            'title': 'Marine Conservation Initiative',
            'content': 'New program launched to protect sea turtle nesting sites along Indonesian coasts.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Hawksbill_Sea_Turtle.jpg/1200px-Hawksbill_Sea_Turtle.jpg',
        },
        {
            'title': 'Pangolin Protection Efforts',
            'content': 'Increased enforcement has led to several successful anti-trafficking operations protecting pangolins.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Sunda_Pangolin.jpg',
        },
        {
            'title': 'Rainforest Restoration Project',
            'content': 'Major reforestation project launched to restore critical wildlife habitats.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Sumatran_Elephant_at_Way_Kambas_National_Park.jpg',
        },
        {
            'title': 'Wildlife Corridor Success',
            'content': 'New wildlife corridors have improved animal movement between protected areas.',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sumatran_Tiger_Berlin_Tierpark.jpg',
        }
    ]

    for data in news_data:
        NewsArticle.objects.create(**data)


def remove_sample_data(apps, schema_editor):
    Animal = apps.get_model('animals', 'Animal')
    NewsArticle = apps.get_model('animals', 'NewsArticle')
    Animal.objects.all().delete()
    NewsArticle.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ('animals', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_sample_data, remove_sample_data),
    ]
