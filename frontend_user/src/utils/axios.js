import axios from 'axios';

// Tạo instance của axios với cấu hình mặc định
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL của FastAPI backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Cho phép gửi cookies trong requests
});

/// Add a request interceptor
instance.interceptors.request.use(
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

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default instance;