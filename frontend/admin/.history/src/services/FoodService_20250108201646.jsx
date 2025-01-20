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

  // Thêm món ăn mới - Format dữ liệu theo yêu cầu
  async createFood(foodData) {
    try {
      const formattedData = {
        name: foodData.name,
        category: foodData.category,
        description: foodData.description,
        price: parseFloat(foodData.price),
        image_url: foodData.image_url,
        is_active: Boolean(foodData.is_active),
      };

      const response = await axiosInstance.post("/menuitems", formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating food:", error);
      throw error;
    }
  },

  // Cập nhật món ăn - Format dữ liệu theo yêu cầu
  async updateFood(uuid, foodData) {
    try {
      const formattedData = {
        name: foodData.name,
        category: foodData.category,
        description: foodData.description,
        price: parseFloat(foodData.price),
        image_url: foodData.image_url,
        is_active: Boolean(foodData.is_active),
      };

      const response = await axiosInstance.put(
        `/menuitems/${uuid}`,
        formattedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating food:", error);
      throw error;
    }
  },

  // Xóa món ăn
  async deleteFood(uuid) {
    try {
      const response = await axiosInstance.delete(`/menuitems/${uuid}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting food:", error);
      throw error;
    }
  },
};
