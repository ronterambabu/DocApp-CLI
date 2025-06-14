import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Add your auth screens here, e.g.: */}
      {/* <Stack.Screen name="login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="signup" component={SignupScreen} /> */}
      {/* <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} /> */}
      {/* Placeholder screen to avoid error: */}
      <Stack.Screen name="Placeholder" component={() => null} />
    </Stack.Navigator>
  );
}