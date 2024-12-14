from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Species, Location, Animal, Conservation, News, UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Pastikan semua field ada dan tipe datanya benar
        token['user_id'] = user.id
        token['username'] = str(user.username)
        token['is_staff'] = bool(user.is_staff)
        token['email'] = str(user.email)
        
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        
        # Tambahkan user data ke response
        data.update({
            'user_data': {
                'user_id': user.id,
                'username': str(user.username),
                'is_staff': bool(user.is_staff),
                'email': str(user.email)
            }
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
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            is_staff=validated_data.get('is_staff', '')
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
    lokasi = LocationSerializer(many=True, read_only=True)
    
    class Meta:
        model = Animal
        fields = ['id', 'nama', 'species', 'status', 'populasi', 
                 'deskripsi', 'gambar', 'lokasi']

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
    
    class Meta:
        model = News
        fields = ['id', 'judul', 'konten', 'gambar', 'animals', 'penulis', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['penulis'] = self.context['request'].user
        return super().create(validated_data)

    def validate_konten(self, value):
        if len(value) < 100:
            raise serializers.ValidationError('Konten berita minimal 100 karakter')
        return value

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'location', 'avatar']

