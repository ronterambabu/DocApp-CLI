import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home, Sun, CloudSun, Moon } from 'lucide-react-native';
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
  clinic?: string;
};

type DoctorDetailRouteProp = RouteProp<RootStackParamList, 'DoctorDetail'>;
type DoctorDetailNavProp = NavigationProp<RootStackParamList, 'DoctorDetail'>;

const slotData = [
  {
    date: 'Today, 17 Jun',
    slots: [],
  },
  {
    date: 'Tomorrow, 18 Jun',
    slots: [
      { period: 'Morning', icon: Sun, count: 4, times: ['11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM'] },
      { period: 'Afternoon', icon: CloudSun, count: 16, times: [
        '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
        '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM',
        '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM',
        '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM',
      ] },
      { period: 'Evening', icon: Moon, count: 8, times: [
        '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM',
        '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM',
      ] },
    ],
  },
  {
    date: 'Thu, 19 Jun',
    slots: [
      { period: 'Morning', icon: Sun, count: 4, times: ['11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM'] },
      { period: 'Afternoon', icon: CloudSun, count: 16, times: [
        '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
        '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM',
        '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM',
        '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM',
      ] },
      { period: 'Evening', icon: Moon, count: 8, times: [
        '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM',
        '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM',
      ] },
    ],
  },
];

const DoctorDetailScreen = () => {
  const navigation = useNavigation<DoctorDetailNavProp>();
  const route = useRoute<DoctorDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { doctor } = route.params;
  const [selectedDateIdx, setSelectedDateIdx] = useState(1); // Default to tomorrow
  const [selectedTime, setSelectedTime] = useState('');

  const selectedSlotGroup = slotData[selectedDateIdx];

  const handleBookAppointment = () => {
    if (selectedSlotGroup && selectedTime) {
      navigation.navigate('BookingSummary', {
        doctor,
        date: selectedSlotGroup.date,
        time: selectedTime,
        consultationType: 'video', // default to video for now
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
    <View style={tw`flex-1 bg-white`}>  
      {/* Blue header bar with doctor info */}
      <View style={[tw`bg-blue-800 flex-row items-center px-4`, { paddingTop: insets.top + 8, paddingBottom: 16 }]}> 
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back" accessibilityRole="button" style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: doctor.image }} style={tw`w-10 h-10 rounded-full border-2 border-white`} />
        <View style={tw`ml-3 flex-1`}> 
          <Text style={tw`text-white font-bold text-base`}>{doctor.name}</Text>
          <Text style={tw`text-white text-xs`}>{doctor.clinic || doctor.location}</Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Clinic Visit Slots Title */}
        <View style={tw`flex-row items-center px-4 mt-4 mb-2`}>
          <Home color="#2563eb" size={20} />
          <Text style={tw`ml-2 text-base font-semibold text-blue-800`}>Clinic Visit Slots</Text>
        </View>

        {/* Date Tabs */}
        <View style={tw`flex-row px-2 pb-2`}> 
          {slotData.map((slot, idx) => (
            <TouchableOpacity
              key={slot.date}
              style={tw`px-4 py-2 mx-1 rounded-lg border ${selectedDateIdx === idx ? 'bg-white border-blue-600' : 'bg-gray-100 border-gray-300'}`}
              onPress={() => { setSelectedDateIdx(idx); setSelectedTime(''); }}
              accessibilityLabel={`Select ${slot.date}`}
              accessibilityRole="button"
            >
              <Text style={tw`${selectedDateIdx === idx ? 'text-blue-800 font-bold' : 'text-gray-700'} text-sm`}>{slot.date}</Text>
              <Text style={tw`text-xs mt-1 ${slot.slots.length === 0 ? 'text-gray-400' : 'text-green-600'}`}>{slot.slots.length === 0 ? 'No slots available' : `${slot.slots.reduce((a, s) => a + s.count, 0)} slots available`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View style={tw`h-px bg-gray-200 mx-4 my-2`} />

        {/* Selected Date Heading */}
        <Text style={tw`text-center text-base font-semibold mb-2`}>{selectedSlotGroup.date}</Text>

        {/* Slot Groups */}
        <View style={tw`px-4`}> 
          {selectedSlotGroup.slots.length === 0 ? (
            <Text style={tw`text-center text-gray-400 my-8`}>No slots available</Text>
          ) : (
            selectedSlotGroup.slots.map((group, idx) => {
              const IconComponent = group.icon;
              return (
                <View key={group.period} style={tw`mb-4`}>
                  <View style={tw`flex-row items-center mb-2`}>
                    <IconComponent color="#2563eb" size={18} />
                    <Text style={tw`ml-2 font-semibold text-gray-700`}>{group.period} <Text style={tw`text-xs text-gray-500`}>{group.count} slots</Text></Text>
                  </View>
                  <View style={tw`flex-row flex-wrap`}>
                    {group.times.map((time) => (
                      <TouchableOpacity
                        key={time}
                        style={tw`px-4 py-2 m-1 rounded-lg border border-blue-600 ${selectedTime === time ? 'bg-blue-600' : 'bg-white'}`}
                        onPress={() => setSelectedTime(time)}
                        accessibilityLabel={`Select ${time}`}
                        accessibilityRole="button"
                      >
                        <Text style={tw`${selectedTime === time ? 'text-white font-bold' : 'text-blue-800 font-semibold'} text-sm`}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={[tw`px-4 pb-4`, { paddingBottom: insets.bottom + 16, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 8 }]}> 
        <TouchableOpacity
          style={tw`w-full py-3.5 rounded-xl items-center ${selectedTime ? 'bg-blue-600' : 'bg-gray-400 opacity-60'}`}
          onPress={handleBookAppointment}
          disabled={!selectedTime}
          accessibilityLabel="Book appointment"
          accessibilityRole="button"
        >
          <Text style={tw`text-white text-base font-bold`}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorDetailScreen;