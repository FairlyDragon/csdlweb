import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const authService = {
  signup: async (userData) => {
    try {
      // Đảm bảo gửi đúng format theo API yêu cầu
      const signupData = {
        email: userData.email,
        password: userData.password,
        role: "customer", // Thêm role là customer
      };

      console.log("Sending signup data:", signupData); // Log để debug

      const response = await axios.post(`${API_URL}/auth/signup`, signupData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          accept: "application/json",
        },
      });

      if (response.data.access_token) {
        // Lưu token và thông tin người dùng
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", credentials.username);
        localStorage.setItem("isAuthenticated", "true");

        // Chỉ set isAdmin true nếu là super admin
        const isSuperAdmin =
          credentials.username === "admin@admin.com" &&
          response.data.role === "admin";
        localStorage.setItem("isAdmin", isSuperAdmin ? "true" : "false");
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

      const response = await axios({
        method: "POST",
        url: `${API_URL}/auth/reset-password`,
        data: { email },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm vào cùng với accept
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
    // Xóa tất cả thông tin người dùng khi logout
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuthenticated");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAdmin: () => {
    const role = localStorage.getItem('role');
    console.log("Checking admin role:", role); // Debug
    return role === 'admin';
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
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    console.log("Checking super admin:", { role, email }); // Debug
    return role === 'admin' && email === 'admin@admin.com';
  },
};

export default authService;
