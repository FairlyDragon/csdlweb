import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const authService = {
  signup: async (userData) => {
    try {
      // Log data để debug
      console.log("Data being sent:", {
        username: userData.email,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone_number: userData.phone_number || '',
      });

      const response = await axios.post(`${API_URL}/auth/signup`, {
        username: userData.email,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone_number: userData.phone_number || '',
      });

      console.log("Signup response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Signup Error Details:', {
        data: error.response?.data,
        status: error.response?.status,
        message: error.message
      });
      
      // Throw error message cụ thể
      const errorMessage = error.response?.data?.detail || 'Đăng ký thất bại';
      throw new Error(errorMessage);
    }
  },

  login: async (credentials) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await axios.post(`${API_URL}/auth/login`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  },

  resetPassword: async (email) => {
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await axios.post(`${API_URL}/auth/password_reset`, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Reset Password Error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to reset password');
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  }
};

export default authService;