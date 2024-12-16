from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Species, Location, Animal, Conservation, News, UserProfile


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Tambahkan data tambahan ke payload token
        token['user_id'] = user.id
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['email'] = user.email or ''
        
        return token

    def validate(self, attrs):
        # Panggil parent validate
        data = super().validate(attrs)
        user = self.user
        
        # Tambahkan data user ke respons API
        data.update({
            'user_id': user.id,
            'username': user.username,
            'is_staff': user.is_staff,
            'email': user.email or ''
        })
        return data


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_staff = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'is_staff')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Validasi email wajib diisi
        if not validated_data.get('email'):
            raise serializers.ValidationError({'email': 'Email is required'})

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ['id', 'nama', 'nama_latin']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'nama']


class AnimalSerializer(serializers.ModelSerializer):
    species = SpeciesSerializer(read_only=True)
    species_id = serializers.IntegerField(write_only=True, required=False)
    lokasi = LocationSerializer(many=True, read_only=True)
    
    class Meta:
        model = Animal
        fields = ['id', 'nama', 'species', 'species_id', 'status', 'populasi', 'deskripsi', 'gambar', 'lokasi']

    def update(self, instance, validated_data):
        # Handle species update
        species_id = validated_data.pop('species_id', None)
        if species_id:
            try:
                species = Species.objects.get(id=species_id)
                instance.species = species
            except Species.DoesNotExist:
                raise serializers.ValidationError({'species': 'Species tidak ditemukan'})

        # Handle lokasi update
        lokasi_data = self.context['request'].data.getlist('lokasi')
        if lokasi_data:
            instance.lokasi.clear()  # Hapus lokasi yang ada
            lokasi_objects = Location.objects.filter(id__in=lokasi_data)
            instance.lokasi.set(lokasi_objects)

        # Update field lainnya
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance


class ConservationSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer(read_only=True)
    penanggung_jawab = UserSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        write_only=True,
        source='animal'
    )

    class Meta:
        model = Conservation
        fields = '__all__'
        read_only_fields = ('penanggung_jawab',)

    def create(self, validated_data):
        validated_data['penanggung_jawab'] = self.context['request'].user
        return super().create(validated_data)

    def validate(self, data):
        if data.get('tanggal_selesai') and data['tanggal_selesai'] < data['tanggal_mulai']:
            raise serializers.ValidationError({
                'tanggal_selesai': 'Tanggal selesai harus setelah tanggal mulai'
            })
        return data


class NewsSerializer(serializers.ModelSerializer):
    animals = AnimalSerializer(many=True, read_only=True)
    penulis = UserSerializer(read_only=True)
    
    class Meta:
        model = News
        fields = ['id', 'judul', 'konten', 'gambar', 'animals', 'penulis', 'created_at', 'updated_at']

    def create(self, validated_data):
        animals_data = self.context['request'].data.getlist('animals')
        news = News.objects.create(**validated_data)
        if animals_data:
            animals = Animal.objects.filter(id__in=animals_data)
            news.animals.set(animals)
        return news

    def update(self, instance, validated_data):
        animals_data = self.context['request'].data.getlist('animals')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if animals_data:
            animals = Animal.objects.filter(id__in=animals_data)
            instance.animals.set(animals)
        return instance

    def validate_konten(self, value):
        if len(value) < 100:
            raise serializers.ValidationError('Konten berita minimal 100 karakter')
        return value


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'location', 'avatar']
