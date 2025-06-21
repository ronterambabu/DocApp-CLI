import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, TextInput } from 'react-native';
import { Video, Users, BadgeDollarSign, Calendar } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const ConsultationFeesScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isInClinicEnabled, setIsInClinicEnabled] = useState(true);
  const [editMode, setEditMode] = useState<'none' | 'video' | 'inClinic'>('none');
  const [videoRegular, setVideoRegular] = useState('800');
  const [videoFollowUp, setVideoFollowUp] = useState('500');
  const [clinicRegular, setClinicRegular] = useState('1000');
  const [clinicFollowUp, setClinicFollowUp] = useState('600');

  const fees = {
    video: {
      regular: 800,
      followUp: 500,
    },
    inClinic: {
      regular: 1000,
      followUp: 600,
    },
  };
  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Consultation Fees" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-2 text-center`}>Your Fees</Text>
        <Text style={tw`text-base text-gray-600 mb-6 text-center`}>Manage your consultation charges</Text>

        {/* Video Consultation Fees */}
        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Video size={24} color="#202b6d" />
              <Text style={tw`text-lg font-bold text-[#202b6d] ml-2`}>Video Consultation</Text>
            </View>
            <Switch
              value={isVideoEnabled}
              onValueChange={setIsVideoEnabled}
              trackColor={{ false: '#cbd5e1', true: '#bbd4fa' }}
              thumbColor={isVideoEnabled ? '#1d9be3' : '#94a3b8'}
            />
          </View>
          {editMode === 'video' ? (
            <View style={tw`bg-[#eaf1fb] p-4 rounded-xl mb-3`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-600`}>Regular Consultation</Text>
                <TextInput
                  style={tw`border border-[#202b6d] rounded px-2 py-1 w-20 text-right text-[#202b6d] font-bold bg-white`}
                  keyboardType="numeric"
                  value={videoRegular}
                  onChangeText={setVideoRegular}
                />
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-gray-600`}>Follow-up Visit</Text>
                <TextInput
                  style={tw`border border-[#202b6d] rounded px-2 py-1 w-20 text-right text-[#202b6d] font-bold bg-white`}
                  keyboardType="numeric"
                  value={videoFollowUp}
                  onChangeText={setVideoFollowUp}
                />
              </View>
              <View style={tw`flex-row justify-end mt-3`}>
                <TouchableOpacity
                  style={tw`px-4 py-2 bg-[#202b6d] rounded-full mr-2`}
                  onPress={() => {
                    setEditMode('none');
                  }}
                >
                  <Text style={tw`text-white font-bold`}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`px-4 py-2 bg-gray-200 rounded-full`}
                  onPress={() => {
                    setVideoRegular(fees.video.regular.toString());
                    setVideoFollowUp(fees.video.followUp.toString());
                    setEditMode('none');
                  }}
                >
                  <Text style={tw`text-[#202b6d] font-bold`}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={tw`bg-[#eaf1fb] p-4 rounded-xl mb-3`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-600`}>Regular Consultation</Text>
                <Text style={tw`text-[#202b6d] font-bold`}>₹{videoRegular}</Text>
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-gray-600`}>Follow-up Visit</Text>
                <Text style={tw`text-[#202b6d] font-bold`}>₹{videoFollowUp}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity style={tw`flex-row items-center justify-center mt-2`} onPress={() => setEditMode(editMode === 'video' ? 'none' : 'video')}>
            <BadgeDollarSign size={16} color="#1d9be3" />
            <Text style={tw`text-[#1d9be3] font-medium ml-1`}>{editMode === 'video' ? 'Close' : 'Edit Fees'}</Text>
          </TouchableOpacity>
        </View>

        {/* In-Clinic Consultation Fees */}
        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Users size={24} color="#202b6d" />
              <Text style={tw`text-lg font-bold text-[#202b6d] ml-2`}>In-Clinic Consultation</Text>
            </View>
            <Switch
              value={isInClinicEnabled}
              onValueChange={setIsInClinicEnabled}
              trackColor={{ false: '#cbd5e1', true: '#bbd4fa' }}
              thumbColor={isInClinicEnabled ? '#1d9be3' : '#94a3b8'}
            />
          </View>
          {editMode === 'inClinic' ? (
            <View style={tw`bg-[#eaf1fb] p-4 rounded-xl mb-3`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-600`}>Regular Consultation</Text>
                <TextInput
                  style={tw`border border-[#202b6d] rounded px-2 py-1 w-20 text-right text-[#202b6d] font-bold bg-white`}
                  keyboardType="numeric"
                  value={clinicRegular}
                  onChangeText={setClinicRegular}
                />
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-gray-600`}>Follow-up Visit</Text>
                <TextInput
                  style={tw`border border-[#202b6d] rounded px-2 py-1 w-20 text-right text-[#202b6d] font-bold bg-white`}
                  keyboardType="numeric"
                  value={clinicFollowUp}
                  onChangeText={setClinicFollowUp}
                />
              </View>
              <View style={tw`flex-row justify-end mt-3`}>
                <TouchableOpacity
                  style={tw`px-4 py-2 bg-[#202b6d] rounded-full mr-2`}
                  onPress={() => {
                    setEditMode('none');
                  }}
                >
                  <Text style={tw`text-white font-bold`}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`px-4 py-2 bg-gray-200 rounded-full`}
                  onPress={() => {
                    setClinicRegular(fees.inClinic.regular.toString());
                    setClinicFollowUp(fees.inClinic.followUp.toString());
                    setEditMode('none');
                  }}
                >
                  <Text style={tw`text-[#202b6d] font-bold`}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={tw`bg-[#eaf1fb] p-4 rounded-xl mb-3`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-600`}>Regular Consultation</Text>
                <Text style={tw`text-[#202b6d] font-bold`}>₹{clinicRegular}</Text>
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-gray-600`}>Follow-up Visit</Text>
                <Text style={tw`text-[#202b6d] font-bold`}>₹{clinicFollowUp}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity style={tw`flex-row items-center justify-center mt-2`} onPress={() => setEditMode(editMode === 'inClinic' ? 'none' : 'inClinic')}>
            <BadgeDollarSign size={16} color="#1d9be3" />
            <Text style={tw`text-[#1d9be3] font-medium ml-1`}>{editMode === 'inClinic' ? 'Close' : 'Edit Fees'}</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Settings */}
        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Additional Settings</Text>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-2`}>
            <Text style={tw`text-gray-600`}>Cancellation Policy</Text>
            <Calendar size={20} color="#202b6d" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`mt-2 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
          activeOpacity={0.85}
          onPress={() => {
            Alert.alert('Changes Saved', 'Your consultation fees have been updated.', [{ 
              text: 'OK',
              onPress: () => navigation.goBack()
            }]);
          }}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ConsultationFeesScreen;
