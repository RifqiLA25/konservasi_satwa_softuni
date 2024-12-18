import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, Typography, Paper, Box, TextField, 
  Button, FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { getConservationById, updateConservation, getAnimals } from '../services/apiService';

function EditConservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    animal: '',
    deskripsi: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    status: 'PLANNED',
    penanggung_jawab: user?.id
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conservationData, animalsData] = await Promise.all([
          getConservationById(id),
          getAnimals()
        ]);
        
        setFormData({
          nama: conservationData.nama,
          animal: conservationData.animal.id,
          deskripsi: conservationData.deskripsi,
          tanggal_mulai: conservationData.tanggal_mulai,
          tanggal_selesai: conservationData.tanggal_selesai || '',
          status: conservationData.status,
          penanggung_jawab: user?.id
        });
        
        setAnimals(animalsData.results || []);
      } catch (err) {
        setError('Gagal memuat data');
      }
    };
    fetchData();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      
      await updateConservation(id, dataToSend);
      navigate('/conservation');
    } catch (err) {
      console.error('Error updating conservation:', err);
      setError(err.message || 'Gagal mengupdate program konservasi');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Program Konservasi
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nama Program"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Satwa</InputLabel>
            <Select
              name="animal"
              value={formData.animal}
              onChange={handleChange}
              required
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
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            type="date"
            label="Tanggal Mulai"
            name="tanggal_mulai"
            value={formData.tanggal_mulai}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            type="date"
            label="Tanggal Selesai"
            name="tanggal_selesai"
            value={formData.tanggal_selesai}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="PLANNED">Direncanakan</MenuItem>
              <MenuItem value="ONGOING">Sedang Berjalan</MenuItem>
              <MenuItem value="COMPLETED">Selesai</MenuItem>
              <MenuItem value="CANCELLED">Dibatalkan</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Simpan Perubahan
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

export default EditConservation; 