import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

type RootStackParamList = {
  DoctorDetail: { doctor: Doctor };
  BookingSummary: {
    doctor: Doctor;
    date: string;
    time: string;
    consultationType: 'voice' | 'video';
  };
};

type Doctor = {
  name: string;
  image: string;
  specialty: string;
  rating: number;
  location: string;
  about: string;
  available: boolean;
};

type DoctorDetailRouteProp = RouteProp<RootStackParamList, 'DoctorDetail'>;
type DoctorDetailNavProp = NavigationProp<RootStackParamList, 'DoctorDetail'>;

const DoctorDetailScreen = () => {
  const navigation = useNavigation<DoctorDetailNavProp>();
  const route = useRoute<DoctorDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { doctor } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'voice' | 'video'>('voice');

  const dates = ['Mon, Jun 12', 'Tue, Jun 13', 'Wed, Jun 14', 'Thu, Jun 15', 'Fri, Jun 16'];
  const times = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate('BookingSummary', {
        doctor,
        date: selectedDate,
        time: selectedTime,
        consultationType,
      });
    }
  };

  if (!doctor.available) {
    return (
      <View style={tw`flex-1 bg-white pt-[${insets.top}px]`}>
        <Text style={tw`text-xl font-bold text-center`}>Doctor not available for appointments.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white pt-[${insets.top}px]`}>
      <View style={tw`flex-row items-center justify-between px-4 pb-2`}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold`}>Doctor Detail</Text>
        <TouchableOpacity accessibilityLabel="Add to favorites" accessibilityRole="button">
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`items-center mt-4`}>
          <Image source={{ uri: doctor.image }} style={tw`w-30 h-30 rounded-full`} />
          <Text style={tw`text-2xl font-bold mt-2`}>{doctor.name}</Text>
          <Text style={tw`text-base text-gray-500`}>{doctor.specialty}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={tw`text-gray-500 mx-2`}>{doctor.rating}</Text>
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text style={tw`text-gray-500 mx-2`}>{doctor.location}</Text>
          </View>
        </View>

        <View style={tw`mt-6 px-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>About</Text>
          <Text style={tw`text-sm text-gray-500`}>{doctor.about}</Text>
        </View>

        <View style={tw`mt-6 px-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Consultation Type</Text>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 flex-1 mr-2 ${consultationType === 'video' ? 'border-blue-600 bg-blue-100' : ''}`}
              onPress={() => setConsultationType('video')}
              accessibilityLabel="Select video call"
              accessibilityRole="button"
            >
              <Ionicons name="videocam" size={20} color="black" />
              <Text style={tw`ml-2 text-base`}>Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 flex-1 ${consultationType === 'voice' ? 'border-blue-600 bg-blue-100' : ''}`}
              onPress={() => setConsultationType('voice')}
              accessibilityLabel="Select voice call"
              accessibilityRole="button"
            >
              <Ionicons name="call" size={20} color="black" />
              <Text style={tw`ml-2 text-base`}>Voice Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`mt-6 px-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                style={tw`p-3 rounded-lg bg-gray-200 mr-3 ${selectedDate === date ? 'bg-blue-600' : ''}`}
                onPress={() => setSelectedDate(date)}
                accessibilityLabel={`Select ${date}`}
                accessibilityRole="button"
              >
                <Text style={tw`text-base ${selectedDate === date ? 'text-white' : 'text-black'}`}>{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={tw`mt-6 px-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Select Time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={tw`p-3 rounded-lg bg-gray-200 mr-3 ${selectedTime === time ? 'bg-blue-600' : ''}`}
                onPress={() => setSelectedTime(time)}
                accessibilityLabel={`Select ${time}`}
                accessibilityRole="button"
              >
                <Text style={tw`text-base ${selectedTime === time ? 'text-white' : 'text-black'}`}>{time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={tw`m-5 py-3.5 rounded-xl items-center ${selectedDate && selectedTime ? 'bg-blue-600' : 'bg-gray-400 opacity-60'}`}
          onPress={handleBookAppointment}
          disabled={!selectedDate || !selectedTime}
          accessibilityLabel="Book appointment"
          accessibilityRole="button"
        >
          <Text style={tw`text-white text-base font-bold`}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DoctorDetailScreen;