import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authService = {
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/token/`, {
            username: email,
            password: password
        });
        if (response.data.access) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    register: async (username, email, password) => {
        const response = await axios.post(`${API_URL}/register/`, {
            username,
            email,
            password
        });
        return response.data;
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    // Add token to axios headers
    setupAxiosInterceptors: (token) => {
        axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

export default authService;
