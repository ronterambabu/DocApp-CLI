import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const emergencyServices = [
  {
    label: 'Call Emergency Doctor',
    description: 'Speak with an on-call doctor now',
    action: () => Linking.openURL('tel:9112345678'),
  },
  {
    label: 'Find Nearby Emergency Hospitals',
    description: 'Opens Google Maps to locate nearby hospitals',
    action: () =>
      Linking.openURL(
        'https://www.google.com/maps/search/emergency+hospitals+near+me/'
      ),
  },
  {
    label: 'Call Ambulance',
    description: 'Connect to ambulance services',
    action: () => Linking.openURL('tel:102'),
  },
  {
    label: 'Call Fire Brigade',
    description: 'Report fire emergencies',
    action: () => Linking.openURL('tel:101'),
  },
  {
    label: 'Call Police',
    description: 'Report emergencies to police',
    action: () => Linking.openURL('tel:100'),
  },
];

const EmergencyServicesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-100 px-5 pt-10`}>
      <View style={tw`flex-row items-center mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={tw`text-[22px] font-bold text-gray-800`}>Emergency Services</Text>
      </View>

      {emergencyServices.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={tw`bg-white rounded-2xl p-5 mb-4 shadow`}
          onPress={item.action}
        >
          <Text style={tw`text-lg font-semibold text-blue-600`}>{item.label}</Text>
          <Text style={tw`text-sm mt-1.5 text-gray-600`}>{item.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EmergencyServicesScreen;