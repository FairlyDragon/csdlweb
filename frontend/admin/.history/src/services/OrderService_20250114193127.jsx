import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/admin";

const OrderService = {
  // API cho WaitingAccept
  getPendingOrdersPreviews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/pending/preview`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pending orders preview:", error);
      throw error;
    }
  },

  // API cho EditOrder
  getPendingOrderDetails: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/pending/details`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pending order details:", error);
      throw error;
    }
  },

  // API cho OrderList
  getPassedOrdersPreviews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/passed/preview`);
      return response.data;
    } catch (error) {
      console.error("Error fetching passed orders preview:", error);
      throw error;
    }
  },

  // API cho OrderDetails
  getPassedOrderDetails: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/passed/details`);
      return response.data;
    } catch (error) {
      console.error("Error fetching passed order details:", error);
      throw error;
    }
  },

  // Thêm các methods khác nếu cần
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axios.put(`${BASE_URL}/orders/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },
};

export default OrderService;
