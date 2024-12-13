import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Chip } from '@mui/material';
import { createNews } from '../services/apiService';

function CreateNews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: null,
    animals: []
  });
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validasi konten minimal 100 karakter
      if (formData.konten.length < 100) {
        setError('Konten berita minimal 100 karakter');
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'animals') {
          formData[key].forEach(animalId => {
            formDataToSend.append('animals', animalId);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await createNews(formDataToSend);
      navigate('/news');
    } catch (err) {
      setError('Gagal menambahkan berita. Silakan coba lagi.');
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
            helperText="Minimal 100 karakter"
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
            <Chip 
              label={formData.gambar.name} 
              onDelete={() => setFormData(prev => ({ ...prev, gambar: null }))}
              sx={{ ml: 2 }}
            />
          )}

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