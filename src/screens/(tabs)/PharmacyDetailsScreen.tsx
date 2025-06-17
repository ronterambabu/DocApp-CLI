import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';

const screenWidth = Dimensions.get('window').width;

const PharmacyDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<
    RouteProp<
      { params: { id?: string; name?: string; location?: string; image?: string } },
      'params'
    >
  >();

  const params = route.params || {};

  const pharmacy = {
    id: params.id,
    name: params.name || 'Apollo Pharmacy',
    location: params.location || 'Bangalore, India',
    image:
      params.image ||
      'https://source.unsplash.com/featured/?pharmacy,medicine,store',
    phone: '+91 98765 43210',
    email: 'support@pharmacy.com',
    description:
      'Apollo Pharmacy is a trusted name in healthcare, offering a wide range of prescription & OTC medicines, wellness products, and expert guidance across India. Open all days with home delivery services.',
    timings: '8:00 AM – 10:00 PM',
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full shadow`}
      >
        <Text style={tw`text-blue-600 font-semibold`}>← Back</Text>
      </TouchableOpacity>

      {/* Header Image */}
      <Image
        source={{ uri: pharmacy.image }}
        style={{
          width: screenWidth,
          height: 240,
          resizeMode: 'cover',
        }}
      />

      {/* Pharmacy Info */}
      <View style={tw`p-5`}>
        <Text style={tw`text-2xl font-bold text-slate-900 mb-1`}>
          {pharmacy.name}
        </Text>
        <Text style={tw`text-sm text-slate-500 mb-2`}>
          {pharmacy.location}
        </Text>
        <Text style={tw`text-sm text-blue-600 font-medium mb-3`}>
          Timings: {pharmacy.timings}
        </Text>

        {/* Description */}
        <Text style={tw`text-base text-slate-700 leading-6 mb-5`}>
          {pharmacy.description}
        </Text>

        {/* Contact Info */}
        <View style={tw`mb-2 flex-row`}>
          <Text style={tw`font-semibold text-slate-900 w-[70px]`}>Phone:</Text>
          <Text style={tw`text-slate-700`}>{pharmacy.phone}</Text>
        </View>
        <View style={tw`mb-4 flex-row`}>
          <Text style={tw`font-semibold text-slate-900 w-[70px]`}>Email:</Text>
          <Text style={tw`text-slate-700`}>{pharmacy.email}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PharmacyDetailsScreen;
