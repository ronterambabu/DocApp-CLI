import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Chrome as Home, Calendar, User, PieChart, MessageCircle } from 'lucide-react-native';
import Footer from './Footer';
import tw from 'twrnc';
import useLoadUser from '../../hooks/useLoadUser';
// Import your tab screens
import HomeScreen from './index';
import AppointmentsScreen from './appointments';
import DoctorsScreen from './doctors';

import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  useLoadUser();
  return (
    <SafeAreaProvider>
      <View style={tw`flex-1`}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: [
              tw`shadow-md border-t-0 absolute bottom-0 left-0 right-0 bg-transparent`,
              {
                height: Platform.OS === 'web' ? 60 : undefined,
                paddingBottom: Platform.OS === 'web' ? 0 : undefined,
              },
            ],
            tabBarActiveTintColor: '#1A73E8',
            tabBarInactiveTintColor: '#8F9BB3',
            tabBarLabelStyle: tw`text-[11px] font-medium mb-1`,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Appointments"
            component={AppointmentsScreen}
            options={{
              title: 'Appointments',
              tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Doctors"
            component={DoctorsScreen}
            options={{
              title: 'Find Doctors',
              tabBarIcon: ({ color, size }) => <PieChart size={size} color={color} />,
            }}
          />
          
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
            }}
          />
        </Tab.Navigator>
        <Footer />
      </View>
    </SafeAreaProvider>
  );
}