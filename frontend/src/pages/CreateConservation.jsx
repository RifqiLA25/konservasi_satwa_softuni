import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createConservation } from '../services/apiService';
import { validateConservation } from '../utils/validation';

function CreateConservation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    animal: '',
    deskripsi: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    status: 'PLANNED'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    const errors = validateConservation(formData);
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]); // Tampilkan error pertama
      return;
    }

    try {
      await createConservation(formData);
      navigate('/conservation');
    } catch (err) {
      setError('Gagal menambahkan program konservasi. Silakan coba lagi.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tambah Program Konservasi
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nama Program"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status Program</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status Program"
            >
              <MenuItem value="PLANNED">Direncanakan</MenuItem>
              <MenuItem value="ONGOING">Sedang Berjalan</MenuItem>
              <MenuItem value="COMPLETED">Selesai</MenuItem>
              <MenuItem value="CANCELLED">Dibatalkan</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Tanggal Mulai"
            name="tanggal_mulai"
            type="date"
            value={formData.tanggal_mulai}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Tanggal Selesai"
            name="tanggal_selesai"
            type="date"
            value={formData.tanggal_selesai}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Deskripsi Program"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

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
              onClick={() => navigate('/conservation')}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateConservation; 