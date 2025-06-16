// MyPaymentsScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

export type RootStackParamList = {
  'Wallet': undefined;
}
const MyPaymentsScreen = () => {
  const navigation = useNavigation();


  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />

      {/* Top Header */}
      <View style={tw`bg-[#2E3192] px-4 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-semibold ml-3`}>
          My payments
        </Text>
      </View>

      {/* Section Header */}
      <Text style={tw`text-gray-500 text-xs px-4 py-3 uppercase font-semibold`}>
        Payment Options
      </Text>

      {/* Payment Row */}
      <TouchableOpacity
        style={tw`bg-white px-4 py-4 flex-row justify-between items-center`}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Wallet')} // 👈 Redirect to WalletScreen
      >
        <Text style={tw`text-base text-gray-800`}> HealthCash</Text>
        <Text style={tw`text-base text-gray-800`}>0.0</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPaymentsScreen;
