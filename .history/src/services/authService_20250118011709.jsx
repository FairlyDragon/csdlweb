import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Tạo axios instance với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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

      const response = await axiosInstance.post("/auth/signup", signupData, {
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

      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.access_token) {
        // Decode token và lưu thông tin
        const tokenData = JSON.parse(
          atob(response.data.access_token.split(".")[1])
        );

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", tokenData.role);
        localStorage.setItem("email", tokenData.sub);
        localStorage.setItem("userId", tokenData.id);

        // Cập nhật token cho axiosInstance
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
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

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axiosInstance.post("/adminlogout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.clear();
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAdmin: () => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    return role === "admin" && email === "admin@admin.com";
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
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return !!token && !!role;
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
