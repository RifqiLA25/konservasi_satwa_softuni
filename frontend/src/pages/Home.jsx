import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
          color: 'white',
          py: 12,
          mb: 6,
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 3px 15px rgba(0,0,0,0.2)',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Konservasi Satwa Indonesia
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 300 }}>
            Melindungi Keanekaragaman Hayati Indonesia
          </Typography>
          {user ? (
            <Typography variant="h6" sx={{ mb: 2 }}>
              Selamat Datang, {user.username}!
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ 
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Bergabung Sekarang
            </Button>
          )}
        </Container>
      </Box>

      {/* Dashboard Section untuk User yang Login */}
      {user && (
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            {/* Menu Admin/Staff */}
            {user.is_staff && (
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Menu Admin
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate('/animals/create')}
                    >
                      Tambah Data Satwa
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate('/news/create')}
                    >
                      Tambah Berita
                    </Button>
                    {/* <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate('/conservation/create')}
                    >
                      Tambah Program Konservasi
                    </Button> */}
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      )}

      {/* Main Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Katalog Satwa */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Katalog Satwa
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                Temukan informasi lengkap tentang spesies satwa dilindungi di Indonesia.
              </Typography>
              <Button 
                variant="contained"
                onClick={() => navigate('/animals')}
              >
                Lihat Katalog
              </Button>
            </Paper>
          </Grid>

          {/* Berita Konservasi */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Berita Konservasi
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                Update terbaru tentang kegiatan konservasi satwa di Indonesia.
              </Typography>
              <Button 
                variant="contained"
                onClick={() => navigate('/news')}
              >
                Baca Berita
              </Button>
            </Paper>
          </Grid>

          {/* Program Konservasi
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Program Konservasi
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                Program-program pelestarian satwa yang sedang berjalan.
              </Typography>
              <Button 
                variant="contained"
                onClick={() => navigate('/conservation')}
              >
                Lihat Program
              </Button>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
