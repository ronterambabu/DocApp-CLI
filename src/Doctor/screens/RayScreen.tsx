import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const RayScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Ray" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Ray Features</Text>
        <Text style={tw`text-base text-green-600 mb-6 text-center`}>AI-powered diagnostic assistance</Text>

        {/* Feature Cards */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-2`}>AI Diagnostics</Text>
          <Text style={tw`text-green-600 mb-3`}>Get AI-powered suggestions for patient diagnosis</Text>
          <TouchableOpacity style={tw`bg-emerald-500 rounded-lg py-3 items-center`}>
            <Text style={tw`text-white font-bold`}>Enable Ray AI</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Medical Imaging</Text>
          <Text style={tw`text-green-600 mb-3`}>AI analysis of X-rays, CT scans, and MRIs</Text>
          <TouchableOpacity style={tw`bg-green-600 rounded-lg py-3 items-center`}>
            <Text style={tw`text-white font-bold`}>View Imaging Tools</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Treatment Recommendations</Text>
          <Text style={tw`text-green-600 mb-3`}>Evidence-based treatment suggestions</Text>
          <TouchableOpacity style={tw`bg-green-600 rounded-lg py-3 items-center`}>
            <Text style={tw`text-white font-bold`}>Access Recommendations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RayScreen;
