import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sidi-be.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear local storage and reload page on unauthorized
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('hasCompletedQuestions');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 