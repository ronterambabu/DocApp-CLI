import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Settings, User, Folder, CreditCard, Bell, Shield, LogOut, ChevronRight, ArrowLeft, CalendarCheck, HelpCircle
} from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';  // <-- import
import tw from 'twrnc';

type RootStackParamList = {
  Settings: undefined;
  EditProfilepage: undefined;
  CompleteProfile: undefined;
  Appointments: undefined;
  PersonalDetails: undefined;
  MedicalRecords: undefined;
  PaymentMethods: undefined;
  Notification: undefined;
  PrivacySecurity: undefined;
  TestBooking: undefined;
  HelpCenter: undefined;
  'Login': undefined;
};

type User = {
  name?: string;
  email?: string;
  profile_picture?: string;
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const loadUserFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded);
      }
    } catch (err) {
      console.error('Error decoding JWT:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  return (
    <View style={[tw`flex-1 bg-gray-100`, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#202b6d" barStyle="light-content" />
      <View style={tw`bg-[#202b6d] h-20 flex-row items-center justify-between px-4 pb-2`}>
        <TouchableOpacity style={tw`w-12 h-12 rounded-full bg-white justify-center items-center shadow-sm`} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#222B45" />
        </TouchableOpacity>
        <Text style={tw`font-bold text-xl text-white`}>Profile</Text>
        <TouchableOpacity style={tw`w-12 h-12 rounded-full bg-white justify-center items-center shadow-sm`} onPress={() => navigation.navigate('Settings')}>
          <Settings size={24} color="#222B45" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`items-center mt-6 mb-8`}>
          {loading ? (
            <ActivityIndicator size="large" color="#202b6d" />
          ) : (
            <>
              <Image
                source={{ uri: user?.profile_picture || 'https://placehold.co/200x200?text=Avatar' }}
                style={tw`w-28 h-28 rounded-full mb-4 shadow-md`}
              />
              <Text style={tw`font-semibold text-xl text-gray-800 mb-1`}>{user?.name || 'Unknown User'}</Text>
              <Text style={tw`font-normal text-sm text-gray-500 mb-4`}>{user?.email || 'No Email'}</Text>
              <View style={tw`flex-row justify-center gap-4`}>
                <TouchableOpacity
                  style={tw`bg-blue-100 px-5 py-2 rounded-full`}
                  onPress={() => navigation.navigate('EditProfilepage')}
                >
                  <Text style={tw`font-medium text-sm text-blue-600`}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-[#202b6d] px-5 py-2 rounded-full`}
                  onPress={() => navigation.navigate('CompleteProfile')}
                >
                  <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
          
        <View style={tw`px-4 mb-8`}>
       
<TouchableOpacity
  style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
  onPress={() => navigation.navigate('Appointments')}  // Update this route to your actual appointments screen if needed
  activeOpacity={0.7}
  accessible
  accessibilityLabel="Appointments"
>
  <View style={tw`w-10 h-10 rounded-full bg-indigo-100 justify-center items-center mr-4`}>
    <CalendarCheck size={20} color="#4C51BF" />
  </View>
  <View style={tw`flex-1 flex-row justify-between items-center`}>
    <Text style={tw`font-medium text-base text-gray-800`}>Appointments</Text>
    <ChevronRight size={20} color="#8F9BB3" />
  </View>
</TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('PersonalDetails')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Personal Details"
          >
            <View style={tw`w-10 h-10 rounded-full bg-blue-100 justify-center items-center mr-4`}>
              <User size={20} color="#1A73E8" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>Personal Details</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('MedicalRecords')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="My Medical Records"
          >
            <View style={tw`w-10 h-10 rounded-full bg-red-100 justify-center items-center mr-4`}>
              <Folder size={20} color="#FF647C" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>My Medical Records</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('PaymentMethods')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Payment Methods"
          >
            <View style={tw`w-10 h-10 rounded-full bg-green-100 justify-center items-center mr-4`}>
              <CreditCard size={20} color="#00C48C" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>Payment Methods</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Notifications"
          >
            <View style={tw`w-10 h-10 rounded-full bg-orange-100 justify-center items-center mr-4`}>
              <Bell size={20} color="#FF9F43" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>Notifications</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('PrivacySecurity')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Privacy & Security"
          >
            <View style={tw`w-10 h-10 rounded-full bg-purple-100 justify-center items-center mr-4`}>
              <Shield size={20} color="#5E60CE" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>Privacy & Security</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('TestBooking')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Test Bookings"
          >
            <View style={tw`w-10 h-10 rounded-full bg-teal-100 justify-center items-center mr-4`}>
              <CalendarCheck size={20} color="#00B8D4" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>Test Bookings</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate('HelpCenter')}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Help Center"
          >
            <View style={tw`w-10 h-10 rounded-full bg-amber-100 justify-center items-center mr-4`}>
              <HelpCircle size={20} color="#FB8C00" />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-gray-800`}>Help Center</Text>
              <ChevronRight size={20} color="#8F9BB3" />
            </View>
          </TouchableOpacity>
        </View>

          <TouchableOpacity
          style={tw`flex-row items-center justify-center bg-red-200 mx-4 py-4 rounded-2xl mb-8 shadow-sm`}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF647C" />
          <Text style={tw`font-semibold text-base text-red-500 ml-2`}>Logout</Text>
        </TouchableOpacity>

        <View style={tw`items-center mb-8`}>
          <Text style={tw`font-normal text-xs text-gray-500`}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}