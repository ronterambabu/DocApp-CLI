import React, { useRef, useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/screens/contexts/UserContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Footer from './src/screens/(tabs)/Footer';
import { StatusBar, View, Platform } from 'react-native';
import { LoadingProvider } from './src/components/LoadingOverlay';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// Import all screens referenced in navigation
import OnboardingScreen from './src/screens/onboarding';
import SearchEverything from './src/screens/SearchEverything';
import VideoCallScreen from './src/screens/VideoCallScreen';
import HomeScreen from './src/screens/(tabs)/index';
import AllHospitalsScreen from './src/screens/(tabs)/AllHospitalsScreen';
import AllPharmaciesScreen from './src/screens/(tabs)/AllPharmaciesScreen';
import ProfileScreen from './src/screens/(tabs)/profile';

import NotificationScreen from './src/screens/(tabs)/Notification';
import AllSpecialtiesScreen from './src/screens/(tabs)/AllSpecialtiesScreen';
import LabTestCategoriesScreen from './src/screens/(tabs)/LabTestCategoriesScreen';
import PharmacyTestCategoriesScreen from './src/screens/(tabs)/pharmacytestcategories';
import ConsultOptionsScreen from './src/screens/ConsultOptionsScreen';
import HospitalDetailsScreen from './src/screens/(tabs)/HospitalDetailsScreen';
import PharmacyDetailsScreen from './src/screens/(tabs)/PharmacyDetailsScreen';
import VideoConsultationScreen from './src/screens/VideoConsultationScreen';
import AppointmentSuccessScreen from './src/screens/appointment-success';
import AppointmentsScreen from './src/screens/(tabs)/appointments';
import NotFoundScreen from './src/screens/+not-found';
// (auth) screens
import AuthLayout from './src/screens/(auth)/_layout';
import SignupScreen from './src/screens/(auth)/signup';
import LoginScreen from './src/screens/(auth)/login';
import DoctorLoginScreen from './src/screens/(auth)/doctor-login';
import CompleteProfileScreen from './src/screens/(auth)/CompleteProfile';
// (tabs) screens
import TabsLayout from './src/screens/(tabs)/_layout';
import VideoConsultationTab from './src/screens/(tabs)/videoconsultation';
import TestBookingScreen from './src/screens/(tabs)/TestBooking';
import SettingsScreen from './src/screens/(tabs)/Settings';
import PrivacySecurityScreen from './src/screens/(tabs)/PrivacySecurity';
import PharmacyScreen from './src/screens/(tabs)/pharmacy';
import PersonalDetailsScreen from './src/screens/(tabs)/PersonalDetails';
import PaymentMethodsScreen from './src/screens/(tabs)/PaymentMethods';
import MedicalRecordsScreen from './src/screens/(tabs)/MedicalRecords';
import LabTestsListScreen from './src/screens/(tabs)/LabTestsListScreen';
import LabTestScreen from './src/screens/(tabs)/LabTestScreen';
import DoctorAvailabilityScreen from './src/screens/(tabs)/DoctorAvailability';
import DoctorPopularScreen from './src/screens/(tabs)/DoctorPopular';
import DoctorsScreen from './src/screens/(tabs)/doctors';
import EditProfilePageScreen from './src/screens/(tabs)/EditProfilepage';
import EmergencyServicesScreen from './src/screens/(tabs)/EmergencyServices';
import HelpCenterScreen from './src/screens/(tabs)/HelpCenter';
import MyPaymentsScreen from '././src/screens/(tabs)/PaymentMethods';
import WalletScreen from '././src/screens/(tabs)/wallet';
// doctor dynamic screen
import DoctorScreen from './src/screens/doctor/[id]';

const Stack = createStackNavigator();

const AUTH_SCREENS = [
  'AuthLayout', 'Signup', 'Login', 'DoctorLogin', 'CompleteProfile'
];

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);

  const handleStateChange = () => {
    const route = navigationRef.current?.getCurrentRoute?.();
    setCurrentRoute(route?.name);
  };

  return (
    <UserProvider>
      <LoadingProvider>
        <SafeAreaProvider>          <View style={{ flex: 1, backgroundColor: '#202b6d' }}>
            <StatusBar
              backgroundColor="#202b6d"
              barStyle="light-content"
              translucent={true}
            />
            <NavigationContainer
              ref={navigationRef}
              onReady={handleStateChange}
              onStateChange={handleStateChange}
            >
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                  headerLeft: () => null,
                  cardStyle: { backgroundColor: '#f3f4f6' },
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                />
                <Stack.Screen name="AllHospitals" component={AllHospitalsScreen} />
                <Stack.Screen name="AllPharmacies" component={AllPharmaciesScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Searcheverything" component={SearchEverything} />
                <Stack.Screen name="VideoCall" component={VideoCallScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />

                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="AllSpecialtiesScreen" component={AllSpecialtiesScreen} />
                <Stack.Screen name="LabTestCategoriesScreen" component={LabTestCategoriesScreen} />
                <Stack.Screen name="pharmacytestcategories" component={PharmacyTestCategoriesScreen} />
                <Stack.Screen name="ConsultOptionsScreen" component={ConsultOptionsScreen} />
                <Stack.Screen name="HospitalDetailsScreen" component={HospitalDetailsScreen} />
                <Stack.Screen name="PharmacyDetailsScreen" component={PharmacyDetailsScreen} />
                <Stack.Screen name="VideoConsultationScreen" component={VideoConsultationScreen} />
                <Stack.Screen name="AppointmentSuccess" component={AppointmentSuccessScreen} />
                <Stack.Screen name="Appointments" component={AppointmentsScreen} />
                {/* Not Found Screen */}
                <Stack.Screen name="NotFound" component={NotFoundScreen} />
                {/* (auth) screens */}
                <Stack.Screen name="AuthLayout" component={AuthLayout} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="DoctorLogin" component={DoctorLoginScreen} />
                <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
                {/* (tabs) screens */}
                <Stack.Screen name="TabsLayout" component={TabsLayout} />
                <Stack.Screen name="VideoConsultationTab" component={VideoConsultationTab} />
                <Stack.Screen name="TestBooking" component={TestBookingScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
                <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
                <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
                <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
                <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} />
                <Stack.Screen name="LabTestsList" component={LabTestsListScreen} />
                <Stack.Screen name="LabTest" component={LabTestScreen} />
                <Stack.Screen name="DoctorAvailability" component={DoctorAvailabilityScreen} />
                <Stack.Screen name="DoctorPopular" component={DoctorPopularScreen} />
                <Stack.Screen name="Doctors" component={DoctorsScreen} />
                <Stack.Screen name="EditProfilePage" component={EditProfilePageScreen} />
                <Stack.Screen name="EmergencyServices" component={EmergencyServicesScreen} />
                <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
                <Stack.Screen name="MyPayments" component={MyPaymentsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerShown: false }} />
                {/* doctor dynamic screen */}
                <Stack.Screen name="Doctor" component={DoctorScreen} />
              </Stack.Navigator>
              {currentRoute && !AUTH_SCREENS.includes(currentRoute) && <Footer />}
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </LoadingProvider>
    </UserProvider>
  );
}


