import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';

const DoctorsPrimeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <DoctorHeader title="Doctor's Prime" showSettings showNotifications />
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <View style={{ width: '100%', maxWidth: 600, backgroundColor: '#fff', borderRadius: 18, padding: 24, shadowColor: '#202b6d', shadowOpacity: 0.10, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 26, color: '#202b6d', fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
            Welcome to Doctor's Prime
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 18, textAlign: 'center' }}>
            Your gateway to premium healthcare insights, tips, and stories from top medical professionals.
          </Text>
          <Text style={{ fontSize: 20, color: '#1d9be3', fontWeight: 'bold', marginBottom: 10 }}>
            Featured Blog: The Power of Preventive Care
          </Text>
          <Text style={{ color: '#444', fontSize: 15, marginBottom: 10 }}>
            Preventive care is the cornerstone of a healthy life. By focusing on regular checkups, screenings, and healthy lifestyle choices, you can avoid many chronic diseases and detect issues early. In this blog, we explore:
          </Text>
          <Text style={{ color: '#202b6d', fontWeight: 'bold', marginBottom: 6 }}>
            • Why annual health checkups matter
          </Text>
          <Text style={{ color: '#202b6d', fontWeight: 'bold', marginBottom: 6 }}>
            • The role of nutrition and exercise
          </Text>
          <Text style={{ color: '#202b6d', fontWeight: 'bold', marginBottom: 6 }}>
            • How to manage stress for better health
          </Text>
          <Text style={{ color: '#444', fontSize: 15, marginTop: 10 }}>
            Remember, prevention is always better than cure. Stay tuned for more expert blogs and tips on Doctor's Prime!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorsPrimeScreen;
