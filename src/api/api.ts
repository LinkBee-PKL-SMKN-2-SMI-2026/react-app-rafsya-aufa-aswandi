import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const api = axios.create({
  baseURL: 'https://rent-car-pkl.linkbee.id/api',
});

// Interceptor untuk menyisipkan token di setiap request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});