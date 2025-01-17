import axios from "axios";

const CUSTOMER_URL = "http://127.0.0.1:8000/customer";

const customerService = {
    // Menu Services
    getMenus: async () => {
        try {
            const response = await axios.get(`${CUSTOMER_URL}/menus`);
            return response.data;
        } catch (error) {
            console.error("Error fetching menus:", error);
            throw error;
        }
    },

    // Profile Services
    getProfile: async (customerId) => {
        try {
            const response = await axios.get(`${CUSTOMER_URL}/${customerId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw error;
        }
    },

    updateProfile: async (customerData) => {
        try {
            const response = await axios.put(`${CUSTOMER_URL}/${customerData.id}`, customerData);
            return response.data;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    },

    deleteProfile: async (customerId) => {
        try {
            const response = await axios.delete(`${CUSTOMER_URL}/${customerId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting profile:", error);
            throw error;
        }
    },

    // Order Services
    createOrder: async (customerId, orderData) => {
        try {
            
            const response = await axios.post(`${CUSTOMER_URL}/orders/${customerId}`, {
                items: orderData.items,
                delivery_address: orderData.deliveryAddress,
                total_amount: orderData.totalAmount
              });
              return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },

    getOrderHistory: async (customerId) => {
        try {
            const response = await axios.get(`${CUSTOMER_URL}/orders/history/${customerId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching order history:", error);
            throw error;
        }
    },

    // Delivery Fee Service
    getDeliveryFee: async (customerId) => {
        try {
            const response = await axios.get(`${CUSTOMER_URL}/delivery_fee/${customerId}`);
            return response.data;
        } catch (error) {
            console.error("Error calculating delivery fee:", error);
            throw error;
        }
    },

    // Password Service
    changePassword: async (customerId, oldPassword, newPassword) => {
        try {
            const response = await axios.put(`${CUSTOMER_URL}/change-password/${customerId}`, {
                old_password: oldPassword,
                new_password: newPassword
            });
            return response.data;
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    }
};

export default customerService;
