import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../utils/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState(true);

  useEffect(() => {
  const dismissed = localStorage.getItem("auth_modal_closed");
    if (!dismissed) {
        setShowAuthModal(true);
    }
    }, []);

  function login(formData) {
    const loggedInUser = loginUser(formData);
    setUser(loggedInUser);
    setShowAuthModal(false);
  }

  function register(formData) {
    const newUser = registerUser(formData);
    setUser(newUser);
    setShowAuthModal(false);
  }

  function logout() {
    logoutUser();
    setUser(null);
    localStorage.removeItem("auth_modal_dismissed");
    setShowAuthModal(true);
  }

  function openAuthModal() {
    setShowAuthModal(true);
  }

  function closeAuthModal() {
    localStorage.setItem("auth_modal_closed", "1");
    setShowAuthModal(false);
  }

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      register,
      logout,
      showAuthModal,
      openAuthModal,
      closeAuthModal,
    }),
    [user, showAuthModal]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}