from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Species, Location, Animal, Conservation, News

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class AnimalSerializer(serializers.ModelSerializer):
    species = SpeciesSerializer(read_only=True)
    lokasi = LocationSerializer(many=True, read_only=True)
    species_id = serializers.PrimaryKeyRelatedField(
        queryset=Species.objects.all(),
        write_only=True,
        source='species'
    )
    lokasi_ids = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        write_only=True,
        source='lokasi',
        many=True
    )

    class Meta:
        model = Animal
        fields = '__all__'

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
    penulis = UserSerializer(read_only=True)
    animals = AnimalSerializer(many=True, read_only=True)
    animal_ids = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        write_only=True,
        source='animals',
        many=True
    )

    class Meta:
        model = News
        fields = '__all__'
        read_only_fields = ('penulis',)

    def create(self, validated_data):
        validated_data['penulis'] = self.context['request'].user
        return super().create(validated_data)

    def validate_konten(self, value):
        if len(value) < 100:
            raise serializers.ValidationError('Konten berita minimal 100 karakter')
        return value
