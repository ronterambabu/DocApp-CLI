import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../screens/contexts/UserContext';

type DecodedToken = {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
  exp?: number;
  iat?: number;
};

export default function useLoadUser() {
  const { setUser } = useUser();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) return;

        const decoded = jwtDecode<DecodedToken>(token);

        if (!decoded || !decoded.id || !decoded.email) {
          console.warn('Invalid token format');
          return;
        }

        setUser({
          id: decoded.id,
          email: decoded.email,
          name: decoded.name ?? '',
          profileImage: decoded.profileImage ?? '',
          token,
        });
      } catch (error) {
        console.error('Error loading user from token:', error);
      }
    };

    loadUser();
  }, []);
}
