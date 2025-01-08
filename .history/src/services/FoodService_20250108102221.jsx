import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/foods/menuitems"; // Thay đổi URL này thành API thực tế của bạn

// Cấu hình axios
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const foodService = {
  // Lấy danh sách món ăn
  getFoods() {
    return axios.get(API_URL).catch((error) => {
      console.error("Error fetching foods:", error);
      throw error;
    });
  },

  // Thêm món ăn mới
  createFood(foodData) {
    return axios.post(API_URL, foodData).catch((error) => {
      console.error("Error creating food:", error);
      throw error;
    });
  },

  // Cập nhật món ăn
  updateFood(id, foodData) {
    return axios.put(`${API_URL}/${id}`, foodData).catch((error) => {
      console.error("Error updating food:", error);
      throw error;
    });
  },

  // Xóa món ăn
  deleteFood(id) {
    return axios.delete(`${API_URL}/${id}`).catch((error) => {
      console.error("Error deleting food:", error);
      throw error;
    });
  },
};
