import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";
const AUTH_URL = "http://127.0.0.1:8000/auth";

const CustomerService = {
  // Get all customers
  getAllCustomers: async () => {
    try {
      const response = await axios.get(`${API_URL}/customers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching customer:", error);
      return null;
    }
  },

  // Get customer history
  getCustomerHistory: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/customers/history/${id}`);
      return {
        orders: response.data || [],
        stats: {
          total_order_quantity: response.data?.length || 0,
          total_purchase: response.data?.reduce((sum, order) => sum + order.payment_amount, 0) || 0
        }
      };
    } catch (error) {
      console.error("Error fetching customer history:", error);
      return {
        orders: [],
        stats: {
          total_order_quantity: 0,
          total_purchase: 0
        }
      };
    }
  },

  // Create new customer (using auth/signup endpoint)
  createCustomer: async (customerData) => {
    try {
      const signupData = {
        email: customerData.email,
        password: customerData.password,
        role: "customer",
      };
      const response = await axios.post(`${AUTH_URL}/signup`, signupData);
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (customerData) => {
    try {
      const response = await axios.put(`${API_URL}/customers`, customerData);
      return response.data;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  },

  // Delete customer
  deleteCustomer: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  },
};

export default CustomerService;
