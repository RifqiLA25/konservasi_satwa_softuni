import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createAnimal } from '../services/apiService';

function CreateAnimal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    species: '',
    status: '',
    populasi: '',
    deskripsi: '',
    gambar: null
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
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await createAnimal(formDataToSend);
      navigate('/animals');
    } catch (err) {
      setError('Gagal menambahkan data satwa. Silakan coba lagi.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tambah Data Satwa
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nama Satwa"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status Konservasi</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status Konservasi"
            >
              <MenuItem value="CR">Critically Endangered</MenuItem>
              <MenuItem value="EN">Endangered</MenuItem>
              <MenuItem value="VU">Vulnerable</MenuItem>
              <MenuItem value="NT">Near Threatened</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Populasi"
            name="populasi"
            type="number"
            value={formData.populasi}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
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

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Simpan
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/animals')}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateAnimal; 