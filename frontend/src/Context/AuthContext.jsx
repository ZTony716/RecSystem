import React, { createContext, useContext, useMemo, useState } from "react";
import { getCurrentUser, saveAuth, clearAuth } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());

  function loginAuth(userData, token) {
    saveAuth(userData, token);
    setUser(userData);
  }

  function logoutAuth() {
    clearAuth();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      loginAuth,
      logoutAuth,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}