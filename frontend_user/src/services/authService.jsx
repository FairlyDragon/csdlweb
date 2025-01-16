import axios from '../utils/axios';

const authService = {
  login: async (credentials) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      formData.append('grant_type', 'password');
      formData.append('scope', '');
      formData.append('client_id', 'string');
      formData.append('client_secret', 'string');

      const response = await axios.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.access_token) {
        const userData = {
          token: response.data.access_token,
          role: response.data.role
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('userRole', response.data.role);
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || error;
    }
  },

  signup: async (userData) => {
    try {
      console.log('Signup request data:', userData);
      const response = await axios.post('/auth/signup', {
        email: userData.email,
        password: userData.password,
        role: userData.role,
        id: userData.username
      });

      console.log('Signup response:', response);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/auth/login';
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isShipper: () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'shipper';
  },

  isCustomer: () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'customer';
  },

  getDefaultRoute: () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'shipper') {
      return '/shipper/waiting';
    }
    return '/';
  }
};

export default authService;