import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/vouchers";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const voucherService = {
  // Tạo voucher mới
  async createVoucher(voucherData) {
    try {
      const response = await axiosInstance.post("", voucherData);
        
      return response.data;
    }catch (error) {
      console.error("Error creating voucher:", error);
      throw error;
    }
  },

  // Lấy danh sách voucher còn hiệu lực
  async getAvailableVouchers() {
    try {
      const response = await axiosInstance.get("/available");
      return response.data;
    } catch (error) {
      console.error("Error fetching available vouchers:", error);
      throw error;
    }
  },

  // Lấy danh sách voucher hết hạn
  async getExpiredVouchers() {
    try {
      const response = await axiosInstance.get("/expired");
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail === "No vouchers found") {
        return []; // Trả về mảng rỗng nếu không có voucher hết hạn
      }
      console.error("Error fetching expired vouchers:", error);
      throw error;
    }
  },
};
