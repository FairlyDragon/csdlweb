import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";

const AdminService = {
  // Cập nhật role của admin
  updateAdminRole: async (userId, role) => {
    try {
      // Encode userId vì nó chứa các ký tự đặc biệt
      const encodedUserId = encodeURIComponent(userId);
      const response = await axios.put(
        `${API_URL}/subadmins/${encodedUserId}?role=${role}`,
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
      if (error.response?.status === 422) {
        console.error("User is not eligible to be an admin");
        throw new Error("User cannot be made admin");
      }
      console.error("Error updating admin role:", error);
      throw error;
    }
  },

  // Cập nhật status của admin
  updateAdminStatus: async (userId, isActive) => {
    try {
      const encodedUserId = encodeURIComponent(userId);
      const role = isActive ? "admin" : "user";
      const response = await axios.put(
        `${API_URL}/subadmins/${encodedUserId}?role=${role}`,
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
      if (error.response?.status === 422) {
        console.error("Cannot change user status");
        throw new Error("Cannot change user status");
      }
      console.error("Error updating admin status:", error);
      throw error;
    }
  },
};

export default AdminService;
