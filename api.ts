import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const loginWithTelegram = async (telegramData: any) => {
  try {
    const response = await api.post('/api/auth/login', telegramData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const response = await api.get(`/api/game/user/${userId}/data`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

export const updateGameData = async (userId: string, data: any) => {
  try {
    const response = await api.post(`/api/game/user/${userId}/update`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update game data:', error);
    throw error;
  }
};

export const getAdminStats = async () => {
  try {
    const response = await api.get('/api/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    throw error;
  }
};

export const getAdminUsers = async () => {
  try {
    const response = await api.get('/api/admin/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin users:', error);
    throw error;
  }
};