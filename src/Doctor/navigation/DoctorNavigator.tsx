import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import DoctorSettingsScreen from '../screens/DoctorSettingsScreen';
import DoctorNotificationsScreen from '../screens/DoctorNotificationsScreen';
import DoctorReachScreen from '../screens/DoctorReachScreen';
import PatientStoriesScreen from '../screens/PatientStoriesScreen';
import DoctorConsultScreen from '../screens/DoctorConsultScreen';
import HealthfeedScreen from '../screens/HealthfeedScreen';
import DoctorEarningsScreen from '../screens/DoctorEarningsScreen';

import { View, Text } from 'react-native';

// Placeholder screen component while we create the real ones
const createPlaceholderScreen = (title: string) => () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <Text style={{ fontSize: 18, color: '#202b6d' }}>{title}</Text>
  </View>
);

const DoctorPrimeScreen = createPlaceholderScreen('Doctor Prime');
const DoctorReportsScreen = createPlaceholderScreen('Reports');
const DoctorCalendarScreen = createPlaceholderScreen('Calendar');
const DoctorPatientsScreen = createPlaceholderScreen('Patients');
const EditDoctorProfileScreen = createPlaceholderScreen('Edit Profile');
const PersonalInfoScreen = createPlaceholderScreen('Personal Info');
const SpecializationsScreen = createPlaceholderScreen('Specializations');
const AvailabilityScreen = createPlaceholderScreen('Availability');
const CertificationsScreen = createPlaceholderScreen('Certifications');
const ConsultationFeesScreen = createPlaceholderScreen('Consultation Fees');
const RayScreen = createPlaceholderScreen('Ray');
const AccountScreen = createPlaceholderScreen('Account');
const CashlessSettingsScreen = createPlaceholderScreen('Cashless Settings');
const PrivacyPolicyScreen = createPlaceholderScreen('Privacy Policy');
const OpenSourceLicensesScreen = createPlaceholderScreen('Open Source Licenses');

const Stack = createNativeStackNavigator<DoctorStackParamList>();

const DoctorNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >      <Stack.Screen name="DoctorDashboard" component={DoctorDashboardScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="DoctorSettings" component={DoctorSettingsScreen} />
      <Stack.Screen name="DoctorNotifications" component={DoctorNotificationsScreen} />
      <Stack.Screen name="DoctorReach" component={DoctorReachScreen} />
      <Stack.Screen name="PatientStories" component={PatientStoriesScreen} />
      <Stack.Screen name="DoctorConsult" component={DoctorConsultScreen} />
      <Stack.Screen name="Healthfeed" component={HealthfeedScreen} />
      <Stack.Screen name="DoctorEarnings" component={DoctorEarningsScreen} />
      <Stack.Screen name="DoctorPrime" component={DoctorPrimeScreen} />
      <Stack.Screen name="DoctorReports" component={DoctorReportsScreen} />
      <Stack.Screen name="DoctorCalendar" component={DoctorCalendarScreen} />
      <Stack.Screen name="DoctorPatients" component={DoctorPatientsScreen} />
      <Stack.Screen name="EditDoctorProfile" component={EditDoctorProfileScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="Specializations" component={SpecializationsScreen} />
      <Stack.Screen name="Availability" component={AvailabilityScreen} />
      <Stack.Screen name="Certifications" component={CertificationsScreen} />
      <Stack.Screen name="ConsultationFees" component={ConsultationFeesScreen} />
      <Stack.Screen name="Ray" component={RayScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="CashlessSettings" component={CashlessSettingsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="OpenSourceLicenses" component={OpenSourceLicensesScreen} />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
