import axios from "axios";

const API_URL = "http://your-api-url/api/foods"; // Thay đổi URL theo API của bạn

export const foodService = {
  // Lấy danh sách món ăn có phân trang và filter
  async getFoods(page, filters = {}) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page,
          limit: 6, // ITEMS_PER_PAGE
          category: filters.category,
          stockStatus: filters.stockFilter,
          sortPrice: filters.sortPrice,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Thêm món ăn mới
  async createFood(foodData) {
    try {
      const response = await axios.post(API_URL, foodData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật món ăn
  async updateFood(id, foodData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, foodData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa món ăn
  async deleteFood(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
