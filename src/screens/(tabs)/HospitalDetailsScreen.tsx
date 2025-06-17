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

type HospitalDetailsParams = {
  id: string;
  name?: string;
  location?: string;
  image?: string;
};

const HospitalDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: HospitalDetailsParams }, 'params'>>();
  const params = route.params || {};

  const hospital = {
    id: params.id,
    name: params.name || 'Sunshine Multispecialty Hospital',
    location: params.location || 'Hyderabad, India',
    image: params.image || 'https://source.unsplash.com/featured/?hospital,building',
    phone: '+91 98765 43210',
    email: 'info@hospital.com',
    description:
      'A leading multispecialty hospital offering comprehensive medical care with advanced technology and a team of experienced professionals.',
    departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency'],
    timings: 'Open 24 Hours',
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      {/* Back button */}
      <TouchableOpacity style={tw`absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full shadow`} onPress={() => navigation.goBack()}>
        <Text style={tw`text-blue-600 font-semibold`}>← Back</Text>
      </TouchableOpacity>

      {/* Hospital Image */}
      <Image
        source={{ uri: hospital.image }}
        style={{
          width: Dimensions.get('window').width,
          height: 240,
          resizeMode: 'cover',
        }}
      />

      {/* Hospital Info */}
      <View style={tw`p-5`}>
        <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>
          {hospital.name}
        </Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}>
          {hospital.location}
        </Text>
        <Text style={tw`text-sm text-blue-600 font-medium mb-3`}>
          Timings: {hospital.timings}
        </Text>

        {/* Description */}
        <Text style={tw`text-base text-gray-700 leading-6 mb-5`}>
          {hospital.description}
        </Text>

        {/* Departments */}
        <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>Departments</Text>
        <View style={tw`flex-row flex-wrap mb-5`}>
          {hospital.departments.map((dept, idx) => (
            <View
              key={idx}
              style={tw`bg-blue-100 px-3 py-1.5 rounded-full mr-2 mb-2`}
            >
              <Text style={tw`text-blue-700 font-medium text-sm`}>{dept}</Text>
            </View>
          ))}
        </View>

        {/* Contact Info */}
        <View style={tw`mb-2 flex-row`}>
          <Text style={tw`font-bold text-gray-900 w-[70px]`}>Phone:</Text>
          <Text style={tw`text-gray-700`}>{hospital.phone}</Text>
        </View>
        <View style={tw`mb-4 flex-row`}>
          <Text style={tw`font-bold text-gray-900 w-[70px]`}>Email:</Text>
          <Text style={tw`text-gray-700`}>{hospital.email}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HospitalDetailsScreen;
