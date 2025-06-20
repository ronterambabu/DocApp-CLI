import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorDashboard from './Dashboard';
import DoctorProfile from './DoctorProfile';
import DoctorSettings from '../Doctor/screens/DoctorSettings';
import DoctorNotifications from './DoctorNotifications';
import { DoctorStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<DoctorStackParamList>();

export const DoctorNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="DoctorSettings" component={DoctorSettings} />
      <Stack.Screen name="DoctorNotifications" component={DoctorNotifications} />
      {/* Add other doctor screens here */}
    </Stack.Navigator>
  );
};
