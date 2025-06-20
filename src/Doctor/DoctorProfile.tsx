import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Edit,
  MapPin,
  Clock,
  Star,
  Award,
  Calendar,
  ThumbsUp,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const DoctorProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-[#202b6d] px-4 py-3`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-lg font-medium ml-4`}>Profile</Text>
          <TouchableOpacity 
            style={tw`ml-auto`}
            onPress={() => navigation.navigate('EditDoctorProfile')}
          >
            <Edit size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={tw`bg-white p-4`}>
          <View style={tw`flex-row`}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={tw`w-24 h-24 rounded-2xl`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-[#202b6d] text-xl font-bold`}>Dr. John Doe</Text>
              <Text style={tw`text-[#1d9be3] text-base`}>Cardiologist</Text>
              <View style={tw`flex-row items-center mt-2`}>
                <MapPin size={16} color="#6B7280" />
                <Text style={tw`text-gray-600 ml-1`}>Mumbai, Maharashtra</Text>
              </View>
              <View style={tw`flex-row items-center mt-1`}>
                <Clock size={16} color="#6B7280" />
                <Text style={tw`text-gray-600 ml-1`}>10+ Years Experience</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={tw`flex-row justify-between mt-6 bg-[#bbd4fa] p-4 rounded-xl`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-[#202b6d] text-lg font-bold`}>4.8</Text>
              <View style={tw`flex-row items-center`}>
                <Star size={14} color="#202b6d" />
                <Text style={tw`text-[#202b6d] ml-1`}>Rating</Text>
              </View>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-[#202b6d] text-lg font-bold`}>15K+</Text>
              <View style={tw`flex-row items-center`}>
                <ThumbsUp size={14} color="#202b6d" />
                <Text style={tw`text-[#202b6d] ml-1`}>Reviews</Text>
              </View>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-[#202b6d] text-lg font-bold`}>10+</Text>
              <View style={tw`flex-row items-center`}>
                <Award size={14} color="#202b6d" />
                <Text style={tw`text-[#202b6d] ml-1`}>Years</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        <View style={tw`mt-4 px-4`}>
          <TouchableOpacity 
            style={tw`bg-white p-4 rounded-xl mb-3 shadow-sm`}
            onPress={() => navigation.navigate('PersonalInfo')}
          >
            <Text style={tw`text-[#202b6d] font-medium text-lg mb-1`}>Personal Information</Text>
            <Text style={tw`text-gray-600`}>Update your personal details and credentials</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`bg-white p-4 rounded-xl mb-3 shadow-sm`}
            onPress={() => navigation.navigate('Specializations')}
          >
            <Text style={tw`text-[#202b6d] font-medium text-lg mb-1`}>Specializations</Text>
            <Text style={tw`text-gray-600`}>Manage your specialties and expertise</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`bg-white p-4 rounded-xl mb-3 shadow-sm`}
            onPress={() => navigation.navigate('Availability')}
          >
            <Text style={tw`text-[#202b6d] font-medium text-lg mb-1`}>Consultation Hours</Text>
            <Text style={tw`text-gray-600`}>Set your availability and consultation timings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`bg-white p-4 rounded-xl mb-3 shadow-sm`}
            onPress={() => navigation.navigate('Certifications')}
          >
            <Text style={tw`text-[#202b6d] font-medium text-lg mb-1`}>Certifications</Text>
            <Text style={tw`text-gray-600`}>Add your qualifications and certificates</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`bg-white p-4 rounded-xl mb-3 shadow-sm`}
            onPress={() => navigation.navigate('ConsultationFees')}
          >
            <Text style={tw`text-[#202b6d] font-medium text-lg mb-1`}>Consultation Fees</Text>
            <Text style={tw`text-gray-600`}>Manage your consultation charges</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfileScreen;
