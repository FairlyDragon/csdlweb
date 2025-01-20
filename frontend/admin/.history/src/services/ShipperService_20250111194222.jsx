import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";

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
  
  getShipperById: async (shipper_id) => {
    try {
      const response = await axios.get(`${API_URL}/shippers/${shipper_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipper:", error);
      throw error;
    }
  },

  // Create new shipper
  createShipper: async (shipperData) => {
    try {
      const response = await axios.post(`${API_URL}/shippers`, shipperData);
      return response.data;
    } catch (error) {
      console.error("Error creating shipper:", error);
      throw error;
    }
  },

  // Update shipper
  updateShipper: async (id, shipperData) => {
    try {
      const response = await axios.put(
        `${API_URL}/shippers/${id}`,
        shipperData
      );
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
