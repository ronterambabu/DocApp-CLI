import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const CashlessSettingsScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [cashlessEnabled, setCashlessEnabled] = useState(true);
  const [autoSettlement, setAutoSettlement] = useState(false);
  const [instantRefunds, setInstantRefunds] = useState(true);

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Cashless Settings" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Payment Settings</Text>
        <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your cashless payment options</Text>

        {/* Payment Methods */}
        <View style={tw`bg-green-100 rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Payment Methods</Text>
          
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View>
              <Text style={tw`text-green-700 font-medium`}>Enable Cashless Payments</Text>
              <Text style={tw`text-green-600 text-sm`}>Accept digital payments from patients</Text>
            </View>
            <Switch
              value={cashlessEnabled}
              onValueChange={setCashlessEnabled}
              trackColor={{ false: '#bbf7d0', true: '#059669' }}
              thumbColor={cashlessEnabled ? '#16a34a' : '#bbf7d0'}
            />
          </View>

          <View style={tw`flex-row justify-between items-center mb-4`}>
            <View>
              <Text style={tw`text-green-700 font-medium`}>Auto Settlement</Text>
              <Text style={tw`text-green-600 text-sm`}>Automatically settle payments daily</Text>
            </View>
            <Switch
              value={autoSettlement}
              onValueChange={setAutoSettlement}
              trackColor={{ false: '#bbf7d0', true: '#059669' }}
              thumbColor={autoSettlement ? '#16a34a' : '#bbf7d0'}
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-green-700 font-medium`}>Instant Refunds</Text>
              <Text style={tw`text-green-600 text-sm`}>Process refunds immediately</Text>
            </View>
            <Switch
              value={instantRefunds}
              onValueChange={setInstantRefunds}
              trackColor={{ false: '#bbf7d0', true: '#059669' }}
              thumbColor={instantRefunds ? '#16a34a' : '#bbf7d0'}
            />
          </View>
        </View>

        {/* Bank Details */}
        <View style={tw`bg-green-100 rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Bank Details</Text>
          <TouchableOpacity 
            style={tw`bg-green-600 rounded-lg py-3 items-center mb-3`}
            onPress={() => Alert.alert('Bank Details', 'Add or update your bank account details')}
          >
            <Text style={tw`text-white font-bold`}>Update Bank Account</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`bg-emerald-500 rounded-lg py-3 items-center`}
            onPress={() => Alert.alert('Transaction History', 'View your payment history')}
          >
            <Text style={tw`text-white font-bold`}>View Transaction History</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={tw`bg-green-600 rounded-lg py-4 items-center mx-4 mb-4`}
          onPress={() => {
            Alert.alert('Success', 'Cashless settings saved successfully!');
          }}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CashlessSettingsScreen;
