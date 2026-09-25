import axios from 'axios';
import { getToken, clearAuth } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
});

// 1.Here we are Adding the login token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Handle all errors in one place
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Cancelled requests are not real errors so here passing them on as they are
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    let message = 'Something went wrong. Please try again.';

    if (error.response) {
      message = error.response.data?.message || message;
    } else if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Please try again.';
    } else {
      message = 'Network error. Please check your internet connection.';
    }

    // Checking here Token expired or invalid: send the user back to login
    if (status === 401 && !error.config.url.includes('/auth/login')) {
      clearAuth();
      window.location.href = '/login';
    }

    const customError = new Error(message);
    customError.status = status;
    return Promise.reject(customError);
  }
);

export default axiosInstance;