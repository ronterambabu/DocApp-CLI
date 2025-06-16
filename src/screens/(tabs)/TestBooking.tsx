import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

const TEST_DATA = [
  { id: '1', name: 'Complete Blood Count (CBC)', price: 400 },
  { id: '2', name: 'Lipid Profile', price: 700 },
  { id: '3', name: 'Thyroid Test (T3, T4, TSH)', price: 500 },
  { id: '4', name: 'Vitamin D Test', price: 900 },
  { id: '5', name: 'COVID-19 RTPCR', price: 800 },
];

const TestBookingScreen = () => {
  const navigation = useNavigation();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    if (selectedTests.length === 0) {
      Alert.alert('No Test Selected', 'Please select at least one test to book.');
      return;
    }
    const selectedNames = TEST_DATA.filter((test) =>
      selectedTests.includes(test.id)
    ).map((test) => test.name);

    Alert.alert('Test Booked', `You have booked:\n\n• ${selectedNames.join('\n• ')}`);
    setSelectedTests([]);
  };

  const totalAmount = selectedTests.reduce((sum, id) => {
    const test = TEST_DATA.find((item) => item.id === id);
    return sum + (test?.price || 0);
  }, 0);

  const renderItem = ({ item }: { item: typeof TEST_DATA[0] }) => {
    const isSelected = selectedTests.includes(item.id);
    return (
      <TouchableOpacity
        style={tw`bg-white p-4 rounded-xl mb-3 mx-4 border border-gray-300 ${isSelected ? 'border-blue-600 bg-blue-50' : ''}`}
        onPress={() => toggleSelection(item.id)}
        activeOpacity={0.8}
      >
        <View style={tw`flex-row items-center`}>
          <Icon
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={24}
            color={isSelected ? '#2E86DE' : '#888'}
          />
          <View style={tw`ml-3 flex-1`}>
            <Text style={tw`text-base font-medium text-gray-900`}>{item.name}</Text>
            <Text style={tw`text-sm text-gray-600 mt-1`}>₹{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3 bg-white shadow-sm`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#222B45" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-center flex-1 -ml-6`}>Book a Test</Text>
      </View>

      {/* Test List */}
      <FlatList
        data={TEST_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-32 pt-4`}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Bar */}
      {selectedTests.length > 0 && (
        <View style={tw`absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200 flex-row justify-between items-center`}>
          <Text style={tw`text-base font-medium text-gray-800`}>
            {selectedTests.length} test(s) — ₹{totalAmount}
          </Text>
          <TouchableOpacity
            style={tw`bg-blue-600 py-2 px-5 rounded-2xl`}
            onPress={handleBooking}
          >
            <Text style={tw`text-white text-base font-semibold`}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TestBookingScreen;
