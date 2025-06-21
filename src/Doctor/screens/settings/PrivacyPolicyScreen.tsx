import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../../types/navigation';
import DoctorHeader from '../../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Privacy Policy" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-4 text-center`}>Privacy Policy</Text>
        <Text style={tw`text-sm text-gray-500 mb-6 text-center`}>Last updated: June 21, 2025</Text>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Information We Collect</Text>
          <Text style={tw`text-gray-700 leading-6 mb-3`}>
            We collect information you provide directly to us, such as when you create or modify your account, 
            request customer support, or otherwise communicate with us.
          </Text>
          <Text style={tw`text-gray-700 leading-6`}>
            This includes personal information like your name, email address, phone number, and professional credentials.
          </Text>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>How We Use Your Information</Text>
          <Text style={tw`text-gray-700 leading-6 mb-3`}>
            We use the information we collect to:
          </Text>
          <Text style={tw`text-gray-700 leading-6 ml-4`}>
            • Provide, maintain, and improve our services{'\n'}
            • Process transactions and send related information{'\n'}
            • Send technical notices and support messages{'\n'}
            • Communicate with you about products, services, and events
          </Text>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Information Sharing</Text>
          <Text style={tw`text-gray-700 leading-6`}>
            We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, 
            except as described in this privacy policy or as required by law.
          </Text>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Data Security</Text>
          <Text style={tw`text-gray-700 leading-6`}>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction.
          </Text>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Your Rights</Text>
          <Text style={tw`text-gray-700 leading-6`}>
            You have the right to access, update, or delete your personal information. 
            You may also opt out of certain communications from us.
          </Text>
        </View>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Contact Us</Text>
          <Text style={tw`text-gray-700 leading-6`}>
            If you have any questions about this Privacy Policy, please contact us at privacy@docapp.com 
            or through the support section in the app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
