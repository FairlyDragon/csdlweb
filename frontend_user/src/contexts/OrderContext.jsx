import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Kết nối WebSocket
    const ws = new WebSocket('ws://your-backend-url/ws');
    
    ws.onmessage = (event) => {
      const updatedOrder = JSON.parse(event.data);
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    };

    return () => ws.close();
  }, []);

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

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);