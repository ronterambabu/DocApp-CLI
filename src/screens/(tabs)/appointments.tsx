import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '../../../apiConfig'; // Adjust the import path as necessary
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  ArrowLeft,
} from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc';

const BASE_URL = 'http://3.108.233.123:5000';

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  image: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  date: string;
  time: string;
  location: string;
};

// Add navigation typing for book-appointment if needed
export type RootStackParamList = {
  AppointmentsScreen: undefined;
  'book-appointment': undefined;
};

export default function AppointmentsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(api.API_ENDPOINTS.listAppointments, {
          withCredentials: true,
        });
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((a) => a.status === activeTab);

  const renderItem = ({ item }: { item: Appointment }) => (
    <View
      style={tw`bg-white rounded-2xl p-4 mb-4 shadow-md border border-gray-100`}
      accessible
      accessibilityLabel={`Appointment with ${item.doctorName}`}
    >
      <View style={tw`flex-row items-center`}>
        <Image
          source={{ uri: item.image }}
          style={tw`w-16 h-16 rounded-full border border-gray-200`}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-base font-semibold text-gray-900`}>{item.doctorName}</Text>
          <Text style={tw`text-sm text-gray-500 mt-0.5`}>{item.specialty}</Text>
        </View>
        <View
          style={tw`flex-row items-center px-3 py-1.5 rounded-full ${
            item.type === 'video' ? 'bg-blue-50' : item.type === 'phone' ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {item.type === 'video' && <Video size={16} color="#1A73E8" />}
          {item.type === 'phone' && <Phone size={16} color="#00C48C" />}
          {item.type === 'in-person' && <MapPin size={16} color="#FF647C" />}
          <Text style={tw`ml-1.5 text-xs font-medium text-gray-800 capitalize`}>
            {item.type.replace('-', ' ')}
          </Text>
        </View>
      </View>

      <View style={tw`flex-row mt-4 items-center`}>
        <View style={tw`flex-row items-center mr-6`}>
          <Calendar size={16} color="#6B7280" />
          <Text style={tw`ml-1.5 text-sm text-gray-600`}>{item.date}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Clock size={16} color="#6B7280" />
          <Text style={tw`ml-1.5 text-sm text-gray-600`}>{item.time}</Text>
        </View>
      </View>

      <View style={tw`flex-row items-center mt-2`}>
        <MapPin size={16} color="#6B7280" />
        <Text style={tw`ml-1.5 text-sm text-gray-600`}>{item.location}</Text>
      </View>

      {item.status === 'upcoming' && (
        <View style={tw`flex-row mt-4 gap-3`}>
          <TouchableOpacity
            style={tw`flex-1 bg-blue-600 py-3 rounded-xl items-center shadow-sm`}
            onPress={() => Alert.alert('Reschedule appointment')}
            accessible
            accessibilityLabel={`Reschedule appointment with ${item.doctorName}`}
            accessibilityRole="button"
          >
            <Text style={tw`text-white font-medium text-sm`}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 bg-red-500 py-3 rounded-xl items-center shadow-sm`}
            onPress={() => Alert.alert('Cancel appointment')}
            accessible
            accessibilityLabel={`Cancel appointment with ${item.doctorName}`}
            accessibilityRole="button"
          >
            <Text style={tw`text-white font-medium text-sm`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <SafeAreaView style={tw`bg-[#ffffff]`}>
        <View style={tw`flex-row items-center px-6 pt-12 pb-4`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 mr-4`}
            accessible
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-bold text-[#111827] flex-1 text-center`}>
            My Appointments
          </Text>
          <View style={tw`w-12`} />
        </View>
      </SafeAreaView>

      <View style={tw`flex-row mx-4 mt-3 mb-4 bg-gray-100 rounded-xl p-1`}>
        {['upcoming', 'completed', 'cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={tw`flex-1 py-2.5 items-center rounded-lg relative ${
              activeTab === tab ? 'bg-white shadow-sm' : 'bg-transparent'
            }`}
            onPress={() => setActiveTab(tab as 'upcoming' | 'completed' | 'cancelled')}
            accessible
            accessibilityLabel={`${tab} appointments`}
            accessibilityRole="tab"
          >
            <Text
              style={tw`${
                activeTab === tab ? 'text-[#1A73E8] font-semibold' : 'text-gray-500'
              } text-sm`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {activeTab === tab && (
              <View style={tw`absolute bottom-0 left-1/2 w-1/3 h-0.5 bg-[#1A73E8] rounded-full -translate-x-1/2`} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="#1A73E8" />
          <Text style={tw`mt-2 text-gray-500`}>Loading appointments...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={tw`px-4 pb-6 pt-2`}
          ListEmptyComponent={
            <View style={tw`items-center justify-center mt-20`}>
              <Text style={tw`text-gray-400 text-sm`}>No {activeTab} appointments</Text>
              {activeTab === 'upcoming' && (
                <TouchableOpacity
                  style={tw`mt-4 bg-[#1A73E8] px-6 py-2 rounded-xl`}
                  onPress={() => navigation.navigate('book-appointment')}
                  accessible
                  accessibilityLabel="Book a new appointment"
                  accessibilityRole="button"
                >
                  <Text style={tw`text-white font-medium`}>Book Appointment</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      )}
    </View>
  );
}