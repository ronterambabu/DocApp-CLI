import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import { CalendarDays, Sun, CloudSun, Moon, BriefcaseMedical, ArrowLeft, Video } from 'lucide-react-native';
import tw from 'twrnc';

// Helper function to get dates
const getDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      full: `${date.getDate() === today.getDate() ? 'Today' : 
             date.getDate() === tomorrow.getDate() ? 'Tomorrow' : 
             days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`,
      slots: date.getDate() === today.getDate() ? 0 : 28
    };
  };

  return [today, tomorrow, dayAfter].map(formatDate);
};

const slots = {
  Morning: ['11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM'],
  Afternoon: [
    '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
    '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM',
    '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM',
    '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM',
  ],
  Evening: ['04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM'],
};

type Doctor = { 
  name: string; 
  clinic: string; 
  image: string; 
  specialty?: string; 
  fee?: number;
  experience?: number;
  rating?: string | null;
};

const doctorDefault = {
  name: 'Dr. Navya Chowdary',
  clinic: 'Sasha Luxe Dermatology and Cosmetic Surgery Centre, madhapur',
  image: 'https://randomuser.me/api/portraits/women/44.jpg',
  specialty: 'Dermatologist',
  fee: 1000,
  experience: 15,
  rating: '4.8'
};

type RootStackParamList = { 
  DoctorAvailability: { 
    doctor: Doctor; 
    consultationType?: 'video' | 'inclinic';
  }; 
  AppointmentBooking: {
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
  };
};

const DoctorAvailabilityScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'DoctorAvailability'>>();
  const doctor = route.params?.doctor || doctorDefault;  const consultationType = route.params?.consultationType || 'inclinic';
  const dates = getDates();
  const [selectedDate, setSelectedDate] = useState(dates[1].full); // Default to tomorrow

  const handleSlotSelection = (timeSlot: string) => {
    // Navigate to appointment booking with all required data
    navigation.navigate('AppointmentBooking', {
      doctor: {
        name: doctor.name,
        specialty: doctor.specialty,
        clinic: doctor.clinic,
        image: doctor.image,
        fee: doctor.fee,
        experience: doctor.experience,
        rating: doctor.rating
      },
      slot: timeSlot,
      date: selectedDate,
      consultationType
    });
  };

  const dateTabs = dates.map(date => ({
    label: date.full,
    slots: date.slots
  }));
  const renderSlots = (label: string, data: string[], icon: React.ReactNode) => {
    const isToday = selectedDate.includes('Today');
    const currentTime = new Date().getHours() * 100 + new Date().getMinutes();
    
    const isSlotAvailable = (slot: string) => {
      if (!isToday) return true;
      const [time, period] = slot.split(' ');
      const [hours, minutes] = time.split(':');
      let slotTime = parseInt(hours) * 100 + parseInt(minutes);
      if (period === 'PM' && parseInt(hours) !== 12) {
        slotTime += 1200;
      }
      return slotTime > currentTime;
    };

    const availableSlots = data.filter(slot => isSlotAvailable(slot));

    if (availableSlots.length === 0) return null;

    return (
      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center mb-2`}>
          {icon}
          <Text style={tw`ml-2 text-gray-700 font-semibold`}>{label}</Text>
          <Text style={tw`ml-2 text-gray-400`}>{availableSlots.length} slots</Text>
        </View>
        <View style={tw`flex-row flex-wrap`}>
          {data.map((slot: string, idx: number) => {
            const available = isSlotAvailable(slot);
            return (
              <TouchableOpacity
                key={idx}
                style={tw`border ${available ? 'border-blue-500' : 'border-gray-300'} 
                         px-4 py-2 rounded-lg mb-2 mr-2 
                         ${available ? 'bg-white' : 'bg-gray-50'}`}
                activeOpacity={0.85}
                onPress={() => available && handleSlotSelection(slot)}
                disabled={!available}
              >
                <Text style={tw`${available ? 'text-blue-700' : 'text-gray-400'} text-base font-semibold`}>
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={[tw`flex-1 bg-white`, { paddingTop: insets.top }]}> 
      <PageHeader
        title=""
        backgroundColor="#2b2a82"
        textColor="#fff"
        onBackPress={() => navigation.goBack()}
        leftComponent={
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={tw`p-2 mr-2`}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <View style={tw`flex-row items-center`}> 
              <Image source={{ uri: doctor.image }} style={tw`w-10 h-10 rounded-full border-2 border-white`} />
              <View style={tw`ml-3`}> 
                <Text style={tw`text-white font-bold text-base`}>{doctor.name}</Text>
                <Text style={tw`text-white text-xs`} numberOfLines={2}>{doctor.clinic}</Text>
              </View>
            </View>
          </View>
        }
      />

      {/* Consultation Type Header */}
      <View style={tw`bg-white mx-4 mt-6 mb-2 rounded-2xl shadow-lg p-4 z-10 flex-row items-center`}>
        {consultationType === 'video' ? (
          <>
            <Video size={24} color="#059669" />
            <Text style={tw`ml-3 text-green-800 font-semibold text-base`}>
              Available Video Consultation Slots
            </Text>
          </>
        ) : (
          <>
            <BriefcaseMedical size={24} color="#2563eb" />
            <Text style={tw`ml-3 text-blue-900 font-semibold text-base`}>
              Available In-Clinic Visit Slots
            </Text>
          </>
        )}
      </View>

      {/* Rest of the component */}
      <ScrollView contentContainerStyle={tw`pt-6 pb-6 px-4`}>
        {/* Date Picker Tabs */}
        <View style={tw`flex-row justify-between mb-6`}>
          {dateTabs.map(tab => (
            <TouchableOpacity
              key={tab.label}
              style={[
                tw`flex-1 px-2 py-2 rounded-lg mx-1 border`,
                selectedDate === tab.label
                  ? tw`border-blue-500 bg-blue-50`
                  : tw`border-gray-300 bg-white`
              ]}
              onPress={() => setSelectedDate(tab.label)}
              activeOpacity={0.85}
            >
              <Text style={tw`${selectedDate === tab.label ? 'text-blue-700 font-bold' : 'text-gray-700'} text-center text-sm`}>{tab.label}</Text>
              <Text style={tw`text-center text-xs mt-1 ${tab.slots === 0 ? 'text-gray-400' : 'text-green-600'}`}>{tab.slots === 0 ? 'No slots available' : `${tab.slots} slots available`}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={tw`text-base font-semibold mb-4`}>{selectedDate}</Text>
        {renderSlots('Morning', slots.Morning, <Sun size={18} color="#fbbf24" />)}
        {renderSlots('Afternoon', slots.Afternoon, <CloudSun size={18} color="#f59e42" />)}
        {renderSlots('Evening', slots.Evening, <Moon size={18} color="#6366f1" />)}
      </ScrollView>
    </View>
  );
};

export default DoctorAvailabilityScreen;
