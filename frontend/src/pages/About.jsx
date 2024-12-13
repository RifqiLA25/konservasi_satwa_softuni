import { Container, Typography, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import NatureIcon from '@mui/icons-material/Nature';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';

function About() {
  const statistik = [
    {
      icon: <PetsIcon sx={{ fontSize: 50, color: '#2E7D32' }} />,
      jumlah: '300+',
      label: 'Spesies Dilindungi',
    },
    {
      icon: <NatureIcon sx={{ fontSize: 50, color: '#1565C0' }} />,
      jumlah: '50+',
      label: 'Area Konservasi',
    },
    {
      icon: <PublicIcon sx={{ fontSize: 50, color: '#7B1FA2' }} />,
      jumlah: '20+',
      label: 'Organisasi Mitra',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50, color: '#C62828' }} />,
      jumlah: '1000+',
      label: 'Anggota Komunitas',
    },
  ];

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
            Tentang Kami
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
            Berdedikasi Melestarikan Warisan Satwa Indonesia
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Misi dan Visi */}
        <Paper elevation={3} sx={{ p: 4, mb: 8, borderRadius: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary" fontWeight="bold">
            Misi Kami
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Konservasi Satwa Indonesia berkomitmen untuk melindungi dan melestarikan keanekaragaman hayati Indonesia
            melalui praktik konservasi berkelanjutan, keterlibatan masyarakat, dan inisiatif pendidikan.
            Kami bekerja tanpa lelah untuk memastikan generasi mendatang dapat menikmati keindahan dan
            keajaiban satwa liar Indonesia yang unik.
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom color="primary" fontWeight="bold" sx={{ mt: 6 }}>
            Visi Kami
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Kami membayangkan masa depan di mana satwa liar Indonesia hidup harmonis dengan komunitas manusia,
            di mana spesies terancam punah dapat pulih populasinya, dan di mana konservasi menjadi bagian
            integral dari identitas dan budaya nasional kita.
          </Typography>
        </Paper>

        {/* Statistik */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {statistik.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center', 
                  borderRadius: 4,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                    {stat.jumlah}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Program Kerja */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary" fontWeight="bold">
            Program Kerja
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Program Konservasi
                </Typography>
                <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Kami mengelola berbagai program konservasi di seluruh Indonesia, berfokus pada perlindungan
                  habitat, pemulihan spesies, dan pengelolaan sumber daya berkelanjutan. Program kami dirancang
                  dengan ketelitian ilmiah dan dilaksanakan dengan partisipasi masyarakat.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Keterlibatan Masyarakat
                </Typography>
                <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Kami percaya bahwa konservasi yang berhasil membutuhkan partisipasi aktif masyarakat.
                  Kami bekerja sama dengan komunitas lokal, memberikan edukasi, pelatihan, dan peluang
                  mata pencaharian berkelanjutan yang sejalan dengan tujuan konservasi.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default About;
