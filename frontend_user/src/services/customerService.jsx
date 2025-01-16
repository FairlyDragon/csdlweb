import axios from '../utils/axios';

const customerService = {
    // 1. Menu Services - Xem menu
    getMenus: async () => {
        try {
            const response = await axios.get('/customer/menus');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 2. Profile Services - Xem thông tin cá nhân
    getProfile: async (customerId) => {
        try {
            const response = await axios.get(`/customer/${customerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 3. Profile Services - Cập nhật thông tin cá nhân
    updateProfile: async (customerId, profileData) => {
        try {
            const response = await axios.put(`/customer/${customerId}`, profileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 4. Profile Services - Xóa tài khoản
    deleteAccount: async (customerId) => {
        try {
            const response = await axios.delete(`/customer/${customerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    // Order Services (thêm mới)
    getOrders: async () => {
        try {
            const response = await axios.get('/customer/orders');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrder: async (orderData) => {
        try {
            const response = await axios.post('/customer/orders', orderData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getOrderDetails: async (orderId) => {
        try {
            const response = await axios.get(`/customer/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Xử lý lỗi chung
    handleError: (error) => {
        if (error.response) {
            // Server trả về response với status code nằm ngoài range 2xx
            return error.response.data.message || 'There is an error.';
        } else if (error.request) {
            // Request được gửi nhưng không nhận được response
            return 'Can not connect to server.';
        } else {
            // Có lỗi khi thiết lập request
            return 'There is an error.';
        }
    }
};

export default customerService;