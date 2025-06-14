import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, FlatList, Modal, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Define a type for your search items
interface SearchItem {
  title: string;
  type: string;
}

const allSearchOptions: SearchItem[] = [ /* ... your search items ... */ ];

const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const clearAll = () => setSearchHistory([]);
  const removeItem = (index: number) =>
    setSearchHistory(prev => prev.filter((_, i) => i !== index));

  const filteredResults = allSearchOptions.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const onResultSelect = (item: any) => {
    setSearchHistory(prev => {
      const exists = prev.find(i => i.title === item.title);
      if (exists) return prev;
      return [item, ...prev];
    });
    setSearchText('');
  };

  return (
    <View style={tw`flex-1 bg-white pt-12 px-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center mb-4`}>
        <Pressable onPress={() => navigation.goBack()} style={tw`p-2`}>
          <Feather name="arrow-left" size={22} color="black" />
        </Pressable>
        <Pressable
          onPress={() => setShowLocationModal(true)}
          style={tw`flex-row items-center ml-2`}
        >
          <Feather name="map-pin" size={16} color="black" />
          <Text style={tw`ml-1 font-semibold`}>{selectedLocation}</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2`}>
        <Feather name="search" size={18} color="gray" />
        <TextInput
          placeholder="Search Symptoms / Specialities"
          placeholderTextColor="#888"
          style={tw`ml-2 flex-1 text-sm text-gray-800`}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Search Results / History */}
      <View style={tw`mt-6`}>
        {(searchText.length > 0 ? filteredResults : searchHistory).length > 0 && (
          <>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-gray-700 font-semibold`}>
                {searchText.length > 0 ? 'Results' : 'Continue searching for...'}
              </Text>
              {searchText.length === 0 && (
                <Pressable onPress={clearAll}>
                  <Text style={tw`text-blue-500 text-sm font-semibold`}>CLEAR</Text>
                </Pressable>
              )}
            </View>

            <FlatList
              data={searchText.length > 0 ? filteredResults : searchHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => onResultSelect(item)}
                  style={tw`flex-row items-center justify-between py-2 border-b border-gray-100`}
                >
                  <View style={tw`flex-row items-start`}>
                    <Feather name="clock" size={16} color="#888" style={tw`mt-1`} />
                    <View style={tw`ml-3`}>
                      <Text style={tw`text-gray-900`}>{item.title}</Text>
                      <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.type}</Text>
                    </View>
                  </View>
                  {searchText.length === 0 && (
                    <Pressable onPress={() => removeItem(index)}>
                      <MaterialIcons name="close" size={18} color="#999" />
                    </Pressable>
                  )}
                </Pressable>
              )}
            />
          </>
        )}
      </View>

      {/* Location Picker Modal */}
      <Modal visible={showLocationModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black/30`}>
          <View style={tw`bg-white rounded-t-2xl p-4`}>
            <Text style={tw`text-lg font-semibold mb-4`}>Select Location</Text>
            {locations.map(loc => (
              <TouchableOpacity
                key={loc}
                onPress={() => {
                  setSelectedLocation(loc);
                  setShowLocationModal(false);
                }}
                style={tw`py-2`}
              >
                <Text style={tw`text-base text-gray-800`}>{loc}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowLocationModal(false)} style={tw`mt-4`}>
              <Text style={tw`text-center text-blue-500 font-semibold`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchScreen;
