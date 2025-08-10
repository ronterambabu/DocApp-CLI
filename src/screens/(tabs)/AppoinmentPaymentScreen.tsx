import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';

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
  AppoinmentPaymentScreen: {
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    amount: number;
    bookingId: string;
  };
};

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
  const { doctor, slot, date, consultationType, amount, bookingId } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('AppointmentSuccess', {
        doctor,
        slot,
        date,
        consultationType,
        appointmentId: bookingId,
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
        </View>

        {/* Appointment Summary */}
        <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
        

          {/* Doctor Info */}
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={{ uri: doctor.profile_picture }}
              style={tw`w-16 h-16 rounded-full mr-3`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`font-bold text-gray-900`}>{doctor.user.username}</Text>
              {doctor.specialization && <Text style={tw`text-gray-600`}>{doctor.specialization}</Text>}
              <Text style={tw`text-green-700`}>
                {[
                  doctor.user.address[0]?.house_no,
                  doctor.user.address[0]?.street,
                  doctor.user.address[0]?.landmark,
                  doctor.user.address[0]?.city,
                  doctor.user.address[0]?.state,
                  doctor.user.address[0]?.pincode,
                ]
                  .filter((item) => item && item.trim() !== '')
                  .join(', ')}
              </Text>
                  {doctor?.address && (
                    <Text style={tw`text-gray-500 text-sm`}>{doctor.address}</Text>
                  )}
              {doctor.consultation_fee && (
                <Text style={tw`text-green-700 mt-1`}>
                  Fee: ₹{doctor.consultation_fee}
                </Text>
              )}
              {doctor.experience_years !== undefined && (
                <Text style={tw`text-gray-500 text-sm`}>{doctor.experience_years} years experience</Text>
              )}
            </View>
          </View>

          {/* Appointment Time */}
          {/* Appointment Time */}
<View style={tw`flex-row items-center mb-2`}>
  <Calendar size={18} color="#4B5563" />
  <Text style={tw`ml-2 text-gray-700 font-medium`}>
    {date || 'Not available'}
  </Text>
</View>
<View style={tw`flex-row items-center`}>
  <Clock size={18} color="#4B5563" />
  <Text style={tw`ml-2 text-gray-700 font-medium`}>
    {slot || 'Not available'}
  </Text>
</View>


        </View>

        {/* Booking ID */}
        <View style={tw`bg-gray-50 p-3 rounded-lg mb-4`}>
          <Text style={tw`text-gray-600`}>Booking ID</Text>
          <Text style={tw`text-gray-900 font-medium`}>{bookingId}</Text>
        </View>

        {/* Payment Summary */}
        <View style={tw`mt-4 bg-white p-4 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Bill Details</Text>

          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`text-gray-600`}>
              {consultationType === 'video' ? 'Video Consultation Fee' : 'Consultation Fee'}
            </Text>
            <Text style={tw`text-gray-900 font-medium`}>₹{doctor.consultation_fee}</Text>
          </View>

          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`text-gray-600`}>Platform Fee</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-400 line-through mr-2`}>₹49</Text>
              <Text style={tw`text-green-600`}>FREE</Text>
            </View>
          </View>

          <View style={tw`mt-3 pt-3 border-t border-gray-200`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
              <Text style={tw`text-gray-900 font-bold`}>₹{doctor.consultation_fee}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={tw`mt-6 bg-white p-4 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Payment Methods</Text>

          {/* UPI */}
          <TouchableOpacity style={tw`flex-row items-center justify-between p-3 border border-gray-200 rounded-lg mb-3`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`w-10 h-10 bg-blue-50 rounded-full items-center justify-center`}>
                <Text style={tw`text-blue-600 font-bold`}>UPI</Text>
              </View>
              <Text style={tw`ml-3 font-medium`}>UPI / QR Code</Text>
            </View>
            <Text style={tw`text-blue-600`}>PAY</Text>
          </TouchableOpacity>

          {/* Cards */}
          <TouchableOpacity style={tw`flex-row items-center justify-between p-3 border border-gray-200 rounded-lg`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`w-10 h-10 bg-green-50 rounded-full items-center justify-center`}>
                <Text style={tw`text-green-600 font-bold`}>₹</Text>
              </View>
              <Text style={tw`ml-3 font-medium`}>Cards, Netbanking & More</Text>
            </View>
            <Text style={tw`text-blue-600`}>PAY</Text>
          </TouchableOpacity>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={tw`text-white font-bold text-lg`}>
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
