import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/apiService';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
  Avatar,
} from '@mui/material';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    location: '',
    profile_picture: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      if (data.length > 0) {
        setProfile(data[0]);
      }
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (err) {
      setError('Failed to update profile');
      setSuccess('');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={profile.profile_picture}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography component="h1" variant="h5">
            Your Profile
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              name="bio"
              label="Bio"
              multiline
              rows={4}
              value={profile.bio || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="location"
              label="Location"
              value={profile.location || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="profile_picture"
              label="Profile Picture URL"
              value={profile.profile_picture || ''}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
