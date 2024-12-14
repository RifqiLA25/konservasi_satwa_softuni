import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { createNews, getAnimals } from '../services/apiService';

const validateNews = (data) => {
  const errors = {};

  // Validasi judul
  if (!data.judul?.trim()) {
    errors.judul = 'Judul berita wajib diisi';
  }

  // Validasi konten
  if (!data.konten || data.konten.length < 100) {
    errors.konten = 'Konten berita minimal 100 karakter';
  }

  // Validasi gambar
  if (!data.gambar) {
    errors.gambar = 'Gambar berita wajib diupload';
  }

  return errors;
};

function CreateNews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: null,
    animals: []
  });
  const [availableAnimals, setAvailableAnimals] = useState([]);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('authTokens');
    if (!token) {
      navigate('/login');
    }
    // Fetch available animals
    const fetchAnimals = async () => {
      try {
        const response = await getAnimals();
        setAvailableAnimals(response.results || []);
      } catch (err) {
        console.error('Error fetching animals:', err);
      }
    };
    fetchAnimals();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      gambar: e.target.files[0]
    }));
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
    
    // Validasi form sebelum submit
    const validationErrors = validateNews(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError('Mohon perbaiki kesalahan berikut:');
      setFormErrors(validationErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judul', formData.judul);
      formDataToSend.append('konten', formData.konten);
      
      if (formData.gambar) {
        formDataToSend.append('gambar', formData.gambar);
      }
      
      if (Array.isArray(formData.animals)) {
        formData.animals.forEach(animalId => {
          formDataToSend.append('animals', animalId);
        });
      }

      await createNews(formDataToSend);
      navigate('/news');
    } catch (err) {
      setError('Gagal membuat berita: ' + err.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tambah Berita
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Judul Berita"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            margin="normal"
            required
            error={!!formErrors.judul}
            helperText={formErrors.judul}
          />

          <TextField
            fullWidth
            label="Konten Berita"
            name="konten"
            value={formData.konten}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={6}
            required
            helperText={`${formData.konten.length}/100 karakter minimum`}
            error={formData.konten.length > 0 && formData.konten.length < 100}
          />

          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Gambar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {formData.gambar && (
            <Typography variant="body2" sx={{ ml: 2 }}>
              File terpilih: {formData.gambar.name}
            </Typography>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Hewan Terkait</InputLabel>
            <Select
              multiple
              value={formData.animals}
              onChange={handleAnimalChange}
              input={<OutlinedInput label="Hewan Terkait" />}
            >
              {availableAnimals.map((animal) => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Publikasikan
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/news')}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateNews; 