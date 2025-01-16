import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";

const AdminService = {
  // Cập nhật role của user
  updateUserRole: async (userId, role) => {
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
      console.error("Error updating user role:", error);
      throw error;
    }
  },

  // Kiểm tra quyền admin
  checkAdminPermission: () => {
    const role = localStorage.getItem("role");
    const isAdmin = localStorage.getItem("isAdmin");
    return role === "admin" && isAdmin === "true";
  },

  // Kiểm tra quyền super admin
  isSuperAdmin: () => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    // Giả sử email của super admin là admin@gmail.com
    return role === "admin" && email === "admin@gmail.com";
  }
};

export default AdminService;
