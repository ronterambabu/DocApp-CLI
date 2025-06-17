import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react-native';

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
    <View style={tw`flex-1 bg-gray-50`}>
      <PageHeader title="Hospital Details" onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hospital logo at the very top with subtle gradient bg */}
        <View style={tw`items-center mb-2`}> 
          <View style={tw`w-32 h-32 rounded-full bg-gradient-to-br from-[#202b6d] to-[#4f5bd5] items-center justify-center shadow-2xl`}> 
            <Image source={require('../Images/apllo1.jpg')} style={tw`w-28 h-28 rounded-full border-4 border-white`} />
          </View>
        </View>
        {/* Hospital image with overlayed name and location, with glassmorphism effect */}
        <View style={tw`relative mb-8 mx-4 rounded-3xl overflow-hidden shadow-2xl`}> 
          <Image source={{ uri: hospital.image }} style={tw`w-full h-64`} />
          <View style={[tw`absolute left-0 right-0 bottom-0 px-8 py-5 flex-col items-center`, {backgroundColor: 'rgba(32,43,109,0.82)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24}]}> 
            <Text style={tw`text-white text-2xl font-extrabold mb-0 drop-shadow-lg text-center tracking-wide`}>{hospital.name}</Text>
            <View style={tw`flex-row items-center justify-center mt-1`}>
              <MapPin size={20} color="#fff" />
              <Text style={tw`text-white text-base ml-2 font-medium`}>{hospital.location}</Text>
            </View>
          </View>
        </View>
        {/* Info Card with glassmorphism and section separation */}
        <View style={tw`bg-white/90 mx-4 rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100`}> 
          <View style={tw`flex-row items-center mb-6`}> 
            <Clock size={24} color="#202b6d" />
            <Text style={tw`text-blue-700 font-semibold ml-4 text-lg`}>Timings: {hospital.timings}</Text>
          </View>
          <Text style={tw`text-base text-gray-700 mb-7 leading-7`}>{hospital.description}</Text>
          <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Departments</Text>
          <View style={tw`flex-row flex-wrap mb-7`}> 
            {hospital.departments.map((dept, index) => (
              <View
                key={index}
                style={tw`bg-indigo-100 px-5 py-2 rounded-full mr-3 mb-3 shadow-sm`}
              >
                <Text style={tw`text-indigo-800 font-semibold text-base`}>{dept}</Text>
              </View>
            ))}
          </View>
          <View style={tw`flex-row items-center mb-4`}> 
            <Phone size={22} color="#202b6d" />
            <Text style={tw`ml-4 text-gray-700 text-lg font-medium`}>{hospital.phone}</Text>
          </View>
          <View style={tw`flex-row items-center`}> 
            <Mail size={22} color="#202b6d" />
            <Text style={tw`ml-4 text-gray-700 text-lg font-medium`}>{hospital.email}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HospitalDetailsScreen;
