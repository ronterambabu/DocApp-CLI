// src/contexts/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import { Alert } from 'react-native';

interface User {
  id: number;
  email: string;
  role: string;
  username?: string;
  phone_number?: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  checkingLogin: boolean;
  user: User | null;
  setIsLoggedIn: (val: boolean) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        credentials: 'include', // send cookie
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const result = await response.json();
      setUser(result?.userData || null);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setCheckingLogin(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await CookieManager.clearAll(true); // clears all cookies
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, checkingLogin, user, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
