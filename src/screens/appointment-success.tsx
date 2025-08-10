import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Calendar, Clock, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import Animated, { SlideInUp, FadeInDown } from 'react-native-reanimated';
import tw from 'twrnc';

export default function AppointmentSuccessScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
  };

  const handleViewAppointments = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Appointments' }],
    });
  };

  return (
    <View style={[tw`flex-1 bg-green-50 items-center justify-center px-5`, { paddingTop: insets.top }]}> 
      <Animated.View
        style={tw`mb-7`}
        entering={FadeInDown.delay(300).springify().damping(12)}
      >
        <CheckCircle2 size={80} color="#22c55e" />
      </Animated.View>

      <Animated.View
        style={tw`w-full items-center`}
        entering={SlideInUp.delay(600).springify().damping(12)}
      >
        <Text style={tw`text-3xl font-bold text-green-800 mb-2 text-center`}>Thank You!</Text>
        <Text style={tw`text-base text-green-400 mb-8 text-center`}>Your appointment has been scheduled</Text>

        <View style={tw`w-full bg-green-100 rounded-2xl p-6 items-center mb-8 shadow-sm elevation-2`}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={tw`w-20 h-20 rounded-full mb-4`}
          />
          <Text style={tw`text-lg font-semibold text-green-800 mb-1`}>Dr. John Smith</Text>
          <Text style={tw`text-sm text-green-400 mb-4`}>Cardiologist</Text>

          <View style={tw`w-full h-px bg-green-200 mb-4`} />

          <View style={tw`w-full`}>
            <View style={tw`flex-row items-center mb-3`}>
              <Calendar size={20} color="#16a34a" />
              <Text style={tw`text-sm text-green-800 ml-3`}>Monday, June 12, 2023</Text>
            </View>
            <View style={tw`flex-row items-center mb-3`}>
              <Clock size={20} color="#16a34a" />
              <Text style={tw`text-sm text-green-800 ml-3`}>10:30 AM</Text>
            </View>
          </View>

          <Text style={tw`text-sm text-green-400 text-center mt-4`}>You will receive a notification reminder 1 hour before your appointment.</Text>
        </View>

        <TouchableOpacity style={tw`w-full bg-green-600 rounded-xl py-4 items-center mb-3`} onPress={handleViewAppointments}>
          <Text style={tw`text-base text-white font-semibold`}>View My Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`w-full bg-green-50 rounded-xl py-4 items-center border border-green-200`} onPress={handleGoToHome}>
          <Text style={tw`text-base text-green-400 font-semibold`}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}