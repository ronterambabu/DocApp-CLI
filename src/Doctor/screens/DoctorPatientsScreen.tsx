import React from 'react';
import { View, Text } from 'react-native';
import DoctorHeader from '../components/DoctorHeader';

const DoctorPatientsScreen = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <DoctorHeader title="Patients" />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: '#202b6d' }}>Patients screen coming soon.</Text>
    </View>
  </View>
);

export default DoctorPatientsScreen;
