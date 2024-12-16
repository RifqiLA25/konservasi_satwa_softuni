import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput
} from '@mui/material';
import { getNewsArticle, updateNews, getAnimals } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: null,
    animals: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availableAnimals, setAvailableAnimals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      console.log('EditNews: Loading data for ID:', id);
      console.log('Current user:', user);
      
      if (!id) {
        console.log('No ID provided');
        navigate('/news');
        return;
      }

      try {
        setLoading(true);
        const [newsData, animalsData] = await Promise.all([
          getNewsArticle(id),
          getAnimals()
        ]);
        
        console.log('Loaded news data:', newsData);
        
        if (user?.is_staff || newsData.penulis?.id === user?.user_id) {
          setAvailableAnimals(animalsData.results || []);
          setFormData({
            judul: newsData.judul,
            konten: newsData.konten,
            animals: newsData.animals?.map(animal => animal.id) || [],
            gambar: newsData.gambar
          });
        } else {
          console.log('User not authorized');
          setError('Anda tidak memiliki akses untuk mengedit berita ini');
          setTimeout(() => navigate('/news'), 2000);
        }
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Gagal memuat data berita');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    } else {
      navigate('/login');
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({
        ...prev,
        gambar: e.target.files[0]
      }));
    }
  };

  const handleAnimalChange = (event) => {
    const selectedAnimals = Array.isArray(event.target.value) ? event.target.value : [];
    setFormData(prev => ({
      ...prev,
      animals: selectedAnimals
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judul', formData.judul);
      formDataToSend.append('konten', formData.konten);
      
      if (formData.gambar instanceof File) {
        formDataToSend.append('gambar', formData.gambar);
      }
      
      if (Array.isArray(formData.animals)) {
        formData.animals.forEach(animalId => {
          formDataToSend.append('animals', animalId);
        });
      }

      await updateNews(id, formDataToSend);
      setSuccess('Berita berhasil diperbarui');
      setTimeout(() => {
        navigate('/news');
      }, 1500);
    } catch (err) {
      console.error('Error updating news:', err);
      setError('Gagal memperbarui berita: ' + (err.message || 'Terjadi kesalahan'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Berita
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Konten"
            name="konten"
            value={formData.konten}
            onChange={handleChange}
            multiline
            rows={6}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Hewan Terkait</InputLabel>
            <Select
              multiple
              value={formData.animals}
              onChange={handleAnimalChange}
              input={<OutlinedInput label="Hewan Terkait" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const animal = availableAnimals.find(a => a.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={animal ? animal.nama : 'Tidak ditemukan'} 
                        sx={{ m: 0.5 }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {availableAnimals.map((animal) => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, mb: 3 }}>
            <Button
              variant="contained"
              component="label"
            >
              Upload Gambar Baru
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </Button>
            {formData.gambar && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {formData.gambar instanceof File ? 
                  `File baru: ${formData.gambar.name}` : 
                  'Menggunakan gambar yang sudah ada'}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Simpan Perubahan'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/news')}
              disabled={loading}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditNews; 