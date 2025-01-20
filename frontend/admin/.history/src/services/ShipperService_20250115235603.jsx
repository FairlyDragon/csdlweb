import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";
const AUTH_URL = "http://127.0.0.1:8000/auth";

const ShipperService = {
  // Get all shippers
  getAllShippers: async () => {
    try {
      const response = await axios.get(`${API_URL}/shippers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shippers:", error);
      throw error;
    }
  },

  // Get shipper by ID
  getShipperById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/shippers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipper:", error);
      return null;
    }
  },

  // Get shipper history
  getShipperHistory: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/shippers/history/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipper history:", error);
      return {
        orders: [],
        stats: {
          total_order_quantity: 0,
          total_purchase: 0,
        },
      };
    }
  },

  // Create new shipper
  createShipper: async (shipperData) => {
    try {
      const signupData = {
        email: shipperData.email,
        password: shipperData.password,
        role: "shipper",
        avatar_url: shipperData.avatar_url,
        name: shipperData.name,
      };
      const response = await axios.post(`${AUTH_URL}/signup`, signupData);
      return response.data;
    } catch (error) {
      console.error("Error creating shipper:", error);
      throw error;
    }
  },

  // Update shipper
  updateShipper: async (shipperData) => {
    try {
      const response = await axios.put(`${API_URL}/shippers`, shipperData);
      return response.data;
    } catch (error) {
      console.error("Error updating shipper:", error);
      throw error;
    }
  },

  // Delete shipper
  deleteShipper: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/shippers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting shipper:", error);
      throw error;
    }
  },
};

export default ShipperService;
