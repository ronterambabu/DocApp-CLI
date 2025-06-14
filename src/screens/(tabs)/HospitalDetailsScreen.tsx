import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';

// Define navigation params type
// Adjust as needed for your stack
// Example:
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
    name: params.name || 'Unknown Hospital',
    location: params.location || 'Unknown Location',
    image: params.image || 'https://source.unsplash.com/400x200/?hospital',
    phone: '+91 98765 43210',
    email: 'info@hospital.com',
    description:
      'A leading multispecialty hospital offering comprehensive medical care, advanced technology, and compassionate services.',
    departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency'],
    timings: 'Open 24 hours',
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <TouchableOpacity style={tw`p-4`} onPress={() => navigation.goBack()}>
        <Text style={tw`text-base text-blue-600`}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: hospital.image }} style={tw`w-full h-[220px]`} />

      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-gray-900 mb-1.5`}>
          {hospital.name}
        </Text>
        <Text style={tw`text-base text-gray-600 mb-3`}>
          {hospital.location}
        </Text>
        <Text style={tw`text-sm text-blue-600 font-semibold mb-3`}>
          Timings: {hospital.timings}
        </Text>

        <Text style={tw`text-base text-gray-700 mb-5 leading-6`}>
          {hospital.description}
        </Text>

        <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>
          Departments
        </Text>

        <View style={tw`flex-row flex-wrap mb-5`}>
          {hospital.departments.map((dept, index) => (
            <View
              key={index}
              style={tw`bg-indigo-100 px-2.5 py-1.5 rounded-full mr-2 mb-2`}
            >
              <Text style={tw`text-indigo-800 font-semibold`}>
                {dept}
              </Text>
            </View>
          ))}
        </View>

        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-bold text-gray-900 w-[70px]`}>Phone:</Text>
          <Text style={tw`text-gray-600`}>{hospital.phone}</Text>
        </View>

        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-bold text-gray-900 w-[70px]`}>Email:</Text>
          <Text style={tw`text-gray-600`}>{hospital.email}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HospitalDetailsScreen;
