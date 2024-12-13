import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Email',
      detail: 'konservasisatwa@gmail.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: '#1565C0' }} />,
      title: 'Telepon',
      detail: '+62 882 1234 5678',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#7B1FA2' }} />,
      title: 'Alamat',
      detail: 'Jl. Konservasi No. 123, Bandung Selatan Jauh',
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
            Hubungi Kami
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300 }}>
            Kami Siap Membantu Anda
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                Informasi Kontak
              </Typography>
              <Box sx={{ mt: 4 }}>
                {contactInfo.map((info, index) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 4,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {info.icon}
                      <Typography variant="h6" sx={{ ml: 2 }}>
                        {info.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ ml: 7 }}>
                      {info.detail}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                Kirim Pesan
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nama Lengkap"
                      name="nama"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subjek"
                      name="subject"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Pesan"
                      name="message"
                      multiline
                      rows={6}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 4,
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    fontSize: '1.1rem'
                  }}
                >
                  Kirim Pesan
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
