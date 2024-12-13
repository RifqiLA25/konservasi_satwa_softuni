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
                  {animal?.species?.nama_latin}
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
                    Lokasi: {animal?.lokasi?.map(loc => loc.nama).join(', ')}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to={`/animals/${animal?.id}`}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    Detail
                  </Button>

                  {isStaff && (
                    <>
                      <Button
                        component={Link}
                        to={`/animals/${animal?.id}/edit`}
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete?.(animal?.id)}
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
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