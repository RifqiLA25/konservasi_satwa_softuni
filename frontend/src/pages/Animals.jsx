import { useState, useEffect } from 'react';
import { getAnimals } from '../services/apiService';
import AnimalList from '../components/AnimalList';
import { CircularProgress, Box, Typography, Container } from '@mui/material';

const Animals = () => {
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

  return <AnimalList animals={animals} />;
};

export default Animals;
