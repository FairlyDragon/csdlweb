import axios from "axios";

// Sửa lại API_URL
const API_URL = "http://127.0.0.1:8000"; // Thêm /api vào URL

const authService = {
  signup: async (userData) => {
    try {
      // Log dữ liệu gửi đi
      console.log('Signup Request Data:', userData);

      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Signup Response:', response.data);
      return response.data;
    } catch (error) {
      // Log chi tiết lỗi
      console.error('Signup Error Details:', error.response?.data);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;