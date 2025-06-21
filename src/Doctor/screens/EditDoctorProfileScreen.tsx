import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Camera, Mail, Phone, MapPin, GraduationCap } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const EditDoctorProfileScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [formData, setFormData] = useState({
    fullName: 'Dr. John Doe',
    email: 'dr.john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    education: 'MD - Cardiology, AIIMS Delhi',
    registrationNumber: 'MCI-12345',
    additionalQualification: '',
  });

  const handleSave = () => {
    Alert.alert('Success', 'Profile information updated successfully', [
      { text: 'OK', onPress: () => navigation.navigate('PersonalInfo') }
    ]);
  };
  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Edit Profile" showSettings showNotifications />
      
      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        {/* Profile Picture Section */}
        <View style={tw`items-center mb-6`}>
          <View style={tw`relative`}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={tw`w-24 h-24 rounded-full`}
            />
            <TouchableOpacity 
              style={tw`absolute bottom-0 right-0 bg-[#1d9be3] p-2 rounded-full`}
              onPress={() => Alert.alert('Upload Photo', 'Photo upload functionality will be implemented')}
            >
              <Camera size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={tw`mt-2 text-gray-600`}>Tap to change profile picture</Text>
        </View>        {/* Form Fields */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Full Name</Text>
          <TextInput
            style={tw`bg-white p-4 rounded-xl text-gray-800 border border-gray-200`}
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Email</Text>
          <View style={tw`flex-row items-center bg-white p-4 rounded-xl border border-gray-200`}>
            <Mail size={20} color="#6B7280" />
            <TextInput
              style={tw`flex-1 ml-2 text-gray-800`}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Phone Number</Text>
          <View style={tw`flex-row items-center bg-white p-4 rounded-xl border border-gray-200`}>
            <Phone size={20} color="#6B7280" />
            <TextInput
              style={tw`flex-1 ml-2 text-gray-800`}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Location</Text>
          <View style={tw`flex-row items-center bg-white p-4 rounded-xl border border-gray-200`}>
            <MapPin size={20} color="#6B7280" />
            <TextInput
              style={tw`flex-1 ml-2 text-gray-800`}
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />
          </View>
        </View>

        {/* Education, Additional Qualification fields (both non-editable) */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Education</Text>
          <View style={tw`flex-row items-center bg-white p-4 rounded-xl border border-gray-200`}>
            <GraduationCap size={20} color="#6B7280" />
            <TextInput
              style={tw`flex-1 ml-2 text-gray-800`}
              value={formData.education}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-600 mb-2`}>Additional Qualification</Text>
          <View style={tw`flex-row items-center bg-white p-4 rounded-xl border border-gray-200`}>
            <GraduationCap size={20} color="#6B7280" />
            <TextInput
              style={tw`flex-1 ml-2 text-gray-800`}
              value={formData.additionalQualification || ''}
              editable={false}
              selectTextOnFocus={false}
              placeholder="Not Provided"
            />
          </View>
        </View>

        <TouchableOpacity
          style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditDoctorProfileScreen;
