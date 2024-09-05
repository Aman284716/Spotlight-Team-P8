import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existingProduct = state.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return state.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART': {
      return state.filter((item) => item.product.id !== action.payload.id);
    }
    case 'DECREASE_QUANTITY': {
      const productId = action.payload.id;
      return state
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity doesn't go below 1
            : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    }
    case 'CLEAR_CART': {
      return []; // Clear the cart by returning an empty array
    }
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Function to calculate total cart count
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, dispatch, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
