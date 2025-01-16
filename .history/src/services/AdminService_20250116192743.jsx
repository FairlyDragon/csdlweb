import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";

const AdminService = {
  // Cập nhật role của admin
  updateAdminRole: async (userId, role) => {
    try {
      const response = await axios.put(
        `${API_URL}/subadmins/${userId}?role=${role}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating admin role:", error);
      throw error.response?.data || error;
    }
  },

  // Cập nhật status của admin
  updateAdminStatus: async (userId, isActive) => {
    try {
      const role = isActive ? "admin" : "user";
      const response = await axios.put(
        `${API_URL}/subadmins/${userId}?role=${role}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating admin status:", error);
      throw error.response?.data || error;
    }
  },
};

export default AdminService;
