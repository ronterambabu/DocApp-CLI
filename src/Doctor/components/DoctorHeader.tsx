import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Settings, Bell, ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';

type DoctorHeaderProps = {
  title: string;
  showSettings?: boolean;
  showNotifications?: boolean;
  showDoctorInfo?: boolean;
};

const DoctorHeader: React.FC<DoctorHeaderProps> = ({
  title,
  showSettings = true,
  showNotifications = true,
  showDoctorInfo = false,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<DoctorStackParamList>>();
  // Always show back button except on dashboard/home (case-insensitive)
  const normalizedTitle = title?.toString().trim().toLowerCase();
  const showBack = normalizedTitle !== 'dashboard' && normalizedTitle !== 'home';
  return (
    <View style={tw`bg-[#202b6d] px-4 pt-12 pb-3`}> {/* Increased pt-12 for more space at the top */}
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          {showBack && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`} accessibilityLabel="Back">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
          )}
          {normalizedTitle === 'dashboard' && (
            <Text style={tw`text-white text-xl font-bold`}>DOCTO</Text>
          )}
          {!['dashboard', 'online reach', 'patient stories'].includes(normalizedTitle) && (
            <Text style={tw`text-white text-lg font-semibold ml-2`}>{title}</Text>
          )}
        </View>
        <View style={tw`flex-row items-center`}>
          {showSettings && (
            <TouchableOpacity style={tw`mr-4`} onPress={() => navigation.navigate('DoctorSettings')}>
              <Settings size={24} color="white" />
            </TouchableOpacity>
          )}
          {showNotifications && (
            <TouchableOpacity onPress={() => navigation.navigate('DoctorNotifications')}>
              <View>
                <Bell size={24} color="white" />
                <View style={tw`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full`} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showDoctorInfo && (
        <View style={tw`mt-4 flex-row items-center`}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View style={tw`ml-3`}>
            <Text style={tw`text-white text-lg font-bold`}>Dr. John Doe</Text>
            <Text style={tw`text-[#1d9be3]`}>Cardiologist</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DoctorHeader;
