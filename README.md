# Konservasi Satwa Indonesia 🦁

Aplikasi web untuk mendukung konservasi satwa liar Indonesia yang menyediakan informasi tentang spesies yang dilindungi, berita konservasi, dan edukasi masyarakat.

---

## 📋 Deskripsi

**Konservasi Satwa Indonesia** adalah aplikasi web yang bertujuan untuk memberikan informasi yang lengkap mengenai spesies satwa liar yang dilindungi di Indonesia, serta berita dan edukasi seputar konservasi satwa. 

Aplikasi ini memiliki fitur utama sebagai berikut:
- **Katalog Satwa Dilindungi**: Informasi spesies satwa dilindungi di Indonesia.
- **Portal Berita Konservasi**: Berita terkini mengenai konservasi satwa liar.
- **Informasi Lokasi dan Habitat**: Habitat alami spesies satwa.
- **Status Konservasi dan Populasi**: Data status populasi satwa dilindungi.

---

## 🛠️ Teknologi

### Frontend
- React 18
- Material-UI
- React Router v6
- Axios
- Vite

### Backend
- Django 5.0
- Django REST Framework
- SQLite3
- Django CORS Headers
- Simple JWT

---

## 📥 Instalasi

Berikut langkah-langkah instalasi untuk menjalankan proyek secara lokal.

### Clone Repository

Clone repository ke dalam komputer lokal Anda:

bash
git clone https://github.com/RifqiLA25/konservasi_satwa_softuni.git

Setup Backend
Masuk ke direktori backend:

cd konservasi_satwa_softuni/backend
Buat virtual environment:

Untuk Windows:
python -m venv venv
venv\Scripts\activate
Untuk Linux/Mac:
python3 -m venv venv
source venv/bin/activate
Install dependencies:

pip install -r requirements.txt
Jalankan migrasi database:

python manage.py migrate
Buat superuser (opsional, untuk admin panel):

python manage.py createsuperuser
Jalankan server backend:

python manage.py runserver
Backend akan berjalan di http://127.0.0.1:8000/.

Setup Frontend
Masuk ke direktori frontend:

cd ../frontend
Install dependencies:

npm install
Jalankan server frontend:

npm run dev
Frontend akan berjalan di http://localhost:3000.



## 🌟 Fitur

### Admin Panel
- Manajemen data satwa
- Manajemen berita
- Manajemen lokasi
- Manajemen program konservasi

### Frontend
- Katalog satwa dilindungi
- Portal berita konservasi
- Informasi lokasi dan habitat
- Halaman about dan kontak

## 📱 Endpoints API

### Animals
- GET /api/animals/ - Daftar satwa
- GET /api/animals/{id}/ - Detail satwa

### News
- GET /api/news/ - Daftar berita
- GET /api/news/{id}/ - Detail berita

### Locations
- GET /api/locations/ - Daftar lokasi
- GET /api/locations/{id}/ - Detail lokasi

## 👤 Pengembang

**Rifqi LA**
- GitHub: [@RifqiLA25](https://github.com/RifqiLA25)

## 📝 Lisensi

Project ini dibuat untuk tujuan pembelajaran di SoftUni.
