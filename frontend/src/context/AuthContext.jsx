import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser as apiLogin, getUserInfo } from '../apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
  };

  // This effect runs on initial app load to validate an existing token
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const userInfo = await getUserInfo();
          setUser(userInfo);
        } catch (error) {
          console.error("Token validation failed:", error);
          logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };
    validateToken();
  }, []); // Run only once on mount

  const login = async (credentials) => {
    const jwtToken = await apiLogin(credentials);
    localStorage.setItem('jwtToken', jwtToken);
    setToken(jwtToken); // Set token to re-trigger effects if needed, though not strictly necessary here

    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch (error) {
      console.error("Failed to fetch user info after login:", error);
      logout(); // Clean up on failure
      throw error;
    }
  };

  const value = { token, user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};