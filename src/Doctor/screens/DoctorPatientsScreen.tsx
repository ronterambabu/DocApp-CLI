import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

const patients = [
  {
    id: 1,
    name: 'John Smith',
    age: 34,
    gender: 'Male',
    lastVisit: '2025-06-18',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    notes: 'Diabetes, Hypertension',
  },
  {
    id: 2,
    name: 'Priya Singh',
    age: 28,
    gender: 'Female',
    lastVisit: '2025-06-20',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    notes: 'Annual Checkup',
  },
  {
    id: 3,
    name: 'Alex Kim',
    age: 41,
    gender: 'Male',
    lastVisit: '2025-06-15',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    notes: 'Lab Results Discussion',
  },
];

const DoctorPatientsScreen = () => (
  <View style={tw`flex-1 bg-[#f8fafc]`}>
    <DoctorHeader title="Patients" showSettings showNotifications />
    <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
      <Text style={tw`text-2xl font-bold text-[#202b6d] mb-4 text-center`}>Your Patients</Text>
      <Text style={tw`text-base text-gray-600 mb-6 text-center`}>View and manage your patient list and recent visits.</Text>
      {patients.map((patient) => (
        <View key={patient.id} style={tw`bg-white rounded-2xl p-5 mb-5 shadow-sm flex-row items-center`}>
          <Image source={{ uri: patient.avatar }} style={tw`w-16 h-16 rounded-full mr-4`} />
          <View style={tw`flex-1`}>
            <Text style={tw`text-[#202b6d] font-semibold text-lg`}>{patient.name}</Text>
            <Text style={tw`text-gray-500 text-sm mt-1`}>Age: {patient.age} | {patient.gender}</Text>
            <Text style={tw`text-gray-400 text-xs mt-1`}>Last Visit: {patient.lastVisit}</Text>
            <Text style={tw`text-gray-500 text-xs mt-1`}>Notes: {patient.notes}</Text>
          </View>
          <TouchableOpacity style={tw`ml-2 bg-[#1d9be3] rounded-full px-4 py-2`} activeOpacity={0.7}>
            <Text style={tw`text-white font-bold text-xs`}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={tw`mt-8 items-center`}>
        <Text style={tw`text-gray-400 text-sm`}>More patient features coming soon.</Text>
      </View>
    </ScrollView>
  </View>
);

export default DoctorPatientsScreen;
