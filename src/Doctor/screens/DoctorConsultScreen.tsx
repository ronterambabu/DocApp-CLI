import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';
import DateTimePicker from '@react-native-community/datetimepicker';

const DoctorConsultScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };
  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) setSelectedTime(time);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <DoctorHeader title="Consult" showSettings showNotifications />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', paddingTop: 24, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', minHeight: 300 }}>
          <Text style={{ fontSize: 22, color: '#202b6d', fontWeight: 'bold', marginBottom: 8 }}>Upcoming Consultations</Text>
          <View style={{ width: '100%', maxWidth: 420 }}>
            <View style={{ backgroundColor: '#eaf1fb', borderRadius: 16, padding: 18, marginBottom: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#202b6d', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#202b6d', fontWeight: 'bold', fontSize: 16 }}>Jane Smith</Text>
                <Text style={{ color: '#666', marginTop: 2 }}>Video Consultation</Text>
                <Text style={{ color: '#1d9be3', marginTop: 2 }}>2025-06-22 • 10:00 AM</Text>
              </View>
              <View style={{ backgroundColor: '#1d9be3', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>Join</Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#eaf1fb', borderRadius: 16, padding: 18, marginBottom: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#202b6d', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#202b6d', fontWeight: 'bold', fontSize: 16 }}>John Appleseed</Text>
                <Text style={{ color: '#666', marginTop: 2 }}>In-person Consultation</Text>
                <Text style={{ color: '#1d9be3', marginTop: 2 }}>2025-06-23 • 2:30 PM</Text>
              </View>
              <View style={{ backgroundColor: '#1d9be3', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>Details</Text>
              </View>
            </View>
          </View>
          {/* Date and Time Selection */}
          <View style={{ width: '100%', maxWidth: 420, marginTop: 24 }}>
            <Text style={{ fontSize: 18, color: '#202b6d', fontWeight: 'bold', marginBottom: 8 }}>Schedule New Consultation</Text>
            <TouchableOpacity
              style={{ backgroundColor: '#eaf1fb', borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.8}
            >
              <Text style={{ color: '#202b6d', fontWeight: '600' }}>Select Date</Text>
              <Text style={{ color: '#1d9be3', fontWeight: 'bold' }}>{selectedDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: '#eaf1fb', borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.8}
            >
              <Text style={{ color: '#202b6d', fontWeight: '600' }}>Select Time</Text>
              <Text style={{ color: '#1d9be3', fontWeight: 'bold' }}>{selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>
      </ScrollView>
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

export default DoctorConsultScreen;
