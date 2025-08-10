import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const PersonalDetailsScreen = () => {
  const name = 'John Doe';
  const email = 'john.doe@example.com';
  const phone = '123-456-7890';
  const gender = 'Male';
  const dob = '1990-01-01';
  const address = '123 Main Street, New York';

  return (
    <PageLayout
      title="Personal Details"
      headerBackgroundColor="bg-green-600"
      scrollable={true}
    >
      <View style={[tw`bg-green-50 rounded-xl p-4 mx-4`, { elevation: 1 }]}> 
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-green-700`}>Full Name</Text>
          <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{name}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-green-700`}>Email</Text>
          <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{email}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-green-700`}>Phone</Text>
          <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{phone}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-green-700`}>Gender</Text>
          <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{gender}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-green-700`}>Date of Birth</Text>
          <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{dob}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-green-700`}>Address</Text>
          <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{address}</Text>
        </View>
      </View>
    </PageLayout>
  );
};

export default PersonalDetailsScreen;