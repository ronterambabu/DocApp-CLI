import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'general_user' | 'doctor'>('general_user');

  const { setIsLoggedIn } = useUser();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await fetch('https://landing.docapp.co.in/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok || data?.message !== 'Login Success') {
        throw new Error(data?.message || 'Login failed');
      }

      setIsLoggedIn(true);

      // Navigate based on role
      navigation.reset({
        index: 0,
        routes: [
          { name: role === 'doctor' ? 'DoctorNavigator' : 'TabsLayout' },
        ],
      });
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    }
  };

//   const handleLogin = async () => {
//   try {
//     // Simulate a network delay (optional)
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     // Mock successful login without API call
//     setIsLoggedIn(true);

//     // Navigate based on role
//     navigation.reset({
//       index: 0,
//       routes: [
//         { name: role === 'doctor' ? 'DoctorNavigator' : 'TabsLayout' },
//       ],
//     });
//   } catch (err: any) {
//     Alert.alert('Login Failed', err.message || 'Something went wrong');
//   }
// };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DocApp</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Select Role</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'general_user' && styles.selectedRole,
          ]}
          onPress={() => setRole('general_user')}
        >
          <Text
            style={[
              styles.roleText,
              role === 'general_user' && styles.selectedRoleText,
            ]}
          >
            General User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'doctor' && styles.selectedRole,
          ]}
          onPress={() => setRole('doctor')}
        >
          <Text
            style={[
              styles.roleText,
              role === 'doctor' && styles.selectedRoleText,
            ]}
          >
            Doctor
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f4ea',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#2e7d32',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderColor: '#81c784',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#81c784',
    borderRadius: 8,
  },
  selectedRole: {
    backgroundColor: '#388e3c',
    borderColor: '#388e3c',
  },
  roleText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  selectedRoleText: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#388e3c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
