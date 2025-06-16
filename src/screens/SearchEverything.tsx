import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, FlatList, Modal, TouchableOpacity, Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import {
  ArrowLeft,
  Search,
  MapPin,
  User,
  CalendarCheck,
  FlaskConical,
  ShoppingBag,
  FileText,
  Settings,
  HelpCircle,
  Stethoscope,
} from 'lucide-react-native';

// Define a type for your search items
interface SearchItem {
  title: string;
  type: string;
  icon?: React.ReactNode;
  action?: () => void;
}

// Example: Add all user services and navigation actions here
const allSearchOptions: SearchItem[] = [
  { title: 'Find Doctors', type: 'Service', icon: <Stethoscope size={20} color="#202b6d" /> },
  { title: 'Book Appointment', type: 'Service', icon: <CalendarCheck size={20} color="#202b6d" /> },
  { title: 'Lab Tests', type: 'Service', icon: <FlaskConical size={20} color="#202b6d" /> },
  { title: 'Pharmacy', type: 'Service', icon: <ShoppingBag size={20} color="#202b6d" /> },
  { title: 'Medical Records', type: 'Service', icon: <FileText size={20} color="#202b6d" /> },
  { title: 'Profile', type: 'Account', icon: <User size={20} color="#202b6d" /> },
  { title: 'Settings', type: 'Account', icon: <Settings size={20} color="#202b6d" /> },
  { title: 'Help Center', type: 'Support', icon: <HelpCircle size={20} color="#202b6d" /> },
  // ...add more as needed
];

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

  const onResultSelect = (item: SearchItem) => {
    setSearchHistory(prev => {
      const exists = prev.find(i => i.title === item.title);
      if (exists) return prev;
      return [item, ...prev];
    });
    setSearchText('');
    Keyboard.dismiss();
    if (item.action) item.action();
  };

  return (
    <View style={tw`flex-1 bg-white pt-8 px-4`}> {/* Less padding for better safe area */}
      {/* Header */}
      <View style={tw`flex-row items-center mb-4`}> {/* Modern header */}
        <Pressable onPress={() => navigation.goBack()} style={tw`p-2 bg-gray-100 rounded-full`}>
          <ArrowLeft size={22} color="#202b6d" />
        </Pressable>
        <Pressable
          onPress={() => setShowLocationModal(true)}
          style={tw`flex-row items-center ml-2 px-2 py-1 bg-gray-100 rounded-full`}
        >
          <MapPin size={16} color="#202b6d" />
          <Text style={tw`ml-1 font-semibold text-[#202b6d]`}>{selectedLocation}</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-3 shadow-sm mb-2`}> {/* Larger, modern */}
        <Search size={20} color="#202b6d" />
        <TextInput
          placeholder="Search for doctors, services, labs, pharmacy..."
          placeholderTextColor="#888"
          style={tw`ml-2 flex-1 text-base text-gray-800`}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
      </View>

      {/* Search Results / History */}
      <View style={tw`mt-6`}> {/* Results section */}
        {(searchText.length > 0 ? filteredResults : searchHistory).length > 0 && (
          <>
            <View style={tw`flex-row justify-between mb-2`}> {/* Section title */}
              <Text style={tw`text-gray-700 font-semibold`}>{searchText.length > 0 ? 'Results' : 'Recent Searches'}</Text>
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
                  style={tw`flex-row items-center justify-between py-3 border-b border-gray-100 bg-white rounded-lg px-2 mb-1`}
                >
                  <View style={tw`flex-row items-start`}>
                    {/* Show Lucide icon if present, fallback to Search/Clock */}
                    {item.icon ? (
                      item.icon
                    ) : (
                      <Search size={18} color="#202b6d" style={tw`mt-1`} />
                    )}
                    <View style={tw`ml-3`}>
                      <Text style={tw`text-gray-900 font-semibold text-base`}>{item.title}</Text>
                      <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.type}</Text>
                    </View>
                  </View>
                  {searchText.length === 0 && (
                    <Pressable onPress={() => removeItem(index)}>
                      <MaterialIcons name="close" size={20} color="#999" />
                    </Pressable>
                  )}
                </Pressable>
              )}
            />
          </>
        )}
        {searchText.length > 0 && filteredResults.length === 0 && (
          <Text style={tw`text-center text-gray-400 mt-10`}>No results found. Try another search.</Text>
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
