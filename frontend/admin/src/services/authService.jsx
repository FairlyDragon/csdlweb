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
          "Content-Type": "application/json",
          Accept: "application/json",
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
        // Lưu token và loại token
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);
        // Lưu thông tin user
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: credentials.username,
            token: response.data.access_token,
          })
        );
        // Đánh dấu đã đăng nhập
        localStorage.setItem("isAuthenticated", "true");
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error.response?.data || error;
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
          "Content-Type": "application/json",
          Accept: "application/json",
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
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};

export default authService;
