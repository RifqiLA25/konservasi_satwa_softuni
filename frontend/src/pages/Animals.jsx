import { useState, useEffect } from 'react';
import { getAnimals, deleteAnimal } from '../services/apiService';
import AnimalList from '../components/AnimalList';
import { CircularProgress, Box, Typography, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Animals = () => {
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const response = await getAnimals();
        setAnimals(response.results || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching animals:', err);
        setError('Gagal memuat data hewan. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleDelete = async (id) => {
    if (!user?.is_staff) {
      alert('Anda tidak memiliki izin untuk menghapus data');
      return;
    }

    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await deleteAnimal(id);
        setAnimals(animals.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting animal:', err);
        alert('Gagal menghapus data');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" py={4}>
          <Typography color="error" variant="h6">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return <AnimalList 
    animals={animals} 
    onDelete={handleDelete}
    isStaff={user?.is_staff} 
  />;
};

export default Animals;