import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Info, Clock } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

type Doctor = {
  name: string;
  clinic: string;
  image: string;
  specialty?: string;
  fee?: number;
  experience?: number;
  rating?: string | null;
};

type RootStackParamList = {
  AppointmentBooking: {
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
  };
  AppointmentPaymentScreen: {
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    amount: number;
    bookingId: string;
  };
  AppointmentSuccess: {
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    appointmentId: string;
  };
};

export default function BookAppointmentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AppointmentBooking'>>();
  const insets = useSafeAreaInsets();

  const { doctor, slot, date, consultationType } = route.params;

  // Calculate time until appointment
  const getTimeUntilAppointment = () => {
    const now = new Date();
    const [, dayStr, monthStr] = date.split(', ')[1].split(' ');
    const [time, meridian] = slot.split(' ');
    const [hours, minutes] = time.split(':');
    
    const apptDate = new Date(now.getFullYear(), getMonthNumber(monthStr), parseInt(dayStr));
    apptDate.setHours(
      meridian === 'PM' ? (parseInt(hours) === 12 ? 12 : parseInt(hours) + 12) : parseInt(hours),
      parseInt(minutes)
    );

    const diff = apptDate.getTime() - now.getTime();
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
    const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `in ${hoursUntil} hours and ${minutesUntil} minutes`;
  };

  const getMonthNumber = (month: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(month);
  };

  // Update the Doctor Info view to include more details
  const DoctorInfoCard = ({ doctor }: { doctor: Doctor }) => (
    <View style={tw`flex-row items-center mt-4 bg-white p-4 rounded-lg shadow-sm`}>
      <Image
        source={{ uri: doctor.image }}
        style={tw`w-14 h-14 rounded-full mr-4`}
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-semibold text-gray-900`}>{doctor.name}</Text>
        {doctor.specialty && (
          <Text style={tw`text-sm text-gray-600`}>{doctor.specialty}</Text>
        )}
        <Text style={tw`text-sm text-gray-600 mt-1`}>{doctor.clinic}</Text>
        <View style={tw`flex-row mt-1`}>
          {doctor.experience && (
            <Text style={tw`text-sm text-gray-500 mr-3`}>{doctor.experience} years exp</Text>
          )}
          {doctor.rating && (
            <Text style={tw`text-sm text-gray-500`}>⭐ {doctor.rating}</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={[tw`flex-1 bg-gray-50`, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-medium text-gray-900`}>
          Book {consultationType === 'video' ? 'Video Consultation' : 'In-Clinic Appointment'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-24 px-4`}>
        {/* Doctor Info */}
        <DoctorInfoCard doctor={doctor} />

        {/* Appointment Time */}
        <View style={tw`mt-4 bg-white p-4 rounded-lg`}>
          <View style={tw`flex-row justify-between items-center mb-1`}>
            <View style={tw`flex-row items-center`}>
              <Clock size={16} color="#6B7280" />
              <Text style={tw`ml-2 text-sm text-gray-500`}>Appointment time</Text>
            </View>            <TouchableOpacity 
              onPress={() => navigation.navigate('DoctorAvailability', {
                doctor: {
                  name: doctor.name,
                  specialty: doctor.specialty,
                  clinic: doctor.clinic,
                  image: doctor.image,
                  fee: doctor.fee,
                  experience: doctor.experience,
                  rating: doctor.rating
                },
                consultationType
              })}
              style={tw`py-1 px-3`}
            >
              <Text style={tw`text-blue-600 text-sm font-semibold`}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          <Text style={tw`text-base font-semibold text-gray-900 mt-1`}>{date} {slot}</Text>
          <Text style={tw`text-xs text-gray-500 mt-1`}>⏱ {getTimeUntilAppointment()}</Text>
        </View>

        {consultationType === 'inclinic' && (
          /* Clinic Details */
          <View style={tw`mt-6`}>
            <Text style={tw`text-sm text-gray-500 mb-2`}>Clinic Details</Text>
            <Text style={tw`text-sm text-gray-800`}>
              {doctor.clinic}
            </Text>
          </View>
        )}

        {/* Apply Coupon */}
        <View style={tw`mt-6 p-4 border rounded-lg border-gray-200 bg-white`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`bg-blue-100 w-8 h-8 rounded-lg items-center justify-center`}>
                <Text style={tw`text-blue-700 text-base font-bold`}>%</Text>
              </View>
              <View style={tw`ml-3`}>
                <Text style={tw`text-gray-900 text-sm font-medium`}>Apply Coupon</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>Unlock offers with coupon codes</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={tw`text-blue-600 text-sm font-semibold`}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Details */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-sm font-semibold text-gray-800 mb-4`}>Bill Details</Text>          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`text-sm text-gray-700`}>
              {consultationType === 'video' ? 'Video Consultation Fee' : 'Consultation Fee'}
            </Text>
            <Text style={tw`text-sm text-gray-900`}>₹{doctor.fee || 600}</Text>
          </View>

          <View style={tw`flex-row justify-between items-center mb-1`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-sm text-gray-700`}>Service Fee & Tax</Text>
              <Info size={14} color="#6B7280" style={tw`ml-1`} />
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-xs text-gray-400 line-through mr-2`}>₹49</Text>
              <Text style={tw`text-green-600 font-medium text-sm`}>FREE</Text>
            </View>
          </View>
          <Text style={tw`text-xs text-green-600`}>We care for you & provide a free booking</Text>
        </View>

        {/* Total Payable */}
        <View style={tw`mt-4 pt-4 border-t border-gray-200`}>
          <View style={tw`flex-row justify-between items-center`}>            <Text style={tw`text-base font-semibold text-gray-900`}>Total Payable</Text>
            <Text style={tw`text-base font-semibold text-gray-900`}>₹{doctor.fee || 600}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={tw`absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white`}>
        <View style={tw`flex-row justify-between items-center px-4 py-4`}>
          <View>
            <Text style={tw`text-lg font-bold text-gray-900`}>₹{doctor.fee || 600}</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-[#00A0E3]`}>View Bill</Text>
            </TouchableOpacity>
          </View>          <TouchableOpacity
            style={tw`bg-[#00A0E3] px-8 py-3 rounded-lg`}
            activeOpacity={0.9}
            onPress={() => {
              // Note: The route name needs to match exactly what's in App.tsx
              navigation.navigate('AppoinmentPaymentScreen', {
                doctor,
                slot,
                date,
                consultationType,
                amount: doctor.fee || 600,
                bookingId: `BOOK${Math.random().toString(36).substring(7).toUpperCase()}`
              });
            }}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}