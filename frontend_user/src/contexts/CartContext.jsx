import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === food.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId) => {
    setCartItems(prev => prev.filter(item => item.id !== foodId));
  };

  const updateQuantity = (foodId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(foodId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === foodId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);