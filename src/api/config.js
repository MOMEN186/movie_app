import axios from 'axios';

export const API_KEY = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export default axiosInstance;