import { useState, useEffect } from 'react';
import { getNews } from '../services/apiService';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getNews();
        setNews(response.results || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Berita Terbaru
      </Typography>
      <Grid container spacing={4}>
        {news.map((article) => (
          <Grid item key={article.id} xs={12}>
            <Paper elevation={3}>
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', md: 400 },
                    height: { xs: 240, md: 300 },
                    objectFit: 'cover',
                  }}
                  image={article.gambar || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={article.judul}
                />
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {article.judul}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {article.penulis?.username?.[0]?.toUpperCase() || 'A'}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">
                        {article.penulis?.username || 'Anonymous'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(article.created_at), 'd MMMM yyyy', { locale: id })}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body1" paragraph>
                    {article.konten}
                  </Typography>

                  {article.animals?.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Hewan Terkait:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {article.animals.map((animal) => (
                          <Paper
                            key={animal.id}
                            sx={{
                              px: 2,
                              py: 0.5,
                              bgcolor: 'background.default',
                              borderRadius: 2,
                            }}
                          >
                            <Typography variant="body2">
                              {animal.nama}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
