// import { axiosInstance } from "./authService";
import axios 

const ReportService = {
  // Lấy báo cáo khách hàng
  getCustomerReport: async (startDate, endDate) => {
    try {
      console.log("Fetching customer report with dates:", {
        startDate,
        endDate,
      });
      const response = await axiosInstance.get(
        `/admin/report/customer?start_date=${startDate}&end_date=${endDate}`
      );
      console.log("Customer report response:", response.data);

      // Tách dữ liệu thành danh sách khách hàng và tổng số liệu
      const customers = response.data.slice(0, -1);
      const totals = response.data[response.data.length - 1];

      return {
        customers: customers.map((customer) => ({
          name: customer.customer_name,
          email: customer.email,
          phone: customer.phone_number,
          address: customer.address,
          created_at: customer.created_at,
          totalOrder: customer.total_order,
          totalPurchase: customer.total_purchase,
        })),
        totals: {
          totalOrderQuantity: totals.total_order_quantity,
          totalPurchaseAmount: totals.total_purchase_from_customers,
        },
      };
    } catch (error) {
      console.error("Customer report error:", error.response || error);
      throw error;
    }
  },

  // Lấy báo cáo shipper
  getShipperReport: async (startDate, endDate) => {
    try {
      const response = await axiosInstance.get(
        `/admin/report/shipper?start_date=${startDate}&end_date=${endDate}`
      );

      // Tách dữ liệu thành danh sách shipper và tổng số liệu
      const shippers = response.data.slice(0, -1);
      const totals = response.data[response.data.length - 1];

      return {
        shippers: shippers.map((shipper) => ({
          name: shipper.shipper_name,
          email: shipper.email,
          phone: shipper.phone_number,
          address: shipper.address,
          created_at: shipper.created_at,
          totalDelivery: shipper.total_delivery,
          totalIncome: shipper.total_income,
        })),
        totals: {
          totalDeliveryQuantity: totals.total_delivery_quantity,
          totalIncomeAmount: totals.total_income_from_shippers,
        },
      };
    } catch (error) {
      console.error("Error fetching shipper report:", error);
      throw error;
    }
  },

  // Lấy báo cáo nhà hàng
  getRestaurantReport: async (startDate, endDate) => {
    try {
      const response = await axiosInstance.get(
        `/admin/report/restaurant?start_date=${startDate}&end_date=${endDate}`
      );

      return {
        totalFoodQuantity: response.data.total_food_quantity,
        totalRevenue: response.data.total_revenue,
      };
    } catch (error) {
      console.error("Error fetching restaurant report:", error);
      throw error;
    }
  },
};

export default ReportService;
