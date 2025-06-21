import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Camera, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const PersonalInfoScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  const personalInfo = {
    email: 'dr.john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    experience: '10+ Years',
    education: 'MD - Cardiology, AIIMS Delhi',
    awards: ['Best Cardiologist 2024', 'Healthcare Excellence Award'],
    registrationNumber: 'MCI-12345',
  };
  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Personal Information" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        <View style={tw`items-center mb-6`}>
          <View style={tw`relative`}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={tw`w-24 h-24 rounded-full`}
            />
            <TouchableOpacity
              style={tw`absolute bottom-0 right-0 bg-[#1d9be3] p-2 rounded-full`}
              activeOpacity={0.7}
            >
              <Camera size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={tw`text-[#202b6d] text-xl font-bold mt-3`}>Dr. John Doe</Text>
          <Text style={tw`text-[#1d9be3] text-base`}>Cardiologist</Text>
        </View>

        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Contact Information</Text>
          <View style={tw`flex-row items-center mb-3`}>
            <Mail size={20} color="#6B7280" />
            <Text style={tw`text-gray-600 ml-3`}>{personalInfo.email}</Text>
          </View>
          <View style={tw`flex-row items-center mb-3`}>
            <Phone size={20} color="#6B7280" />
            <Text style={tw`text-gray-600 ml-3`}>{personalInfo.phone}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <MapPin size={20} color="#6B7280" />
            <Text style={tw`text-gray-600 ml-3`}>{personalInfo.address}</Text>
          </View>
        </View>

        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Professional Details</Text>
          <View style={tw`flex-row items-center mb-3`}>
            <Briefcase size={20} color="#6B7280" />
            <Text style={tw`text-gray-600 ml-3`}>{personalInfo.experience}</Text>
          </View>
          <View style={tw`flex-row items-center mb-3`}>
            <GraduationCap size={20} color="#6B7280" />
            <Text style={tw`text-gray-600 ml-3`}>{personalInfo.education}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Award size={20} color="#6B7280" />
            <View style={tw`flex-1 ml-3`}>
              {personalInfo.awards.map((award, idx) => (
                <Text key={idx} style={tw`text-gray-600 mb-1`}>• {award}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Registration</Text>
          <Text style={tw`text-gray-600`}>MCI Registration: {personalInfo.registrationNumber}</Text>
        </View>        <TouchableOpacity
          style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('EditDoctorProfile')}
        >
          <Text style={tw`text-white font-bold text-base`}>Edit Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;
