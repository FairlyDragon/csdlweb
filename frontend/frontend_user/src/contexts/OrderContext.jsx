import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (cartItems, total, voucher) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems.map(item => `${item.name} x${item.quantity}`).join(', '),
      total: total,
      date: new Date(),
      status: 'Processing',
      voucher: voucher
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Function to fetch orders from API
  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${userId}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Function to update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      const updatedOrder = await response.json();
      
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      fetchOrders,
      updateOrderStatus 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);