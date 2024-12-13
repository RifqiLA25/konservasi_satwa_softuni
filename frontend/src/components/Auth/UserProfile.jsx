import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/apiService';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Avatar
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    bio: '',
    location: '',
    avatar: null
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, [user, navigate]);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      // Jika ada avatar yang sudah tersimpan, gunakan URL lengkapnya
      if (data.avatar) {
        setAvatarPreview(`http://localhost:8000${data.avatar}`);
      }
    } catch (err) {
      setError('Gagal memuat profil');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(prev => ({
        ...prev,
        avatar: file
      }));
      // Buat preview untuk file yang baru dipilih
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('bio', profile.bio);
      formData.append('location', profile.location);
      
      // Pastikan file ada sebelum append
      if (profile.avatar instanceof File) {
        formData.append('avatar', profile.avatar);
      }
      
      // Tambahkan header multipart/form-data
      await updateProfile(formData);
      setSuccess('Profil berhasil diperbarui');
      setError('');
      loadProfile();
    } catch (err) {
      setError('Gagal memperbarui profil: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Profil Saya
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Avatar
              src={avatarPreview}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
            >
              Upload Foto Profil
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Lokasi"
            name="location"
            value={profile.location}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Simpan Perubahan
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
