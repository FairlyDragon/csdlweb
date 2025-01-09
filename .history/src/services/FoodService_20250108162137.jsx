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
      const response = await axiosInstance.get("/fo/menuitem"); // Sửa endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching foods:", error);
      throw error;
    }
  },

  // Thêm món ăn mới
  async createFood(foodData) {
    try {
      const response = await axiosInstance.post("/food-del/menuitem", foodData); // Sửa endpoint
      return response.data;
    } catch (error) {
      console.error("Error creating food:", error);
      throw error;
    }
  },

  // Cập nhật món ăn
  async updateFood(id, foodData) {
    try {
      const response = await axiosInstance.put(
        `/food-del/menuitem/${id}`, // Sửa endpoint
        foodData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating food:", error);
      throw error;
    }
  },

  // Xóa món ăn
  async deleteFood(id) {
    try {
      const response = await axiosInstance.delete(`/food-del/menuitem/${id}`); // Sửa endpoint
      return response.data;
    } catch (error) {
      console.error("Error deleting food:", error);
      throw error;
    }
  },
};
