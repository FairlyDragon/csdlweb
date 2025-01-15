import axios from 'axios';

// Tạo instance của axios với cấu hình mặc định
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL của FastAPI backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Cho phép gửi cookies trong requests
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Xử lý lỗi response
    if (error.response) {
      // Nếu token hết hạn (status 401)
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        // Redirect to login page
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;