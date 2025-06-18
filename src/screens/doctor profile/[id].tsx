import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeft, Share2, ThumbsUp, MessageSquare, MapPin, Star, Home, Video } from 'lucide-react-native';
import PageHeader from '../../components/PageHeader';

type DoctorProfileParams = {
  params: {
    doctor: {
      id: string;
      name: string;
      specialty: string;
      experience: number;
      rating: string | null;
      recommendation: string;
      patientStories: number;
      clinic: string;
      location: string;
      fee: number;
      type: 'inclinic' | 'video';
      image: string;
      clinics: Array<{
        name: string;
        location: string;
        fee: number;
        slots: Array<{
          date: string;
          times: string[];
        }>;
      }>;
    };
  };
};

type TimeSlotProps = {
  time: string;
  onPress: () => void;
  isAvailable?: boolean;
};

const TimeSlot: React.FC<TimeSlotProps> = ({ time, onPress, isAvailable = true }) => (
  <TouchableOpacity
    style={[
      tw`py-2 px-4 rounded-lg mr-2`,
      isAvailable ? tw`bg-[#25a9e1]` : tw`bg-gray-100`
    ]}
    onPress={onPress}
    disabled={!isAvailable}
  >
    <Text 
      style={[
        tw`font-medium`,
        isAvailable ? tw`text-white` : tw`text-gray-400`
      ]}
    >
      {time}
    </Text>
  </TouchableOpacity>
);

