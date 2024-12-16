import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const getStatusText = (status) => {
  const statusMap = {
    'CR': 'Critically Endangered',
    'EN': 'Endangered',
    'VU': 'Vulnerable',
    'NT': 'Near Threatened',
    'LC': 'Least Concern'
  };
  return statusMap[status] || status;
};

const getStatusColor = (status) => {
  const colorMap = {
    'CR': 'error',
    'EN': 'error',
    'VU': 'warning',
    'NT': 'info',
    'LC': 'success'
  };
  return colorMap[status] || 'default';
};

const AnimalList = ({ animals = [], onDelete, isStaff }) => {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Satwa Dilindungi
        </Typography>

        {isStaff && (
          <Button
            component={Link}
            to="/animals/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Tambah Satwa Baru
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid item xs={12} sm={6} md={4} key={animal?.id || Math.random()}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 3
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={animal?.gambar || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={animal?.nama}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {animal?.nama}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Species: {animal?.species?.nama || 'Tidak ada data'}
                </Typography>
                <Chip
                  label={getStatusText(animal?.status)}
                  color={getStatusColor(animal?.status)}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {animal?.deskripsi?.substring(0, 150)}
                  {animal?.deskripsi?.length > 150 ? '...' : ''}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Populasi: {animal?.populasi?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lokasi: {Array.isArray(animal?.lokasi) ? 
                      animal.lokasi.map(loc => loc.nama).join(', ') : 
                      'Tidak ada data lokasi'}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to={`/animals/${animal?.id}`}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: '#2196f3',
                      '&:hover': {
                        backgroundColor: '#1976d2',
                        boxShadow: '0 2px 4px rgba(33, 150, 243, 0.25)'
                      }
                    }}
                  >
                    Detail
                  </Button>

                  {isStaff && (
                    <>
                      <Button
                        component={Link}
                        to={`/animals/edit/${animal?.id}`}
                        variant="contained"
                        color="warning"
                        size="small"
                        startIcon={<EditIcon />}
                        sx={{
                          backgroundColor: '#ff9800',
                          '&:hover': {
                            backgroundColor: '#f57c00',
                            boxShadow: '0 2px 4px rgba(255, 152, 0, 0.25)'
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete?.(animal?.id)}
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        sx={{
                          backgroundColor: '#f44336',
                          '&:hover': {
                            backgroundColor: '#d32f2f',
                            boxShadow: '0 2px 4px rgba(244, 67, 54, 0.25)'
                          }
                        }}
                      >
                        Hapus
                      </Button>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

AnimalList.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nama: PropTypes.string,
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
  ),
  onDelete: PropTypes.func,
  isStaff: PropTypes.bool
};

export default AnimalList;