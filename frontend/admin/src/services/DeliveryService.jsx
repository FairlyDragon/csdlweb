import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/admin/deliveries";

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

class DeliveryService {
  // Lấy số lượng shipper đang hoạt động
  async getActiveShippers() {
    try {
      const response = await axiosInstance.get("/active_shippers");
      return response.data.number_of_active_shippers;
    } catch (error) {
      console.error("Error fetching active shippers:", error);
      throw error;
    }
  }

  // Lấy số lượng đơn hàng đang giao
  async getDeliveringOrders() {
    try {
      const response = await axiosInstance.get("/delivering_orders");
      return response.data.number_of_delivering_orders;
    } catch (error) {
      console.error("Error fetching delivering orders:", error);
      throw error;
    }
  }

  // Lấy số lượng đơn hàng đang chờ
  async getWaitingOrders() {
    try {
      const response = await axiosInstance.get("/num_of_waiting_orders");
      return response.data.number_of_waiting_orders;
    } catch (error) {
      console.error("Error fetching waiting orders count:", error);
      throw error;
    }
  }

  // Lấy danh sách shipper đang chờ đơn
  async getCurrentlyWaitingShippers() {
    try {
      const response = await axiosInstance.get("/currently_waiting_shippers");
      return response.data;
    } catch (error) {
      console.error("Error fetching waiting shippers:", error);
      throw error;
    }
  }

  // Lấy danh sách đơn hàng đang chờ
  async getWaitingOrdersList() {
    try {
      const response = await axiosInstance.get("/waiting_orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching waiting orders list:", error);
      throw error;
    }
  }
}

export default new DeliveryService();
