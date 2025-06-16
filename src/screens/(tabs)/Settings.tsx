import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Bell,
  Moon,
  Key,
  Languages,
  Info,
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout',
        style: 'destructive',
        onPress: () => console.log('User logged out')
      },
    ]);
  };

  return (
    <PageLayout
      title="Settings"
      headerBackgroundColor="#2E3192"
      scrollable={true}
    >
      {/* Intro Section */}
      <View style={tw`flex-row items-center my-4 bg-white p-3.5 rounded-3xl shadow-sm mx-4`}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/65.jpg' }}
          style={tw`w-15 h-15 rounded-full mr-3.5`}
        />
        <View>
          <Text style={tw`text-lg font-bold text-blue-500`}>Dr. John Doe</Text>
          <Text style={tw`text-sm text-gray-600 mt-1`}>Cardiologist</Text>
        </View>
      </View>

      {/* Toggle Settings */}
      <View style={tw`mb-7.5 mx-4`}>
        <View style={tw`bg-white flex-row items-center justify-between p-3.5 rounded-xl mb-2.5 shadow-sm`}>
          <Bell size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={tw`bg-white flex-row items-center justify-between p-3.5 rounded-xl mb-2.5 shadow-sm`}>
          <Moon size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
      </View>

      {/* Navigation Links */}
      <View style={tw`mb-7.5 mx-4`}>
        <TouchableOpacity 
          style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}
          accessibilityRole="button"
          accessibilityLabel="Change Password"
        >
          <Key size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Change Password</Text>
          <ChevronRight size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}
          accessibilityRole="button"
          accessibilityLabel="Language settings"
        >
          <Languages size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Language</Text>
          <ChevronRight size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}
          accessibilityRole="button"
          accessibilityLabel="About App"
        >
          <Info size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>About App</Text>
          <ChevronRight size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity 
        style={tw`bg-red-600 flex-row items-center justify-center p-3.5 rounded-xl mx-4 mt-2.5 min-h-12`} 
        onPress={handleLogout}
        accessibilityRole="button"
        accessibilityLabel="Logout"
      >
        <LogOut size={20} color="#fff" />
        <Text style={tw`text-white text-base ml-2`}>Logout</Text>
      </TouchableOpacity>
    </PageLayout>
  );
};

export default SettingsScreen;