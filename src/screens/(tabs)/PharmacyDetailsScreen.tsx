import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';

const PharmacyDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { id?: string; name?: string; location?: string; image?: string } }, 'params'>>();
  const params = route.params || {};

  const pharmacy = {
    id: params.id,
    name: params.name || 'Unknown Pharmacy',
    location: params.location || 'Unknown Location',
    image:
      params.image ||
      'https://images.unsplash.com/photo-1580281657527-47aab76dfdc1?auto=format&fit=crop&w=800&q=80',
    phone: '+91 12345 67890',
    email: 'contact@pharmacy.com',
    description:
      'This pharmacy provides a wide range of medicines, health products, and expert advice. Open 24/7 for your convenience.',
    timings: '8:00 AM - 10:00 PM',
  };

  return (
    <ScrollView style={tw`flex-1 bg-slate-100`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`p-4`}
      >
        <Text style={tw`text-base text-blue-600`}>← Back</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: pharmacy.image }}
        style={tw`w-full h-[220px]`}
      />
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-slate-800 mb-1.5`}>
          {pharmacy.name}
        </Text>
        <Text style={tw`text-base text-slate-500 mb-3`}>{pharmacy.location}</Text>
        <Text style={tw`text-sm text-blue-600 font-semibold mb-3`}>
          Timings: {pharmacy.timings}
        </Text>
        <Text style={tw`text-base text-slate-700 mb-5 leading-6`}>
          {pharmacy.description}
        </Text>

        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-bold text-slate-800 w-[70px]`}>Phone:</Text>
          <Text style={tw`text-slate-600`}>{pharmacy.phone}</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-bold text-slate-800 w-[70px]`}>Email:</Text>
          <Text style={tw`text-slate-600`}>{pharmacy.email}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PharmacyDetailsScreen;