import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser as apiLogin, getUserInfo } from '../apiService';
import { triggerSync } from '../syncService'; // Import the new sync function

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

  // This effect runs on app load and when the network status changes
  useEffect(() => {
    const validateTokenAndSync = async () => {
      if (token) {
        try {
          const userInfo = await getUserInfo();
          setUser(userInfo);
          await triggerSync(); // Attempt to sync after user is validated
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    validateTokenAndSync();

    // Add event listeners for online/offline status
    window.addEventListener('online', triggerSync);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('online', triggerSync);
    };
  }, []);

  const login = async (credentials) => {
    const jwtToken = await apiLogin(credentials);
    localStorage.setItem('jwtToken', jwtToken);
    setToken(jwtToken);

    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
      await triggerSync(); // Sync immediately after a successful login
    } catch (error) {
      console.error("Failed to fetch user info after login:", error);
      logout();
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