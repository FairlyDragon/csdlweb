import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/foods/menuitems"; // Thay đổi URL này thành API thực tế của bạn

export const fetchFoods = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Giả sử dữ liệu trả về là một mảng
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
