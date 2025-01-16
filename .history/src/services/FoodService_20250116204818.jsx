import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/foods"; // Thêm lại /admin

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const foodService = {
  // Lấy danh sách món ăn
  async getFoods() {
    try {
      const response = await axiosInstance.get("/menuitems/"); // Sửa endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching foods:", error);
      throw error;
    }
  },

  // Thêm món ăn mới
  async createFood(foodData) {
    try {
      const response = await axiosInstance.post("/menuitems", foodData); // Sửa endpoint
      return response.data;
    } catch (error) {
      console.error("Error creating food:", error);
      throw error;
    }
  },

  // Cập nhật món ăn
  async updateFood(menuitem_id, foodData) {
    if (!menuitem_id) {
      throw new Error("menuitem_id is required");
    }
    console.log("Updating food with ID:", menuitem_id); // Debug
    return axios.put(`${API_URL}/menuitems`, foodData);
  },

  // Xóa món ăn
  async deleteFood(menuitem_id) {
    if (!menuitem_id) {
      throw new Error("menuitem_id is required");
    }
    console.log("Deleting food with ID:", menuitem_id); // Debug
    return axios.delete(`${API_URL}/menuitems/${menuitem_id}`);
  },

  // Thêm phương thức cập nhật discount
  updateDiscount: async (menuItemId, discount) => {
    try {
      const response = await axios.post( // Đổi từ PUT sang POST
        `${API_URL}/foods/discount/${menuItemId}`,
        { discount: discount },
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating discount:', error);
      throw error;
    }
  }
};
