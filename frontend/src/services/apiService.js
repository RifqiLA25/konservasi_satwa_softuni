import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error) => {
  if (error.response) {
    console.error('Response error:', error.response.data);
    if (error.response.status === 401) {
      // Token tidak valid atau expired, hapus token
      localStorage.removeItem('token');
    }
    throw new Error(error.response.data.detail || 'Terjadi kesalahan pada server');
  } else if (error.request) {
    console.error('Request error:', error.request);
    throw new Error('Tidak dapat terhubung ke server. Mohon periksa koneksi Anda.');
  } else {
    console.error('Error:', error.message);
    throw new Error('Terjadi kesalahan. Silakan coba lagi nanti.');
  }
};

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('/token/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const register = async (userData) => {
  const response = await api.post('/users/', userData);
  return response.data;
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/token/', credentials);
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return { message: 'Logged out successfully' };
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me/');
  return response.data;
};

// Animals
export const getAnimals = async () => {
  try {
    const response = await api.get('/animals/');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAnimal = async (id) => {
  const response = await api.get(`/animals/${id}/`);
  return response.data;
};

export const createAnimal = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/animals/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateAnimal = async (id, data) => {
  const response = await api.put(`/animals/${id}/`, data);
  return response.data;
};

export const deleteAnimal = async (id) => {
  const response = await api.delete(`/animals/${id}/`);
  return response.data;
};

// Conservation Projects
export const getProjects = async () => {
  const response = await api.get('/projects/');
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post('/projects/', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/projects/${id}/`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}/`);
  return response.data;
};

// News Articles
export const getNews = async () => {
  try {
    const response = await api.get('/news/');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getNewsArticle = async (id) => {
  const response = await api.get(`/news/${id}/`);
  return response.data;
};

export const createNewsArticle = async (data) => {
  const response = await api.post('/news/', data);
  return response.data;
};

export const updateNewsArticle = async (id, data) => {
  const response = await api.put(`/news/${id}/`, data);
  return response.data;
};

export const deleteNewsArticle = async (id) => {
  const response = await api.delete(`/news/${id}/`);
  return response.data;
};

// Donations
export const getDonations = async () => {
  const response = await api.get('/donations/');
  return response.data;
};

export const createDonation = async (donationData) => {
  const response = await api.post('/donations/', donationData);
  return response.data;
};

// User Profile
export const getProfile = async () => {
  const response = await api.get('/profiles/me/');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/profiles/me/', data);
  return response.data;
};

// Fungsi untuk membuat berita baru
export const createNews = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/news/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fungsi untuk membuat program konservasi baru
export const createConservation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/conservation/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Helper function untuk mendapatkan token
const getAuthToken = () => {
  const authTokens = localStorage.getItem('authTokens');
  if (authTokens) {
    return JSON.parse(authTokens).access;
  }
  return null;
};

// Helper function untuk handle error
const handleError = (error) => {
  if (error.response) {
    // Server merespons dengan status error
    throw error.response.data;
  } else if (error.request) {
    // Request dibuat tapi tidak ada respons
    throw new Error('Tidak dapat terhubung ke server');
  } else {
    // Error lainnya
    throw new Error('Terjadi kesalahan');
  }
};

export default api;
