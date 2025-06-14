import React from 'react';
import { View, Text, TouchableOpacity, Platform, Pressable } from 'react-native';
import { ArrowLeft, Hospital, Video } from 'lucide-react-native';

import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

// Fallback specialty if none provided
const FALLBACK_SPECIALTY = 'General Consultation';

// Define your stack param list for navigation typing
// Adjust the names/types to match your navigator
export type RootStackParamList = {
  ConsultOptionsScreen: { specialty?: string };
  doctors: { specialty: string; mode: string };
};

type ConsultOptionsScreenRouteProp = RouteProp<RootStackParamList, 'ConsultOptionsScreen'>;
type ConsultOptionsScreenNavProp = NavigationProp<RootStackParamList, 'ConsultOptionsScreen'>;

const ConsultOptionsScreen = () => {
  const navigation = useNavigation<ConsultOptionsScreenNavProp>();
  const route = useRoute<ConsultOptionsScreenRouteProp>();
  const specialty = route.params?.specialty || FALLBACK_SPECIALTY;

  const handleOptionPress = (mode: string) => {
    navigation.navigate('doctors', { specialty, mode });
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-6 pt-16 pb-8`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <TouchableOpacity
          style={tw`p-2 rounded-full bg-white shadow-sm`}
          onPress={() => navigation.goBack()}
          accessible
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-gray-900`}>Consultation Options</Text>
        <View style={tw`w-10`} /> {/* Spacer for layout balance */}
      </View>

      {/* Specialty Title */}
      <Text
        style={tw`text-3xl font-extrabold text-blue-900 text-center mb-4`}
        accessible
        accessibilityLabel={`Specialty: ${specialty}`}
      >
        {specialty}
      </Text>

      {/* Prompt */}
      <Text
        style={tw`text-lg text-gray-600 text-center mb-8`}
        accessible
        accessibilityLabel="Choose your consultation method"
      >
        Choose your consultation method
      </Text>

      {/* Options */}
      <View style={tw`flex-1 justify-center gap-6`}>
        <Pressable
          style={({ pressed }) =>
            tw`flex-row items-center py-5 px-6 rounded-3xl bg-blue-600 shadow-lg shadow-gray-900/10 transition-all duration-200 ${
              pressed ? 'scale-95 opacity-90' : 'scale-100'
            }`
          }
          onPress={() => handleOptionPress('Clinic')}
          accessible
          accessibilityLabel="Book a clinic visit"
          accessibilityRole="button"
        >
          <Hospital size={30} color="#fff" />
          <Text style={tw`text-lg font-semibold text-white ml-4`}>Clinic Visit</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) =>
            tw`flex-row items-center py-5 px-6 rounded-3xl bg-green-600 shadow-lg shadow-gray-900/10 transition-all duration-200 ${
              pressed ? 'scale-95 opacity-90' : 'scale-100'
            }`
          }
          onPress={() => handleOptionPress('Video')}
          accessible
          accessibilityLabel="Book a video consultation"
          accessibilityRole="button"
        >
          <Video size={30} color="#fff" />
          <Text style={tw`text-lg font-semibold text-white ml-4`}>Video Consultation</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConsultOptionsScreen;