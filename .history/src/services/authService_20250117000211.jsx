const authService = {
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
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", credentials.username);
        localStorage.setItem("isAuthenticated", "true");
        
        // Chỉ có super admin mới có isAdmin = true
        const isSuperAdmin = credentials.username === "admin@admin.com";
        localStorage.setItem("isAdmin", isSuperAdmin ? "true" : "false");
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Kiểm tra có phải admin không (bao gồm cả super admin và admin thường)
  isAdmin: () => {
    return localStorage.getItem("role") === "admin";
  },

  // Kiểm tra có phải super admin không
  isSuperAdmin: () => {
    const email = localStorage.getItem("email");
    return email === "admin@admin.com";
  }
};