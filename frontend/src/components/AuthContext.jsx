'use client';

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get('http://localhost:8000/auth/status', {
        withCredentials: true,
      });

      setAuth({
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
      });
    } catch (err) {
      console.error('Auth check failed:', err.response?.data || err.message);
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
