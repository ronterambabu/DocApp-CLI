import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { BadgeDollarSign } from 'lucide-react-native';
import tw from 'twrnc';

const DoctorEarningsScreen = () => {
  const earnings = {
    today: 5000,
    thisWeek: 35000,
    thisMonth: 150000,
    lastMonth: 145000,
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`bg-[#202b6d] p-4`}>
        <Text style={tw`text-white text-xl font-bold`}>Earnings</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-2`}>Overview</Text>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-gray-600`}>Today's Earnings</Text>
              <Text style={tw`text-2xl font-bold text-[#202b6d]`}>₹{earnings.today}</Text>
            </View>
            <BadgeDollarSign size={32} color="#1d9be3" />
          </View>
        </View>

        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Statistics</Text>
          <View style={tw`space-y-4`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>This Week</Text>
              <Text style={tw`text-[#202b6d] font-bold`}>₹{earnings.thisWeek}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>This Month</Text>
              <Text style={tw`text-[#202b6d] font-bold`}>₹{earnings.thisMonth}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Last Month</Text>
              <Text style={tw`text-[#202b6d] font-bold`}>₹{earnings.lastMonth}</Text>
            </View>
          </View>
        </View>

        <View style={tw`bg-white rounded-xl p-4 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Recent Transactions</Text>
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={tw`border-b border-gray-100 pb-3 mb-3 ${index === 2 ? 'border-b-0 mb-0 pb-0' : ''}`}>
              <View style={tw`flex-row justify-between items-center`}>
                <View>
                  <Text style={tw`text-[#202b6d] font-medium`}>Patient Consultation</Text>
                  <Text style={tw`text-gray-500 text-sm`}>John Doe • 2:30 PM</Text>
                </View>
                <Text style={tw`text-[#202b6d] font-bold`}>₹1,500</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorEarningsScreen;
