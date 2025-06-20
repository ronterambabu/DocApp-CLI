import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { ArrowLeft, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ConsultationFeesScreen = () => {
  const navigation = useNavigation();
  const [inClinicEnabled, setInClinicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [inClinicFee, setInClinicFee] = useState('800');
  const [videoFee, setVideoFee] = useState('600');
  const [followUpEnabled, setFollowUpEnabled] = useState(true);
  const [followUpDays, setFollowUpDays] = useState('7');
  const [emergencyEnabled, setEmergencyEnabled] = useState(false);
  const [emergencyFee, setEmergencyFee] = useState('1200');

  const handleSave = () => {
    // Save logic here
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-[#202b6d] px-4 py-3`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-lg font-medium ml-4`}>Consultation Fees</Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        {/* In-Clinic Consultation */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-medium text-[#202b6d]`}>In-Clinic Consultation</Text>
            <Switch
              value={inClinicEnabled}
              onValueChange={setInClinicEnabled}
              trackColor={{ false: '#CBD5E1', true: '#bbd4fa' }}
              thumbColor={inClinicEnabled ? '#1d9be3' : '#94A3B8'}
            />
          </View>
          {inClinicEnabled && (
            <View>
              <Text style={tw`text-gray-600 mb-2`}>Consultation Fee (₹)</Text>
              <TextInput
                value={inClinicFee}
                onChangeText={setInClinicFee}
                keyboardType="numeric"
                style={tw`border border-gray-300 rounded-lg px-4 py-2 text-lg`}
                placeholder="Enter fee amount"
              />
            </View>
          )}
        </View>

        {/* Video Consultation */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-medium text-[#202b6d]`}>Video Consultation</Text>
            <Switch
              value={videoEnabled}
              onValueChange={setVideoEnabled}
              trackColor={{ false: '#CBD5E1', true: '#bbd4fa' }}
              thumbColor={videoEnabled ? '#1d9be3' : '#94A3B8'}
            />
          </View>
          {videoEnabled && (
            <View>
              <Text style={tw`text-gray-600 mb-2`}>Consultation Fee (₹)</Text>
              <TextInput
                value={videoFee}
                onChangeText={setVideoFee}
                keyboardType="numeric"
                style={tw`border border-gray-300 rounded-lg px-4 py-2 text-lg`}
                placeholder="Enter fee amount"
              />
            </View>
          )}
        </View>

        {/* Follow-up Settings */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View>
              <Text style={tw`text-lg font-medium text-[#202b6d]`}>Free Follow-up</Text>
              <Text style={tw`text-sm text-gray-500`}>Allow free follow-up consultations</Text>
            </View>
            <Switch
              value={followUpEnabled}
              onValueChange={setFollowUpEnabled}
              trackColor={{ false: '#CBD5E1', true: '#bbd4fa' }}
              thumbColor={followUpEnabled ? '#1d9be3' : '#94A3B8'}
            />
          </View>
          {followUpEnabled && (
            <View>
              <Text style={tw`text-gray-600 mb-2`}>Follow-up Period (Days)</Text>
              <TextInput
                value={followUpDays}
                onChangeText={setFollowUpDays}
                keyboardType="numeric"
                style={tw`border border-gray-300 rounded-lg px-4 py-2 text-lg`}
                placeholder="Enter number of days"
              />
            </View>
          )}
        </View>

        {/* Emergency Consultation */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View>
              <Text style={tw`text-lg font-medium text-[#202b6d]`}>Emergency Consultation</Text>
              <Text style={tw`text-sm text-gray-500`}>Allow emergency appointments at higher fee</Text>
            </View>
            <Switch
              value={emergencyEnabled}
              onValueChange={setEmergencyEnabled}
              trackColor={{ false: '#CBD5E1', true: '#bbd4fa' }}
              thumbColor={emergencyEnabled ? '#1d9be3' : '#94A3B8'}
            />
          </View>
          {emergencyEnabled && (
            <View>
              <Text style={tw`text-gray-600 mb-2`}>Emergency Fee (₹)</Text>
              <TextInput
                value={emergencyFee}
                onChangeText={setEmergencyFee}
                keyboardType="numeric"
                style={tw`border border-gray-300 rounded-lg px-4 py-2 text-lg`}
                placeholder="Enter emergency fee amount"
              />
            </View>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={tw`bg-[#202b6d] py-4 rounded-xl mb-6`}
          onPress={handleSave}
        >
          <Text style={tw`text-white text-center font-medium text-lg`}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ConsultationFeesScreen;
