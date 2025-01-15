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

      // Lưu thông tin user và token
      if (response.data.access_token) {
        const userData = {
          token: response.data.access_token,
          role: response.data.role // Backend trả về role trong response
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('userRole', response.data.role);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post('/auth/signup', {
        email: userData.email,
        password: userData.password,
        role: userData.role, // Thêm role vào request
        username: userData.username
      });

      // Nếu đăng ký thành công, tự động đăng nhập
      if (response.data.detail === "User created successfully") {
        return await authService.login({
          username: userData.email,
          password: userData.password
        });
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/auth/login'; // Chuyển về trang login sau khi logout
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Kiểm tra role của user
  isShipper: () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'shipper';
  },

  isCustomer: () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'customer';
  },

  // Lấy đường dẫn mặc định dựa theo role
  getDefaultRoute: () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'shipper') {
      return '/shipper/dashboard';
    }
    return '/'; // Mặc định về trang chủ cho customer
  }
};

export default authService;