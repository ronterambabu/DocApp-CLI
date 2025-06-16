import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

import { UserProvider } from '../screens/contexts/UserContext';
// Import your screens here
// import TabsScreen from './TabsScreen';
// import NotFoundScreen from './NotFoundScreen';
// import DoctorAvailability from './DoctorAvailability';
// import ConsultOptionsScreen from './ConsultOptionsScreen';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default function RootLayout() {
  // Remove useFrameworkReady if not needed outside Expo

  return (
    <UserProvider>
      <SafeAreaProvider>
        <View style={styles.gradient}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* Replace these with your actual components */}
              {/* <Stack.Screen name="Tabs" component={TabsScreen} /> */}
              {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
              {/* <Stack.Screen name="DoctorAvailability" component={DoctorAvailability} /> */}
              {/* <Stack.Screen name="ConsultOptionsScreen" component={ConsultOptionsScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </UserProvider>
  );
}