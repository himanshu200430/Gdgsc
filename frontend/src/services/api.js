import axios from 'axios';

// Environment-based API URL selection
const isProduction = process.env.REACT_APP_ENV === 'production';
const API_BASE_URL = isProduction 
    ? process.env.REACT_APP_PROD_API_URL 
    : process.env.REACT_APP_DEV_API_URL;

console.log(`Frontend running in ${process.env.REACT_APP_ENV} mode`);
console.log(`API Base URL: ${API_BASE_URL}`);

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add JWT token to every request
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

// Response Interceptor: Handle global errors like 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If 401 (Unauthorized) and it's not the login/signup route itself
        if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login') && !error.config.url.includes('/auth/signup')) {
            console.warn('Authentication expired or invalid. Logging out.');
            localStorage.removeItem('token');
            // This is a simple redirect. In a full app, you might dispatch a Redux action
            // or use the navigate hook from react-router-dom from a higher component.
            // For now, this direct assignment works but causes a full page reload.
            window.location.href = '/login?session_expired=true';
        }
        return Promise.reject(error);
    }
);

export default api;