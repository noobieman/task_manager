// src/api.js
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // or your backend URL
});

// Add a request interceptor to automatically send auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ensure key matches AuthContext
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Pass the token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
