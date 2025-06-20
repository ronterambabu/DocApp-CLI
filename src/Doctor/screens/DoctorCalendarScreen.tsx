import React from 'react';
import { View, Text } from 'react-native';
import DoctorHeader from '../components/DoctorHeader';

const DoctorCalendarScreen = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <DoctorHeader title="Calendar" />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: '#202b6d' }}>Calendar screen coming soon.</Text>
    </View>
  </View>
);

export default DoctorCalendarScreen;
