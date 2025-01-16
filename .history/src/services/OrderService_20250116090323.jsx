import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/admin";

const OrderService = {
  // API cho WaitingAccept - Lấy danh sách đơn hàng đang chờ xử lý
  getPendingOrdersPreviews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/pending/preview`);
      return response.data.map((order) => ({
        order_id: order.order_id,
        
          name: order.name,
          phone_number: order.phone_number,
          address: "order.address",
        },
        order_date: order.order_date,
        num_of_items: order.num_of_items,
        status: order.status,
      }));
    } catch (error) {
      console.error("Error fetching pending orders preview:", error);
      throw error;
    }
  },

  // API cho EditOrder - Lấy chi tiết đơn hàng đang chờ xử lý
  getPendingOrderDetails: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/pending/details`);
      return response.data.map((order) => ({
        order_id: order.order_id,
        customer: {
          name: order.name,
          email: order.email,
          phone_number: order.phone_number,
          address: order.address,
        },
        payment: {
          method: order.payment_method,
          status: order.payment_status,
        },
        order_date: order.order_date,
        order_items: order.order_items,
        total_amount: order.total_amount,
        num_of_items: order.num_of_items,
        note: order.note,
        status: order.status,
        voucher_code: order.voucher_code,
        discount_applied: order.discount_applied,
        delivery_fee: order.delivery_fee,
      }));
    } catch (error) {
      console.error("Error fetching pending order details:", error);
      throw error;
    }
  },

  // API cho OrderList - Lấy danh sách đơn hàng đã xử lý
  getPassedOrdersPreviews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/passed/preview`);
      return response.data.map((order) => ({
        order_id: order.order_id,
        customer: {
          name: order.name,
          phone_number: order.phone_number,
          email: "N/A",
          address: "N/A"
        },
        order_date: order.order_date,
        order_details: [{ quantity: order.num_of_items }],
        num_of_items: order.num_of_items,
        status: order.status
      }));
    } catch (error) {
      console.error("Error fetching passed orders preview:", error);
      throw error;
    }
  },

  // API cho OrderDetails - Lấy chi tiết đơn hàng đã xử lý
  getPassedOrderDetails: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/passed/details`);
      return response.data.map((order) => ({
        order_id: order.order_id,
        user_id: order.user_id,
        customer: {
          name: order.name,
          email: order.email,
          phone_number: order.phone_number,
          address: order.address,
        },
        payment: {
          method: order.payment_method,
          status: order.payment_status,
        },
        order_date: order.order_date,
        order_items: order.order_items,
        total_amount: order.total_amount,
        num_of_items: order.num_of_items,
        note: order.note,
        status: order.status,
        voucher_code: order.voucher_code,
        discount_applied: order.discount_applied,
        delivery_fee: order.delivery_fee,
      }));
    } catch (error) {
      console.error("Error fetching passed order details:", error);
      throw error;
    }
  },

  // API cập nhật trạng thái đơn hàng
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
