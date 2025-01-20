import axios from "axios";

const SHIPPER_URL = "http://127.0.0.1:8000/shipper";

const ShipperService = {
    // Profile Services
    getProfile: async (shipperId) => {
        try {
            const response = await axios.get(`${SHIPPER_URL}/${shipperId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shipper profile:", error);
            throw error;
        }
    },

    updateProfile: async (shipperData) => {
        try {
            const response = await axios.put(`${SHIPPER_URL}/${shipperData.id}`, shipperData);
            return response.data;
        } catch (error) {
            console.error("Error updating shipper profile:", error);
            throw error;
        }
    },

    deleteProfile: async (shipperId) => {
        try {
            const response = await axios.delete(`${SHIPPER_URL}/${shipperId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting shipper profile:", error);
            throw error;
        }
    },

    // Password Service
    changePassword: async (shipperId, oldPassword, newPassword) => {
        try {
            const response = await axios.put(`${SHIPPER_URL}/change-password/${shipperId}`, {
                old_password: oldPassword,
                new_password: newPassword
            });
            return response.data;
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    },

    // History Services
    getHistory: async (shipperId) => {
        try {
            const response = await axios.get(`${SHIPPER_URL}/history/${shipperId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shipper history:", error);
            throw error;
        }
    },

    // Delivery Services
    getAssignedDeliveries: async (shipperId) => {
        try {
            const response = await axios.get(`${SHIPPER_URL}/deliveries/for-me/${shipperId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching assigned deliveries:", error);
            throw error;
        }
    }
};

export default shipperService;