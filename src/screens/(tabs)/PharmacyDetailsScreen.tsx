import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react-native';

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
    <View style={tw`flex-1 bg-slate-100`}>
      <PageHeader title="Pharmacy Details" onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pharmacy logo at the very top with subtle gradient bg */}
        <View style={tw`items-center mb-2`}>
          <View style={tw`w-32 h-32 rounded-full bg-gradient-to-br from-[#202b6d] to-[#4f5bd5] items-center justify-center shadow-2xl`}>
            <Image source={require('../Images/medpluse1.jpg')} style={tw`w-28 h-28 rounded-full border-4 border-white`} />
          </View>
        </View>
        {/* Pharmacy image with overlayed name and location, with glassmorphism effect */}
        <View style={tw`relative mb-8 mx-4 rounded-3xl overflow-hidden shadow-2xl`}>
          <Image source={{ uri: pharmacy.image }} style={tw`w-full h-64`} />
          <View style={[tw`absolute left-0 right-0 bottom-0 px-8 py-5 flex-col items-center`, {backgroundColor: 'rgba(32,43,109,0.82)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24}]}> 
            <Text style={tw`text-white text-2xl font-extrabold mb-0 drop-shadow-lg text-center tracking-wide`}>{pharmacy.name}</Text>
            <View style={tw`flex-row items-center justify-center mt-1`}>
              <MapPin size={20} color="#fff" />
              <Text style={tw`text-white text-base ml-2 font-medium`}>{pharmacy.location}</Text>
            </View>
          </View>
        </View>
        {/* Info Card with glassmorphism and section separation */}
        <View style={tw`bg-white/90 mx-4 rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100`}> 
          <View style={tw`flex-row items-center mb-6`}> 
            <Clock size={24} color="#202b6d" />
            <Text style={tw`text-blue-700 font-semibold ml-4 text-lg`}>Timings: {pharmacy.timings}</Text>
          </View>
          <Text style={tw`text-base text-gray-700 mb-7 leading-7`}>{pharmacy.description}</Text>
          <View style={tw`flex-row items-center mb-4`}> 
            <Phone size={22} color="#202b6d" />
            <Text style={tw`ml-4 text-gray-700 text-lg font-medium`}>{pharmacy.phone}</Text>
          </View>
          <View style={tw`flex-row items-center`}> 
            <Mail size={22} color="#202b6d" />
            <Text style={tw`ml-4 text-gray-700 text-lg font-medium`}>{pharmacy.email}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PharmacyDetailsScreen;