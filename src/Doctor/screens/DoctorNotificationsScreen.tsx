import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';

const DoctorNotificationsScreen = () => {
  const notifications = [
    {
      id: 1,
      title: 'Appointment Confirmed',
      message: 'Your appointment with Jane Smith is confirmed for 2025-06-22 at 10:00 AM.'
    },
    {
      id: 2,
      title: 'New Message',
      message: 'You have received a new message from John Appleseed.'
    }
    // To test empty state, set notifications = []
  ];  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <DoctorHeader title="Notifications" />
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}>
        <Text style={{ fontSize: 24, color: '#202b6d', fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Recent Notifications</Text>
        <View style={{ width: '100%', maxWidth: 480, alignSelf: 'center' }}>
          {notifications.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 48 }}>
              <Text style={{ color: '#bbb', fontSize: 18, fontWeight: 'bold' }}>No Notifications</Text>
              <Text style={{ color: '#999', marginTop: 8, fontSize: 15 }}>You have no new notifications at the moment.</Text>
            </View>
          ) : (
            notifications.map((item) => (
              <View key={item.id} style={{ backgroundColor: '#eaf1fb', borderRadius: 18, padding: 20, marginBottom: 18, flexDirection: 'row', alignItems: 'center', shadowColor: '#202b6d', shadowOpacity: 0.10, shadowRadius: 8, elevation: 3 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#202b6d', fontWeight: 'bold', fontSize: 17, marginBottom: 4 }}>{item.title}</Text>
                  <Text style={{ color: '#666', marginBottom: 2 }}>{item.message}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DoctorNotificationsScreen;
