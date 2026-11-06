import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AppContext = createContext(null);

const getSavedUser = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    localStorage.removeItem("jwtToken");
    return null;
  }
};

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(getSavedUser);

  const addItem = (item) => {
    setCartItems((items) => {
      const existing = items.find((cartItem) => cartItem._id === item._id);
      return existing
        ? items.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...items, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (item) => {
    setCartItems((items) => {
      const existing = items.find((cartItem) => cartItem._id === item._id);
      if (!existing) return items;
      if (existing.quantity <= 1) {
        return items.filter((cartItem) => cartItem._id !== item._id);
      }
      return items.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const clearItem = (item) => {
    setCartItems((items) => items.filter((cartItem) => cartItem._id !== item._id));
  };

  const login = async (credentials) => {
    const response = await axios.post("/api/v1/user/login", credentials);
    localStorage.setItem("jwtToken", response.data.token);
    setCurrentUser(response.data.user || getSavedUser());
    return response.data;
  };

  const register = async (user) => {
    const response = await axios.post("/api/v1/user/register", user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setCurrentUser(null);
  };

  const value = {
    cartItems,
    cartItemsCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    cartTotal: cartItems.reduce(
      (total, item) => total + item.quantity * Number(item.price || 0),
      0
    ),
    addItem,
    removeItem,
    clearItem,
    currentUser,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
