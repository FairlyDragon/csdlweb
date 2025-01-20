const BASE_URL = 'http://127.0.0.1:8000/admin/deliveries';

class DeliveryService {
  // Lấy số lượng shipper đang hoạt động
  async getActiveShippers() {
    try {
      const response = await fetch(`${BASE_URL}/active_shippers`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch active shippers');
      }
      
      const data = await response.json();
      return data.number_of_active_shippers;
    } catch (error) {
      console.error('Error fetching active shippers:', error);
      throw error;
    }
  }

  // Lấy số lượng đơn hàng đang giao
  async getDeliveringOrders() {
    try {
      const response = await fetch(`${BASE_URL}/delivering_orders`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch delivering orders');
      }
      
      const data = await response.json();
      return data.number_of_delivering_orders;
    } catch (error) {
      console.error('Error fetching delivering orders:', error);
      throw error;
    }
  }

  // Lấy số lượng đơn hàng đang chờ
  async getWaitingOrders() {
    try {
      const response = await fetch(`${BASE_URL}/num_of_waiting_orders`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch waiting orders count');
      }
      
      const data = await response.json();
      return data.number_of_waiting_orders;
    } catch (error) {
      console.error('Error fetching waiting orders count:', error);
      throw error;
    }
  }

  // Lấy danh sách shipper đang chờ đơn
  async getCurrentlyWaitingShippers() {
    try {
      const response = await fetch(`${BASE_URL}/currently_waiting_shippers`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch waiting shippers');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching waiting shippers:', error);
      throw error;
    }
  }

  // Lấy danh sách đơn hàng đang chờ
  async getWaitingOrdersList() {
    try {
      const response = await fetch(`${BASE_URL}/waiting_orders`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch waiting orders list');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching waiting orders list:', error);
      throw error;
    }
  }
}

export default new DeliveryService();
