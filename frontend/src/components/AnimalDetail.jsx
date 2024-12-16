import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  Container, 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  Chip,
  CircularProgress,
  Button,
  Grid,
  Paper
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getAnimal } from '../services/apiService'
import { useAuth } from '../context/AuthContext'

function AnimalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [animal, setAnimal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/animals/${id}` } })
      return
    }

    const fetchAnimal = async () => {
      try {
        setLoading(true)
        const data = await getAnimal(id)
        setAnimal(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching animal details:', err)
        setError('Gagal memuat detail hewan. Silakan coba lagi nanti.')
      } finally {
        setLoading(false)
      }
    }

    fetchAnimal()
  }, [id, user, navigate])

  const getStatusColor = (status) => {
    const statusColors = {
      'CR': 'error',
      'EN': 'warning',
      'VU': 'info',
      'NT': 'default',
      'LC': 'success'
    }
    return statusColors[status] || 'default'
  }

  const getStatusText = (status) => {
    const statusText = {
      'CR': 'Critically Endangered',
      'EN': 'Endangered',
      'VU': 'Vulnerable',
      'NT': 'Near Threatened',
      'LC': 'Least Concern'
    }
    return statusText[status] || status
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" py={4}>
          <Typography color="error" variant="h6">{error}</Typography>
          <Button
            component={Link}
            to="/animals"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Kembali ke Daftar Hewan
          </Button>
        </Box>
      </Container>
    )
  }

  if (!animal) return null

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/animals"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Kembali ke Daftar Hewan
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={animal.gambar || 'https://via.placeholder.com/400x400?text=No+Image'}
              alt={animal.nama}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {animal.nama}
              </Typography>
              
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {animal.species?.nama_latin}
              </Typography>

              <Chip
                label={getStatusText(animal.status)}
                color={getStatusColor(animal.status)}
                sx={{ mb: 2 }}
              />

              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Deskripsi
                </Typography>
                <Typography variant="body1" paragraph>
                  {animal.deskripsi}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Populasi
                </Typography>
                <Typography variant="body1">
                  {animal.populasi?.toLocaleString()} individu
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Spesies
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Nama:</strong> {animal.species?.nama}
                  <br />
                  <strong>Nama Latin:</strong> {animal.species?.nama_latin}
                  <br />
                  <strong>Deskripsi:</strong> {animal.species?.deskripsi}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Lokasi
                </Typography>
                {animal.lokasi?.map((loc) => (
                  <Card key={loc.id} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {loc.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Provinsi: {loc.provinsi}
                      <br />
                      Pulau: {loc.pulau}
                      <br />
                      Koordinat: {loc.koordinat}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {loc.deskripsi}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AnimalDetail
