import axios from "axios";

const API_URL = "/api";

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

      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      });

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
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
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
  },

  isAuthenticated: () => {
    return localStorage.getItem("isAuthenticated") === "true";
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};

export default authService;
