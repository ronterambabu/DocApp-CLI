import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

export default function DoctorAvailabilityScreen() {
  const navigation = useNavigation();

  const doctor = {
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    experience: '10 years experience',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const afternoonSlots = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'];
  const eveningSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'];
  const slotsAvailable = afternoonSlots.length > 0 || eveningSlots.length > 0;

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 bg-gray-50 pt-[${Platform.OS === 'android' ? 10 : 15}]`}
    >
      {/* Header */}
      <View style={tw`flex-row items-center px-4 pb-3 bg-white`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`pr-3`}>
          <ArrowLeft size={24} color="#222B45" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-semibold text-gray-800`}>Select Time</Text>
      </View>

      {/* Doctor Card */}
      <View style={tw`flex-row bg-white m-4 p-3.5 rounded-4xl items-center elevation-3`}>
        <Image source={{ uri: doctor.image }} style={tw`w-18 h-18 rounded-3xl`} />
        <View style={tw`ml-3`}>
          <Text style={tw`text-base font-bold text-gray-800`}>{doctor.name}</Text>
          <Text style={tw`text-xs text-blue-600 mt-0.5`}>{doctor.specialty}</Text>
          <Text style={tw`text-xs text-gray-500 mt-0.5`}>{doctor.experience}</Text>
        </View>
      </View>

      {/* Date Picker Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mx-4 mb-3`}>
        {[0, 1, 2].map((offset) => {
          const date = new Date();
          date.setDate(date.getDate() + offset);
          const label = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : date.toDateString().split(' ')[0];
          const isSelected = selectedDate.toDateString() === date.toDateString();

          return (
            <TouchableOpacity
              key={offset}
              style={tw`bg-gray-200 py-2.5 px-4 rounded-3xl mr-2.5 ${isSelected ? 'bg-blue-600' : ''}`}
              onPress={() => handleConfirmDate(date)}
            >
              <Text style={tw`text-xs text-gray-800 font-semibold ${isSelected ? 'text-white' : ''}`}>
                {label}, {date.getDate()} {date.toLocaleString('default', { month: 'short' })}
              </Text>
              <Text style={tw`text-[11px] text-gray-500`}>
                {offset === 0 ? 'No slots' : `${Math.floor(Math.random() * 10 + 1)} slots available`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Time Slots */}
      <ScrollView contentContainerStyle={tw`pb-30`}>
        <Text style={tw`text-center text-base font-semibold text-gray-800 mb-3`}>
          {selectedDate.toDateString()}
        </Text>

        {slotsAvailable ? (
          <>
            <Text style={tw`text-[15px] font-semibold ml-5 my-1.5 text-gray-800`}>Afternoon</Text>
            <View style={tw`flex-row flex-wrap px-4 mb-2.5`}>
              {afternoonSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={tw`bg-gray-200 py-2.5 px-4 rounded-2.5xl m-1.25 ${selectedTime === slot ? 'bg-blue-600' : ''}`}
                  onPress={() => setSelectedTime(slot)}
                >
                  <Text style={tw`text-sm text-gray-800 ${selectedTime === slot ? 'text-white font-semibold' : ''}`}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={tw`text-[15px] font-semibold ml-5 my-1.5 text-gray-800`}>Evening</Text>
            <View style={tw`flex-row flex-wrap px-4 mb-2.5`}>
              {eveningSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={tw`bg-gray-200 py-2.5 px-4 rounded-2.5xl m-1.25 ${selectedTime === slot ? 'bg-blue-600' : ''}`}
                  onPress={() => setSelectedTime(slot)}
                >
                  <Text style={tw`text-sm text-gray-800 ${selectedTime === slot ? 'text-white font-semibold' : ''}`}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={tw`items-center my-7.5`}>
            <Text style={tw`text-[15px] text-gray-500 mb-4`}>No slots available</Text>
            <TouchableOpacity style={tw`bg-blue-600 py-3 px-5 rounded-3xl mb-2.5`}>
              <Text style={tw`text-white font-semibold`}>Next availability on Wed, 24 Feb</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`py-3 px-5 rounded-3xl border border-blue-600`}>
              <Text style={tw`text-blue-600 font-semibold`}>Contact Clinic</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity
        style={tw`absolute bottom-20 left-5 right-5 bg-blue-600 py-3.5 rounded-3xl items-center z-10 ${!selectedTime ? 'opacity-50' : ''}`}
        onPress={() =>
          selectedTime &&
          Alert.alert('Appointment booked', `Appointment booked for ${doctor.name} on ${selectedDate.toDateString()} at ${selectedTime}`)
        }
        disabled={!selectedTime}
      >
        <Text style={tw`text-base text-white font-semibold`}>Confirm Appointment</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}