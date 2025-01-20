import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/foods/menuitems"; // Thay đổi URL này thành API thực tế của bạn

export const foodService = {
  // Lấy danh sách món ăn
  getFoods() {
    return axios.get(API_URL);
  },

  // Thêm món ăn mới
  createFood(foodData) {
    return axios.post(API_URL, foodData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },

  // Cập nhật món ăn
  updateFood(id, foodData) {
    return axios.put(`${API_URL}/${id}`, foodData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },

  // Xóa món ăn
  deleteFood(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
