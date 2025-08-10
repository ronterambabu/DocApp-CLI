import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import { User, Mail, Phone, MapPin, Calendar, User2 } from 'lucide-react-native';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const AccountScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [editMode, setEditMode] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: 'Dr. premchandu',
    email: 'premmekiri22@gmail.com',
    phone: '9381197503',
    dateOfBirth: '2002-02-22',
    gender: 'Male',
    specialization: 'Cardiologist',
    licenseNumber: 'dah32819cdb',
    experience: '2 years',
    city: 'Hyderabad',
    pincode: '500018',
    street: 'madhapur',
    deliveryName: 'prem',
    deliveryPNo: '1234567890',
    state: 'Telangana',
  });

  const handleSave = () => {
    setEditMode(false);
    // TODO: Implement API calls to update profile at https://landing.docapp.co.in/api/auth/profile/complete/doctor
    // and address at https://landing.docapp.co.in/api/address/addAddress with HTTP-only cookie authentication
    Alert.alert('Success', 'Account information updated successfully!');
  };

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Account" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Account Information</Text>
        <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your profile details</Text>

        {/* Profile Picture Section */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 items-center`}>
          <View style={tw`w-20 h-20 bg-emerald-500 rounded-full items-center justify-center mb-3`}>
            <User size={40} color="#fff" />
          </View>
          <TouchableOpacity style={tw`bg-emerald-500 rounded-lg px-4 py-2`}>
            <Text style={tw`text-white font-medium`}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold text-green-700`}>Personal Information</Text>
            <TouchableOpacity 
              onPress={() => setEditMode(!editMode)}
              style={tw`bg-emerald-500 rounded-lg px-3 py-1`}
            >
              <Text style={tw`text-white font-medium`}>{editMode ? 'Cancel' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          {/* Name (Fixed) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <User size={20} color="#16a34a" />
              <Text style={tw`text-green-600 font-medium ml-2`}>Full Name</Text>
            </View>
            <Text style={tw`text-green-700 font-bold ml-6`}>{doctorInfo.name}</Text>
          </View>

          {/* Email (Fixed) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Mail size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Email</Text>
            </View>
            <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.email}</Text>
          </View>

          {/* Phone (Fixed) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Phone size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Phone</Text>
            </View>
            <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.phone}</Text>
          </View>

          {/* Date of Birth (Editable) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Calendar size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Date of Birth</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.dateOfBirth}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, dateOfBirth: text})}
                placeholder="YYYY-MM-DD"
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.dateOfBirth}</Text>
            )}
          </View>

          {/* Gender (Editable) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <User2 size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Gender</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.gender}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, gender: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.gender}</Text>
            )}
          </View>
        </View>

        {/* Professional Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#16a34a] mb-4`}>Professional Information</Text>

          {/* Specialization (Editable) */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Specialization</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.specialization}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, specialization: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.specialization}</Text>
            )}
          </View>

          {/* Experience (Editable) */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Experience</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.experience}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, experience: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.experience}</Text>
            )}
          </View>

          {/* License Number (Editable) */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>License Number</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.licenseNumber}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, licenseNumber: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.licenseNumber}</Text>
            )}
          </View>
        </View>

        {/* Address Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#16a34a] mb-4`}>Address Information</Text>

          {/* Street */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Street</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.street}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, street: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.street}</Text>
            )}
          </View>

          {/* City */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>City</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.city}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, city: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.city}</Text>
            )}
          </View>

          {/* State */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>State</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.state}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, state: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.state}</Text>
            )}
          </View>

          {/* Pincode */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Pincode</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.pincode}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, pincode: text})}
                keyboardType="numeric"
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.pincode}</Text>
            )}
          </View>

          {/* Delivery Name */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Delivery Name</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.deliveryName}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, deliveryName: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.deliveryName}</Text>
            )}
          </View>

          {/* Delivery Phone Number */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Delivery Phone Number</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.deliveryPNo}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, deliveryPNo: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.deliveryPNo}</Text>
            )}
          </View>
        </View>

        {editMode && (
          <TouchableOpacity
            style={tw`bg-[#10b981] rounded-lg py-4 items-center mx-4 mb-4`}
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