import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = 'http://10.0.2.2:8000/api';
const baseUrl = 'http://192.168.43.70:8000/api';
const token = AsyncStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
