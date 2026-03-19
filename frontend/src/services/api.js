import axios from 'axios';

const api = axios.create({
    baseURL: 'https://village-grievance-system.onrender.com/api',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    // The token is handled by HTTP-only cookie, so we don't attach it manually.
    return config;
});

export default api;
