import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/foods/menuitems"; // Thay đổi URL này thành API thực tế của bạn

export const foodService = {
  // Lấy danh sách món ăn
  async getFoods() {
      const response = await axios.get(API_URL);
      return response.data;
  },

  // Thêm món ăn mới
  async createFood(foodData) {
      const response = await axios.post(API_URL, foodData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
  },

  // Cập nhật món ăn
  async updateFood(id, foodData) {
      const response = await axios.put(`${API_URL}/${id}`, foodData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
  },

  // Xóa món ăn
  async deleteFood(id) {
    await axios.delete(`${API_URL}/${id}`);
  },
};
