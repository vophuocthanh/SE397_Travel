import axios from 'axios';
import { getToken } from './storage';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
