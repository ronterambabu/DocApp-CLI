import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

const HealthfeedScreen = () => {
  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Healthfeed" showSettings showNotifications />
      <View style={tw`flex-1 px-4 pt-6`}>
        <Text style={tw`text-2xl text-green-700 font-bold mb-4 text-center`}>Latest Healthfeed</Text>
        <View style={tw`w-full max-w-[480px] self-center`}> 
          <View style={tw`bg-green-100 rounded-2xl p-5 mb-4 shadow-sm`}> 
            <Text style={tw`text-green-700 font-bold text-lg mb-1`}>5 Tips for a Healthy Heart</Text>
            <Text style={tw`text-green-600 mb-2`}>Learn how to keep your heart healthy with these simple lifestyle changes.</Text>
            <Text style={tw`text-emerald-500 text-sm`}>Read More</Text>
          </View>
          <View style={tw`bg-green-100 rounded-2xl p-5 mb-4 shadow-sm`}> 
            <Text style={tw`text-green-700 font-bold text-lg mb-1`}>Managing Stress Effectively</Text>
            <Text style={tw`text-green-600 mb-2`}>Discover techniques to manage stress and improve your well-being.</Text>
            <Text style={tw`text-emerald-500 text-sm`}>Read More</Text>
          </View>
        </View>
        <Text style={tw`text-green-600 mt-8 text-center text-base`}>Stay updated with the latest health news and tips here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HealthfeedScreen;
