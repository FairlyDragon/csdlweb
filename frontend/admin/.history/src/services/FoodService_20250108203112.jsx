import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/foods";

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
      const response = await axiosInstance.get("/menuitems");
      return response.data;
    } catch (error) {
      console.error("Error fetching foods:", error);
      throw error;
    }
  },

  // Thêm món ăn mới
  async createFood(foodData) {
    try {
      const response = await axiosInstance.post("/menuitems", foodData);
      return response.data;
    } catch (error) {
      console.error("Error creating food:", error);
      throw error;
    }
  },

  // Cập nhật món ăn - Sửa lại URL endpoint
  async updateFood(menuitem_id, foodData) {
    if (!menuitem_id) {
      throw new Error("menuitem_id is required");
    }
    try {
      // Loại bỏ dấu / cuối và đảm bảo có menuitem_id
      const url = `/menuitems/${menuitem_id}`;
      console.log("PUT URL:", url); // Log để debug
      const response = await axiosInstance.put(url, foodData);
      return response.data;
    } catch (error) {
      console.error("Error updating food:", error);
      throw error;
    }
  },

  // Xóa món ăn - Sửa lại URL endpoint
  async deleteFood(menuitem_id) {
    if (!menuitem_id) {
      throw new Error("menuitem_id is required");
    }
    try {
      // Loại bỏ dấu / cuối và đảm bảo có menuitem_id
      const url = `/menuitems/${menuitem_id}`;
      console.log("DELETE URL:", url); // Log để debug
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      console.error("Error deleting food:", error);
      throw error;
    }
  },
};
