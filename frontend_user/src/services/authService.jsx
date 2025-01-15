import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const authService = {
  signup: async (userData) => {
    try {
      // Sửa lại để nhận role từ form đăng ký
      const signupData = {
        email: userData.email,
        password: userData.password,
        role: userData.role || "customer"  // Lấy role từ userData hoặc mặc định là customer
      };

      console.log('Sending signup data:', signupData);

      const response = await axios.post(`${API_URL}/auth/signup`, signupData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error details:', error.response?.data);
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (credentials) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      formData.append('grant_type', 'password');
      formData.append('scope', '');
      formData.append('client_id', 'string');
      formData.append('client_secret', 'string');

      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        }
      });

      if (response.data.access_token) {
        // Lưu thêm role vào localStorage
        localStorage.setItem('user', JSON.stringify({
          ...response.data,
          email: credentials.username,
          role: response.data.role // Đảm bảo API trả về role
        }));
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('userRole', response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  resetPassword: async (email) => {
    try {
      console.log('Sending reset password request for email:', email);
      
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/auth/reset-password`,
        data: { email },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Reset password response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Reset password error details:', error.response?.data);
      throw error.response?.data || { detail: 'Failed to send password reset email' };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('token'); // Thêm xóa token mới
    localStorage.removeItem('userRole'); // Thêm xóa userRole
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // Thêm method mới để kiểm tra role
  getUserRole: () => {
    const user = authService.getCurrentUser();
    return user?.role || null;
  }
};

export default authService;