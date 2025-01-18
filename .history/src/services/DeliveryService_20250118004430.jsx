import { axiosInstance } from "./authService";

const DeliveryService = {
  getActiveShippers: async () => {
    try {
      const response = await axiosInstance.get("/admin/deliveries/active_shippers");
      return response.data.number_of_active_shippers;
    } catch (error) {
      console.error("Error fetching active shippers:", error);
      throw error;
    }
  },
  // ... các method khác
};

export default DeliveryService;