const DoctorProfileScreen: React.FC = () => {  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<DoctorProfileParams, 'params'>>();
  const { doctor } = route.params;

  const tomorrowSlots = ['09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM'];
  const handleBooking = (time: string) => {
    navigation.navigate('DoctorAvailability', {
      doctor: {
        name: doctor.name,
        specialty: doctor.specialty,
        clinic: doctor.clinics[0].name,
        image: doctor.image,
        fee: doctor.clinics[0].fee,
        experience: doctor.experience,
        rating: doctor.rating
      },
      consultationType: doctor.type
    });
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <PageHeader
        title=""
        backgroundColor="#202b6d"
        textColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={tw`flex-row`}>
            <TouchableOpacity style={tw`p-2 mr-2`}>
              <Star size={24} color="#fff" fill="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-2`}>
              <Share2 size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView>
        {/* Doctor Info Section */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-start`}>
            <Image
              source={{ uri: doctor.image }}
              style={tw`w-24 h-24 rounded-full`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>{doctor.name}</Text>
              <Text style={tw`text-lg text-gray-600 mt-1`}>{doctor.specialty}</Text>              {doctor.rating && (
                <View style={tw`flex-row items-center mt-1`}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={tw`text-base text-gray-600 ml-1`}>{doctor.rating}</Text>
                </View>
              )}
              <Text style={tw`text-base text-gray-600 mt-1`}>
                {doctor.experience} Years overall experience
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <MapPin size={16} color="#202b6d" />
                <Text style={tw`text-base text-gray-600 ml-1`}>{doctor.location}</Text>
              </View>
            </View>
          </View>

          {/* Recommendation Stats */}
          <View style={tw`flex-row items-center mt-4`}>
            <View style={tw`flex-row items-center`}>
              <ThumbsUp size={20} color="#22c55e" />
              <Text style={tw`ml-2 text-lg font-bold text-gray-800`}>
                {doctor.recommendation}
              </Text>
            </View>
            <TouchableOpacity 
              style={tw`flex-row items-center ml-6`}
              onPress={() => navigation.navigate('PatientStories' as never)}
            >
              <MessageSquare size={20} color="#202b6d" />
              <Text style={tw`ml-2 text-base underline text-[#202b6d]`}>
                {doctor.patientStories} Patient Stories
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clinic Visit Section */}
        {doctor.clinics.map((clinic, index) => (
          <View key={index} style={tw`bg-blue-50/50 p-4`}>
            <View style={tw`bg-white rounded-xl p-4`}>              <View style={tw`flex-row items-center mb-2`}>
                {doctor.type === 'inclinic' ? (
                  <>
                    <Home size={20} color="#202b6d" />
                    <Text style={tw`text-lg font-bold text-[#202b6d] ml-2`}>Book Clinic Visit</Text>
                  </>
                ) : (
                  <>
                    <Video size={20} color="#202b6d" />
                    <Text style={tw`text-lg font-bold text-[#202b6d] ml-2`}>Book Video Consultation</Text>
                  </>
                )}
              </View>

              <View style={tw`mt-2`}>
                <Text style={tw`text-base text-gray-800`}>{clinic.name}</Text>
                <View style={tw`flex-row items-center mt-1`}>
                  <Text style={tw`text-base text-gray-500`}>KPHB</Text>
                  <TouchableOpacity>
                    <Text style={tw`text-[#25a9e1] ml-2`}>+2 more clinics</Text>
                  </TouchableOpacity>
                </View>
                <Text style={tw`text-xl font-bold text-[#202b6d] mt-2`}>₹{clinic.fee} fee</Text>
              </View>

              {/* Availability Section */}
              <View style={tw`mt-4`}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <View style={tw`items-center px-4 py-2`}>
                    <Text style={tw`text-gray-500`}>Today</Text>
                    <Text style={tw`text-base font-medium text-red-500`}>No slots</Text>
                  </View>
                  <View style={tw`items-center px-4 py-2 border-b-2 border-[#25a9e1]`}>
                    <Text style={tw`text-[#25a9e1] font-medium`}>Tomorrow</Text>
                    <Text style={tw`text-base font-medium text-[#25a9e1]`}>22 slots</Text>
                  </View>
                  <View style={tw`items-center px-4 py-2`}>
                    <Text style={tw`text-gray-500`}>20 Jun - 21 Jun</Text>
                    <Text style={tw`text-base font-medium text-red-500`}>No slots</Text>
                  </View>
                </View>

                {/* Time Slots */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={tw`flex-row mt-2`}>
                    {tomorrowSlots.map((time, idx) => (
                      <TimeSlot key={idx} time={time} onPress={() => handleBooking(time)} />
                    ))}
                  </View>
                </ScrollView>

                <TouchableOpacity style={tw`mt-3`}>
                  <Text style={tw`text-[#25a9e1] text-center font-medium`}>View all slots</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Patient Stories Section */}
        <View style={tw`p-4`}>
          <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>Patient Stories</Text>
          <Text style={tw`text-gray-600 mb-4`}>
            These stories represent patient opinions and experiences. They do not reflect the doctor's medical capabilities.
          </Text>
          
          <View style={tw`bg-green-50 p-4 rounded-xl mb-4`}>
            <View style={tw`flex-row items-center`}>
              <ThumbsUp size={24} color="#22c55e" />
              <Text style={tw`text-2xl font-bold ml-2 text-gray-800`}>{doctor.recommendation}</Text>
            </View>
            <Text style={tw`text-gray-600 mt-2`}>
              Out of all patients who were surveyed, {doctor.recommendation} of them recommend visiting this doctor
            </Text>
          </View>
        </View>
      </ScrollView>      {/* Bottom Buttons */}
      <View style={tw`flex-row p-4 border-t border-gray-200 bg-white`}>
        <TouchableOpacity
          style={tw`flex-1 border border-[#25a9e1] py-3 rounded-xl mr-2`}
          onPress={() => Linking.openURL('tel:+1234567890')}
        >
          <Text style={tw`text-[#25a9e1] text-center font-bold`}>Call Clinic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 bg-[#25a9e1] py-3 rounded-xl ml-2`}
          onPress={() => navigation.navigate('DoctorAvailability', {
            doctor: {
              name: doctor.name,
              specialty: doctor.specialty,
              clinic: doctor.clinics[0].name,
              image: doctor.image,
              fee: doctor.clinics[0].fee,
              experience: doctor.experience,
              rating: doctor.rating,
            },
            consultationType: doctor.type,
          })}
        >
          <Text style={tw`text-white text-center font-bold`}>
            {doctor.type === 'inclinic' ? 'Book Clinic Visit' : 'Book Video Consult'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorProfileScreen;
