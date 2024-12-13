import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import NatureIcon from '@mui/icons-material/Nature';
import GroupsIcon from '@mui/icons-material/Groups';

function Home() {
  const navigate = useNavigate();

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
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/animals')}
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
            Jelajahi Satwa
          </Button>
        </Container>
      </Box>

      {/* Featured Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 4,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
                }}
              >
                <PetsIcon sx={{ 
                  fontSize: 70, 
                  color: 'white', 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.9
                }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  Misi Kami
                </Typography>
                <Typography variant="body1">
                  Kami berkomitmen untuk melindungi dan melestarikan satwa liar Indonesia melalui
                  konservasi, edukasi, dan keterlibatan masyarakat.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 4,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  background: 'linear-gradient(45deg, #7B1FA2 30%, #9C27B0 90%)',
                }}
              >
                <NatureIcon sx={{ 
                  fontSize: 70, 
                  color: 'white', 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.9
                }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  Program Konservasi
                </Typography>
                <Typography variant="body1">
                  Temukan program konservasi yang sedang berjalan dan pelajari bagaimana Anda dapat
                  berkontribusi dalam melindungi spesies terancam punah.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 4,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  background: 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
                }}
              >
                <GroupsIcon sx={{ 
                  fontSize: 70, 
                  color: 'white', 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.9
                }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  Bergabung Bersama Kami
                </Typography>
                <Typography variant="body1">
                  Jadilah bagian dari komunitas pecinta satwa liar dan bantu kami dalam upaya
                  pelestarian satwa Indonesia.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
