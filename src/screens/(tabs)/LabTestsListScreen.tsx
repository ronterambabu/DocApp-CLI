import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import tw from 'twrnc';

const mockTests = [
  { id: '1', name: 'Basic', description: 'Includes CBC, ESR, and Blood Sugar', price: '₹499' },
  { id: '2', name: 'Advanced Panel', description: 'Thyroid, Kidney & Liver function tests', price: '₹999' },
  { id: '3', name: 'Diabetes Package', description: 'Fasting Glucose, HbA1c, Lipid profile', price: '₹799' },
  { id: '4', name: 'Heart Health', description: 'ECG, Cholesterol, Blood Pressure', price: '₹899' },
  { id: '5', name: 'Full Body Checkup', description: 'All major tests included', price: '₹1499' },
  { id: '6', name: 'Vitamin Deficiency', description: 'Vitamin B12, D3 & Iron', price: '₹699' },
];

type RootStackParamList = {
  LabTestsListScreen: { category: string };
};

const LabTestsListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LabTestsListScreen'>>();
  const { category } = route.params as { category: string };

  const [search, setSearch] = useState('');
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const filteredTests = mockTests.filter((test) =>
    test.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTest = mockTests.find((test) => test.id === selectedTestId);

  return (
    <SafeAreaView style={[tw`flex-1 bg-gray-100`, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0 }]}> 
      <View style={tw`h-14 flex-row items-center justify-between px-4 border-b border-gray-300 bg-white`}>
        <TouchableOpacity
          style={tw`w-8 justify-center items-center`}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#2E64FE" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-blue-600 text-center flex-1`}>{category}</Text>
        <View style={tw`w-8`} />
      </View>

      {selectedTest && (
        <View style={tw`bg-blue-100 p-3 mx-4 my-2.5 rounded-xl border border-blue-600`}>
          <Text style={tw`text-xs font-semibold text-blue-600 mb-0.5`}>Selected Test:</Text>
          <Text style={tw`text-base font-bold text-blue-800`}>{selectedTest.name}</Text>
        </View>
      )}

      <View style={tw`flex-1 p-4`}>
        <Text style={tw`text-lg font-semibold mb-2.5 text-gray-800`}>Available Tests</Text>

        <TextInput
          style={tw`bg-white p-3 rounded-lg mb-4 text-base text-gray-800 shadow-sm`}
          placeholder="Search tests..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />

        {filteredTests.length === 0 ? (
          <View style={tw`p-5 items-center`}>
            <Text style={tw`text-base text-gray-500`}>No tests found matching "{search}"</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTests}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`pb-5`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedTestId;
              return (
                <View style={tw`bg-white rounded-xl py-4 px-5 mb-4 shadow-md ${isSelected ? 'border-2 border-blue-600' : ''}`}>
                  <Text style={tw`text-lg font-bold ${isSelected ? 'text-blue-800' : 'text-blue-600'}`}>{item.name}</Text>
                  <Text style={tw`mt-2 text-sm text-gray-600`}>{item.description}</Text>
                  <View style={tw`flex-row mt-4 justify-between items-center`}>
                    <Text style={tw`text-base font-semibold text-green-600`}>{item.price}</Text>
                    <TouchableOpacity
                      style={tw`px-4 py-2 rounded-lg ${isSelected ? 'bg-blue-300' : 'bg-blue-600'}`}
                      activeOpacity={0.7}
                      onPress={() => setSelectedTestId(item.id)}
                      disabled={isSelected}
                    >
                      <Text style={tw`text-white text-sm font-semibold`}>{isSelected ? 'Selected' : 'Book Now'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LabTestsListScreen;
