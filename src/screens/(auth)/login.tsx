import tw from 'twrnc';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { useUser } from '../contexts/UserContext';
import apiConfig from '../../../apiConfig';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your stack param list for navigation typing
export type RootStackParamList = {
  Tabs: undefined;
  Signup: undefined;
  'DoctorLogin': undefined;
  '(tabs)': undefined;
  login: undefined;
};

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiConfig.API_ENDPOINTS.loginUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, role: 'general_user' }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Login failed: ' + errorText);
      }

      const cookie = response.headers.get('set-cookie');
      if (!cookie) throw new Error('No cookie received from server');

      const tokenMatch = cookie.match(/token=([^;]+)/);
      const token = tokenMatch?.[1];
      if (!token) throw new Error('Token not found in cookie');

      const decoded: any = jwtDecode(token);

      // Store token in AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      // Save user to context
      const user = {
        id: decoded.id,
        email: decoded.email,
        name: '',
        profileImage: '',
        token,
      };
      setUser(user);

      console.log('✅ Login successful');
      console.log('Decoded Token:', decoded);
      console.log('Stored Token:', token);
      console.log('User Context:', user);

      navigation.navigate('(tabs)');
    } catch (error: any) {
      console.error('Login Error:', error.message);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <View style={tw`mt-20 mb-10`}>
        <Text style={tw`text-3xl font-bold text-blue-600 mb-2`}>Welcome Back</Text>
        <Text style={tw`text-base text-gray-500`}>Login to your account</Text>
      </View>

      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center border border-gray-200 rounded-xl mb-4 px-3 h-14 bg-gray-100`}>
          <Mail size={20} color="#8F9BB3" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1 h-14 text-base text-gray-800 font-normal`}
            placeholder="Email"
            placeholderTextColor="#8F9BB3"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Email input"
          />
        </View>

        <View style={tw`flex-row items-center border border-gray-200 rounded-xl mb-4 px-3 h-14 bg-gray-100`}>
          <Lock size={20} color="#8F9BB3" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1 h-14 text-base text-gray-800 font-normal`}
            placeholder="Password"
            placeholderTextColor="#8F9BB3"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Password input"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={tw`p-2`}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} color="#8F9BB3" /> : <Eye size={20} color="#8F9BB3" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={tw`self-end mb-6`} accessibilityLabel="Forgot password">
          <Text style={tw`text-sm text-blue-600 font-medium`}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`${loading ? 'bg-blue-400' : 'bg-blue-600'} rounded-xl h-14 justify-center items-center`}
          onPress={handleLogin}
          disabled={loading}
          accessibilityLabel="Login button"
        >
          <Text style={tw`text-white text-base font-semibold`}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center my-6`}>
        <View style={tw`flex-1 h-px bg-gray-200`} />
        <Text style={tw`text-sm text-gray-500 mx-3 font-medium`}>OR</Text>
        <View style={tw`flex-1 h-px bg-gray-200`} />
      </View>

      <View style={tw`flex-row justify-center mb-6`}>
        <TouchableOpacity
          style={tw`w-14 h-14 rounded-full bg-gray-100 justify-center items-center mx-3 border border-gray-200`}
          accessibilityLabel="Google login"
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-14 h-14 rounded-full bg-gray-100 justify-center items-center mx-3 border border-gray-200`}
          accessibilityLabel="Facebook login"
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' }}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row justify-center mt-4 mb-6`}>
        <Text style={tw`text-sm text-gray-500`}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          accessibilityLabel="Sign up"
        >
          <Text style={tw`text-sm text-blue-600 font-semibold`}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw`bg-white border border-gray-300 rounded-xl h-10 w-32 justify-center items-center mt-4 mx-auto`}
        onPress={() => navigation.navigate('DoctorLogin')}
        accessibilityLabel="Doctor login button"
      >
        <Text style={tw`text-blue-600 text-sm font-semibold`}>Doctor Login</Text>
      </TouchableOpacity>


    </View>
  );
}