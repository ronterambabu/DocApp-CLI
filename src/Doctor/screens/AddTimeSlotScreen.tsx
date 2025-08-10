import tw from 'twrnc';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

const AddTimeSlotScreen = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAdd = () => {
    if (!startTime.trim() || !endTime.trim()) {
      Alert.alert('Validation', 'Please enter both start and end times.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStartTime('');
      setEndTime('');
      setTimeout(() => setSuccess(false), 1500);
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`flex-1 justify-center items-center bg-green-50`}>
        <View style={tw`w-11/12 bg-white rounded-2xl p-6 shadow-sm`}>
          <Text style={tw`text-2xl font-bold text-green-700 mb-4`}>Add Time Slot</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Time (e.g. 09:00 AM)"
            placeholderTextColor="#aaa"
            value={startTime}
            onChangeText={setStartTime}
            editable={!loading}
            returnKeyType="next"
            onSubmitEditing={() => {}}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time (e.g. 10:00 AM)"
            placeholderTextColor="#aaa"
            value={endTime}
            onChangeText={setEndTime}
            editable={!loading}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAdd}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{success ? '✔ Added' : 'Add'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    color: '#222',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    fontSize: 17,
    backgroundColor: '#fafbfc',
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default AddTimeSlotScreen;
