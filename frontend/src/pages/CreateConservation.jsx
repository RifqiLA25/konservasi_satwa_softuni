import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel, Alert, Container } from '@mui/material';
import { createConservation, getAnimals } from '../services/apiService';
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
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await getAnimals();
        setAnimals(response.results || []);
      } catch (err) {
        setError('Gagal memuat data satwa');
      }
    };
    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationErrors = validateConservation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    try {
      const dataToSend = {
        nama: formData.nama,
        animal_id: parseInt(formData.animal),
        deskripsi: formData.deskripsi,
        tanggal_mulai: formData.tanggal_mulai,
        tanggal_selesai: formData.tanggal_selesai || null,
        status: formData.status
      };

      console.log('Data yang akan dikirim:', dataToSend);
      
      await createConservation(dataToSend);
      navigate('/conservation');
    } catch (err) {
      console.error('Error creating conservation:', err);
      setError(err.message || 'Gagal menambahkan program konservasi');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tambah Program Konservasi
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nama Program"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Satwa</InputLabel>
          <Select
            name="animal"
            value={formData.animal}
            onChange={handleChange}
          >
            {animals.map((animal) => (
              <MenuItem key={animal.id} value={animal.id}>
                {animal.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          multiline
          rows={4}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Tanggal Mulai"
          name="tanggal_mulai"
          type="date"
          value={formData.tanggal_mulai}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Tanggal Selesai"
          name="tanggal_selesai"
          type="date"
          value={formData.tanggal_selesai}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="PLANNED">Direncanakan</MenuItem>
            <MenuItem value="ONGOING">Sedang Berjalan</MenuItem>
            <MenuItem value="COMPLETED">Selesai</MenuItem>
            <MenuItem value="CANCELLED">Dibatalkan</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Simpan
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/conservation')}
            sx={{ ml: 2 }}
          >
            Batal
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateConservation; 