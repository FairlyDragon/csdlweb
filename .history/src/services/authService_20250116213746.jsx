import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";

const AuthService = {
  checkAdminPermission: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/subadmins/${userId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.role === "admin";
    } catch (error) {
      console.error("Error checking admin permission:", error);
      return false;
    }
  },
};

export default AuthService;
