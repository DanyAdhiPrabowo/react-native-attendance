import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://absen.practicadev.my.id/api';
// const baseUrl = 'http://192.168.43.70:8000/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async response => {
    if (response.data.status === 'Token is Expired') {
      await AsyncStorage.removeItem('userToken');
    }
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
