import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react-native';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const AccountScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [editMode, setEditMode] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.com',
    phone: '+1 234 567 8900',
    specialization: 'Cardiologist',
    experience: '15 years',
    location: 'New York, NY',
    licenseNumber: 'MD123456789'
  });

  const handleSave = () => {
    setEditMode(false);
    Alert.alert('Success', 'Account information updated successfully!');
  };

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Account" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-2 text-center`}>Account Information</Text>
        <Text style={tw`text-base text-gray-500 mb-6 text-center`}>Manage your profile details</Text>

        {/* Profile Picture Section */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 items-center`}>
          <View style={tw`w-20 h-20 bg-[#202b6d] rounded-full items-center justify-center mb-3`}>
            <User size={40} color="#fff" />
          </View>
          <TouchableOpacity style={tw`bg-[#1d9be3] rounded-lg px-4 py-2`}>
            <Text style={tw`text-white font-medium`}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold text-[#202b6d]`}>Personal Information</Text>
            <TouchableOpacity 
              onPress={() => setEditMode(!editMode)}
              style={tw`bg-[#1d9be3] rounded-lg px-3 py-1`}
            >
              <Text style={tw`text-white font-medium`}>{editMode ? 'Cancel' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <User size={20} color="#202b6d" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Full Name</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#202b6d]`}
                value={doctorInfo.name}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, name: text})}
              />
            ) : (
              <Text style={tw`text-[#202b6d] font-bold ml-6`}>{doctorInfo.name}</Text>
            )}
          </View>

          {/* Email */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Mail size={20} color="#202b6d" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Email</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#202b6d]`}
                value={doctorInfo.email}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, email: text})}
                keyboardType="email-address"
              />
            ) : (
              <Text style={tw`text-[#202b6d] font-bold ml-6`}>{doctorInfo.email}</Text>
            )}
          </View>

          {/* Phone */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Phone size={20} color="#202b6d" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Phone</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#202b6d]`}
                value={doctorInfo.phone}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={tw`text-[#202b6d] font-bold ml-6`}>{doctorInfo.phone}</Text>
            )}
          </View>

          {/* Location */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <MapPin size={20} color="#202b6d" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Location</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#202b6d]`}
                value={doctorInfo.location}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, location: text})}
              />
            ) : (
              <Text style={tw`text-[#202b6d] font-bold ml-6`}>{doctorInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Professional Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Professional Information</Text>
          
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Specialization</Text>
            <Text style={tw`text-[#202b6d] font-bold text-base`}>{doctorInfo.specialization}</Text>
          </View>

          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Experience</Text>
            <Text style={tw`text-[#202b6d] font-bold text-base`}>{doctorInfo.experience}</Text>
          </View>

          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>License Number</Text>
            <Text style={tw`text-[#202b6d] font-bold text-base`}>{doctorInfo.licenseNumber}</Text>
          </View>
        </View>

        {editMode && (
          <TouchableOpacity
            style={tw`bg-[#202b6d] rounded-lg py-4 items-center mx-4 mb-4`}
            onPress={handleSave}
          >
            <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default AccountScreen;
