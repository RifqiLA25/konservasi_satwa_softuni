import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'konservasi_indonesia.settings')
django.setup()

from core.models import Species, Location, Animal, Conservation, News
from django.contrib.auth.models import User

# Create a superuser if it doesn't exist
try:
    superuser = User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123'
    )
    print('Superuser created successfully')
except:
    print('Superuser already exists')

# Create Species
species_data = [
    {
        'nama': 'Orangutan',
        'nama_latin': 'Pongo pygmaeus',
        'deskripsi': 'Orangutan adalah kera besar yang hidup di hutan hujan Indonesia.'
    },
    {
        'nama': 'Harimau Sumatera',
        'nama_latin': 'Panthera tigris sumatrae',
        'deskripsi': 'Harimau Sumatera adalah subspesies harimau yang hanya ditemukan di pulau Sumatera.'
    },
    {
        'nama': 'Badak Jawa',
        'nama_latin': 'Rhinoceros sondaicus',
        'deskripsi': 'Badak Jawa adalah salah satu mamalia yang paling langka di dunia.'
    },
]

# Create Locations
location_data = [
    {
        'nama': 'Taman Nasional Gunung Leuser',
        'provinsi': 'Aceh',
        'pulau': 'Sumatera',
        'deskripsi': 'Taman nasional yang merupakan habitat alami orangutan.',
        'koordinat': '3.8167° N, 97.3500° E'
    },
    {
        'nama': 'Taman Nasional Way Kambas',
        'provinsi': 'Lampung',
        'pulau': 'Sumatera',
        'deskripsi': 'Taman nasional yang menjadi rumah bagi harimau Sumatera.',
        'koordinat': '5.0500° S, 105.7667° E'
    },
    {
        'nama': 'Taman Nasional Ujung Kulon',
        'provinsi': 'Banten',
        'pulau': 'Jawa',
        'deskripsi': 'Habitat terakhir badak Jawa di dunia.',
        'koordinat': '6.7500° S, 105.3333° E'
    },
]

# Create Animals
animal_data = [
    {
        'nama': 'Orangutan Kalimantan',
        'status': 'CR',
        'populasi': 104700,
        'deskripsi': 'Orangutan Kalimantan adalah salah satu spesies kera besar yang terancam punah.',
    },
    {
        'nama': 'Harimau Sumatera',
        'status': 'CR',
        'populasi': 400,
        'deskripsi': 'Harimau Sumatera adalah subspesies harimau yang paling kecil.',
    },
    {
        'nama': 'Badak Jawa',
        'status': 'CR',
        'populasi': 74,
        'deskripsi': 'Badak Jawa adalah salah satu spesies badak yang paling langka di dunia.',
    },
]

# Create the data
print('Creating sample data...')

# Create Species
species_objects = []
for data in species_data:
    species, created = Species.objects.get_or_create(**data)
    species_objects.append(species)
    print(f'Species {"created" if created else "already exists"}: {species.nama}')

# Create Locations
location_objects = []
for data in location_data:
    location, created = Location.objects.get_or_create(**data)
    location_objects.append(location)
    print(f'Location {"created" if created else "already exists"}: {location.nama}')

# Create Animals
for i, data in enumerate(animal_data):
    animal, created = Animal.objects.get_or_create(
        species=species_objects[i],
        **data
    )
    if created:
        animal.lokasi.add(location_objects[i])
        print(f'Animal created: {animal.nama}')
    else:
        print(f'Animal already exists: {animal.nama}')

# Create News Articles
news_data = [
    {
        'judul': 'Populasi Orangutan Meningkat',
        'konten': 'Sebuah studi terbaru menunjukkan peningkatan populasi orangutan di Kalimantan.',
        'penulis': User.objects.first(),
    },
    {
        'judul': 'Kelahiran Badak Jawa Baru',
        'konten': 'Taman Nasional Ujung Kulon melaporkan kelahiran badak Jawa yang baru.',
        'penulis': User.objects.first(),
    },
]

for data in news_data:
    news, created = News.objects.get_or_create(**data)
    if created:
        # Add related animals
        if 'Orangutan' in data['judul']:
            news.animals.add(Animal.objects.filter(nama__contains='Orangutan').first())
        elif 'Badak' in data['judul']:
            news.animals.add(Animal.objects.filter(nama__contains='Badak').first())
        print(f'News article created: {news.judul}')
    else:
        print(f'News article already exists: {news.judul}')

print('Sample data creation completed!')
