import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../../types/navigation';
import DoctorHeader from '../../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const RayScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Ray" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-2 text-center`}>Ray Features</Text>
        <Text style={tw`text-base text-gray-500 mb-6 text-center`}>AI-powered diagnostic assistance</Text>

        {/* Feature Cards */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-2`}>AI Diagnostics</Text>
          <Text style={tw`text-gray-600 mb-3`}>Get AI-powered suggestions for patient diagnosis</Text>
          <TouchableOpacity style={tw`bg-[#202b6d] rounded-lg py-3 items-center`}>
            <Text style={tw`text-white font-bold`}>Enable Ray AI</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-2`}>Medical Imaging</Text>
          <Text style={tw`text-gray-600 mb-3`}>AI analysis of X-rays, CT scans, and MRIs</Text>
          <TouchableOpacity style={tw`bg-[#1d9be3] rounded-lg py-3 items-center`}>
            <Text style={tw`text-white font-bold`}>View Imaging Tools</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-2`}>Treatment Recommendations</Text>
          <Text style={tw`text-gray-600 mb-3`}>Evidence-based treatment suggestions</Text>
          <TouchableOpacity style={tw`bg-[#1d9be3] rounded-lg py-3 items-center`}>
            <Text style={tw`text-white font-bold`}>Access Recommendations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RayScreen;
