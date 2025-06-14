import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const name = 'John Doe';
  const email = 'john.doe@example.com';
  const phone = '123-456-7890';
  const gender = 'Male';
  const dob = '1990-01-01';
  const address = '123 Main Street, New York';

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <TouchableOpacity
          style={[tw`mb-2.5 p-2 self-start bg-white rounded-full shadow-sm mt-2.5`, { elevation: 2 }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#222B45" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold mb-5 text-center text-gray-800`}>
          Personal Details
        </Text>

        <View style={[tw`bg-white rounded-xl p-4`, { elevation: 1 }]}>
          <Text style={tw`text-sm text-gray-500 mt-2.5`}>Full Name</Text>
          <Text style={tw`text-base text-gray-900 mt-1 font-medium`}>{name}</Text>

          <Text style={tw`text-sm text-gray-500 mt-2.5`}>Email</Text>
          <Text style={tw`text-base text-gray-900 mt-1 font-medium`}>{email}</Text>

          <Text style={tw`text-sm text-gray-500 mt-2.5`}>Phone</Text>
          <Text style={tw`text-base text-gray-900 mt-1 font-medium`}>{phone}</Text>

          <Text style={tw`text-sm text-gray-500 mt-2.5`}>Gender</Text>
          <Text style={tw`text-base text-gray-900 mt-1 font-medium`}>{gender}</Text>

          <Text style={tw`text-sm text-gray-500 mt-2.5`}>Date of Birth</Text>
          <Text style={tw`text-base text-gray-900 mt-1 font-medium`}>{dob}</Text>

          <Text style={tw`text-sm text-gray-500 mt-2.5`}>Address</Text>
          <Text style={tw`text-base text-gray-900 mt-1 font-medium`}>{address}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;