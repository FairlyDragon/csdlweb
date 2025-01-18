import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Tạo axios instance với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use(
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

// Thêm interceptor để xử lý response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.clear();
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

const authService = {
  signup: async (userData) => {
    try {
      // Đảm bảo gửi đúng format theo API yêu cầu
      const signupData = {
        email: userData.email,
        password: userData.password,
        role: "admin", // Thêm role là customer
      };

      console.log("Sending signup data:", signupData); // Log để debug

      const response = await axiosInstance.post('/auth/signup', signupData, {
        headers: {
          accept: "application/json",
        },
      });

      console.log("Signup response:", response.data); // Log response
      return response.data;
    } catch (error) {
      console.error("Signup error details:", error.response?.data); // Log chi tiết lỗi
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  login: async (credentials) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);
      formData.append("grant_type", "password");
      formData.append("scope", "");
      formData.append("client_id", "string");
      formData.append("client_secret", "string");

      const response = await axiosInstance.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('isAdmin', response.data.role === 'admin');
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  resetPassword: async (email) => {
    try {
      console.log("Sending reset password request for email:", email);

      const response = await axiosInstance({
        method: "POST",
        url: `/auth/reset-password`,
        data: { email },
        headers: {
          accept: "application/json",
        },
      });

      console.log("Reset password response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Reset password error details:", error.response?.data);
      throw (
        error.response?.data || {
          detail: "Failed to send password reset email",
        }
      );
    }
  },

  logout: () => {
    localStorage.clear();
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAdmin: () => {
    const role = localStorage.getItem("role");
    console.log("Checking admin role:", role); // Debug
    return role === "admin";
  },

  getRole: () => {
    return localStorage.getItem("role") || "user";
  },

  // Lưu token khi đăng nhập
  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  // Xóa token khi đăng xuất
  removeToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Lấy token để gửi request
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Kiểm tra quyền super admin
  isSuperAdmin: () => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    console.log("Checking super admin:", { role, email }); // Debug
    return role === "admin" && email === "admin@admin.com";
  },
};

export default authService;
export { axiosInstance };
