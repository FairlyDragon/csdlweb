import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin/dashboard";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const dashboardService = {
  // Lấy dữ liệu cho header (tổng quan)
  async getHeader(start_date, end_date) {
    try {
      let url = "/header";
      if (start_date && end_date) {
        url += `?start_date=${start_date}&end_date=${end_date}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching header data:", error);
      throw error;
    }
  },

  // Lấy dữ liệu cho biểu đồ tròn
  async getPieChart() {
    try {
      const response = await axiosInstance.get("/center/piechart");
      return response.data;
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      throw error;
    }
  },

  // Lấy tổng số đơn hàng
  async getTotalOrders(periodicity) {
    try {
      const response = await axiosInstance.get(
        `/center/total_orders?periodicity=${periodicity}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching total orders:", error);
      throw error;
    }
  },

  // Lấy tổng doanh thu
  async getTotalRevenue(periodicity) {
    try {
      const response = await axiosInstance.get(
        `/center/total_revenue?periodicity=${periodicity}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching total revenue:", error);
      throw error;
    }
  },

  // Lấy dữ liệu bản đồ khách hàng
  async getCustomersMap(periodicity) {
    try {
      const response = await axiosInstance.get(
        `/center/customers_map?periodicity=${periodicity}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customers map:", error);
      throw error;
    }
  },

  // Lấy đánh giá của khách hàng
  async getCustomerReviews() {
    try {
      const response = await axiosInstance.get(
        "/footer?skip=0&limit=5");
      return response.data;
    } catch (error) {
      console.error("Error fetching customer reviews:", error);
      throw error;
    }
  },
};
