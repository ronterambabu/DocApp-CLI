// MyPaymentsScreen.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

export type RootStackParamList = {
  'Wallet': undefined;
}

type NavigationProps = NavigationProp<RootStackParamList>;

const MyPaymentsScreen = () => {
  const navigation = useNavigation<NavigationProps>();


  return (
    <PageLayout
      title="My payments"
      sectionTitle="Payment Options"
      headerBackgroundColor="#2E3192"
    >
      <TouchableOpacity
        style={tw`bg-white px-4 py-4 flex-row justify-between items-center`}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Wallet')}
        accessibilityLabel="View HealthCash balance"
        accessibilityRole="button"
      >
        <Text style={tw`text-base text-gray-800`}>HealthCash</Text>
        <Text style={tw`text-base text-gray-800`}>0.0</Text>
      </TouchableOpacity>
    </PageLayout>
  );
};

export default MyPaymentsScreen;
