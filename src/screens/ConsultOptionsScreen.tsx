import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { Home, Video } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../components/PageLayout';

// Define your stack param list for navigation typing
export type RootStackParamList = {
  ConsultOptionsScreen: { specialty?: string };
  Doctors: { specialty: string; mode: string };
};

// Constants
const FALLBACK_SPECIALTY = 'General Consultation';
const CARD_HEIGHT = 180;

type ConsultOptionsScreenRouteProp = RouteProp<RootStackParamList, 'ConsultOptionsScreen'>;
type ConsultOptionsScreenNavProp = NavigationProp<RootStackParamList, 'ConsultOptionsScreen'>;

const ConsultOptionsScreen = () => {
  const navigation = useNavigation<ConsultOptionsScreenNavProp>();
  const route = useRoute<ConsultOptionsScreenRouteProp>();
  const specialty = route.params?.specialty || FALLBACK_SPECIALTY;

  const handleOptionPress = (mode: string) => {
    const standardMode = mode === 'Clinic' ? 'inclinic' : mode.toLowerCase();
    navigation.navigate('Doctors', { specialty, mode: standardMode });
  };

  return (
    <PageLayout title="Consultation Options" headerBackgroundColor="#2E3192">
      <View style={tw`flex-1 px-4 py-8 justify-center`}>
        {/* Specialty Title */}
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-7 text-center`}>{specialty}</Text>
        {/* In-clinic Option */}
        <TouchableOpacity
          style={[
            tw`bg-[#E0F2FE] border border-[#BAE6FD] rounded-[28px] flex-row items-center px-8 mb-7`,
            { height: CARD_HEIGHT, shadowColor: '#38BDF8', shadowOpacity: 0.13, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 }
          ]}
          onPress={() => handleOptionPress('Clinic')}
          activeOpacity={0.8}
          accessible
          accessibilityLabel="Book a clinic visit"
          accessibilityRole="button"
        >
          <View style={tw`bg-white rounded-full w-16 h-16 items-center justify-center mr-7 shadow-sm`}>
            <Home size={32} color="#0EA5E9" strokeWidth={2} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[22px] font-bold text-gray-900 mb-1`}>
              Book In-clinic Appointment
            </Text>
            <Text style={tw`text-base text-gray-500`}>
              Book an appointment with a top {specialty.toLowerCase()} in Hyderabad
            </Text>
          </View>
        </TouchableOpacity>

        {/* Video Consultation Option */}
        <TouchableOpacity
          style={[
            tw`bg-[#F3E8FF] border border-[#D8B4FE] rounded-[28px] flex-row items-center px-8`,
            { height: CARD_HEIGHT, shadowColor: '#A78BFA', shadowOpacity: 0.13, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 }
          ]}
          onPress={() => handleOptionPress('Video')}
          activeOpacity={0.8}
          accessible
          accessibilityLabel="Book a video consultation"
          accessibilityRole="button"
        >
          <View style={tw`bg-white rounded-full w-16 h-16 items-center justify-center mr-7 shadow-sm`}>
            <Video size={32} color="#8B5CF6" strokeWidth={2} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[22px] font-bold text-gray-900 mb-1`}>
              Book Video Consultation
            </Text>
            <Text style={tw`text-base text-gray-500`}>
              Consult with a {specialty.toLowerCase()} online now!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </PageLayout>
  );
};

export default ConsultOptionsScreen;