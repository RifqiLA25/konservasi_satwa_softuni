import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, CardContent, CardMedia, Typography, Grid, Box, Chip, Container } from '@mui/material'

function AnimalList({ animals }) {
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Protected Animals
        </Typography>
        <Grid container spacing={4}>
          {animals.map((animal) => (
            <Grid item key={animal.id} xs={12} sm={6} md={4}>
              <Card 
                component={Link} 
                to={`/animals/${animal.id}`}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={animal.gambar || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={animal.nama}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {animal.nama}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {animal.species?.nama_latin}
                  </Typography>
                  <Chip
                    label={getStatusText(animal.status)}
                    color={getStatusColor(animal.status)}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {animal.deskripsi?.substring(0, 150)}
                    {animal.deskripsi?.length > 150 ? '...' : ''}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Populasi: {animal.populasi?.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lokasi: {animal.lokasi?.map(loc => loc.nama).join(', ')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

AnimalList.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nama: PropTypes.string.isRequired,
      gambar: PropTypes.string,
      species: PropTypes.shape({
        nama_latin: PropTypes.string
      }),
      deskripsi: PropTypes.string,
      status: PropTypes.string,
      populasi: PropTypes.number,
      lokasi: PropTypes.arrayOf(
        PropTypes.shape({
          nama: PropTypes.string
        })
      )
    })
  ).isRequired
}

export default AnimalList
