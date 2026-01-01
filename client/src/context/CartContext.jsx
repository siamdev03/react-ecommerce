import React, { createContext, useReducer, useContext } from "react";

// Initial State
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exist = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      let updatedCart;
      if (exist) {
        updatedCart = state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, action.payload];
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(filteredCart));
      return { ...state, cartItems: filteredCart };

    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, quantity = 1) =>
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook for easy access
export const useCart = () => useContext(CartContext);
