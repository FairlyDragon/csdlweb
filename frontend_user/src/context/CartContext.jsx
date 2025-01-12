import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  const updateQuantity = (id, quantity) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};