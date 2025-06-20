import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';

const HealthfeedScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <DoctorHeader title="Healthfeed" showSettings showNotifications />
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}>
        <Text style={{ fontSize: 24, color: '#202b6d', fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Latest Healthfeed</Text>
        <View style={{ width: '100%', maxWidth: 480, alignSelf: 'center' }}>
          <View style={{ backgroundColor: '#eaf1fb', borderRadius: 18, padding: 20, marginBottom: 18, shadowColor: '#202b6d', shadowOpacity: 0.10, shadowRadius: 8, elevation: 3 }}>
            <Text style={{ color: '#202b6d', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>5 Tips for a Healthy Heart</Text>
            <Text style={{ color: '#666', marginBottom: 8 }}>Learn how to keep your heart healthy with these simple lifestyle changes.</Text>
            <Text style={{ color: '#1d9be3', fontSize: 13 }}>Read More</Text>
          </View>
          <View style={{ backgroundColor: '#eaf1fb', borderRadius: 18, padding: 20, marginBottom: 18, shadowColor: '#202b6d', shadowOpacity: 0.10, shadowRadius: 8, elevation: 3 }}>
            <Text style={{ color: '#202b6d', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Managing Stress Effectively</Text>
            <Text style={{ color: '#666', marginBottom: 8 }}>Discover techniques to manage stress and improve your well-being.</Text>
            <Text style={{ color: '#1d9be3', fontSize: 13 }}>Read More</Text>
          </View>
        </View>
        <Text style={{ color: '#666', marginTop: 32, textAlign: 'center', fontSize: 15 }}>
          Stay updated with the latest health news and tips here.
        </Text>
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
