import { useState, useEffect } from 'react';
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
  Button,
} from '@mui/material';
import { getNews, deleteNewsArticle } from '../services/apiService';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const News = () => {
  const { user } = useAuth();
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

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await deleteNewsArticle(id);
        setNews(news.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting news:', err);
        alert('Gagal menghapus berita');
      }
    }
  };

  const canModify = (article) => {
    if (!user) return false;
    return user.is_staff || article.penulis?.id === user.id;
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Berita Terbaru
        </Typography>
        {user && (
          <Button
            component={Link}
            to="/news/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Tulis Berita
          </Button>
        )}
      </Box>

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

                  {canModify(article) && (
                    <Box sx={{ p: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        component={Link}
                        to={`/news/${article.id}/edit`}
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(article.id)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Hapus
                      </Button>
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
