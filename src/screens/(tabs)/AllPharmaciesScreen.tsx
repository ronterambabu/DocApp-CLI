import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const pharmacies = [
  {
    id: '1',
    name: 'Apollo Pharmacy',
    location: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1580281657527-47aab76dfdc1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'MedPlus',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1606813902532-0fdd8b6a3caa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: '1MG Pharmacy',
    location: 'Hyderabad, India',
    image: 'https://images.unsplash.com/photo-1576765607929-58de7aa88033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'NetMeds',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1532375810709-c57c307f1d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Wellness Pharmacy',
    location: 'Chennai, India',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'HealthFirst',
    location: 'Pune, India',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80',
  },
];

// Define your stack param list for navigation typing
export type RootStackParamList = {
  AllPharmaciesScreen: undefined;
  PharmacyDetailsScreen: { id: string };
  // ...other routes
};

const AllPharmaciesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPharmacyCard = ({ item }: { item: typeof pharmacies[0] }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PharmacyDetailsScreen', { id: item.id })}
      style={tw`bg-white rounded-4xl mx-4 mb-5 shadow-sm elevation-4 overflow-hidden`}
    >
      <Image
        source={{ uri: item.image }}
        style={tw`h-48 w-full`}
        resizeMode="cover"
      />
      <View style={tw`p-3`}>
        <Text style={tw`text-lg font-bold text-slate-800`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-500 mt-0.5`}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-50 pt-12`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-slate-800`}>All Pharmacies</Text>
      </View>

      {/* Search Bar */}
      <View
        style={tw`mx-4 mb-4 bg-white rounded-3xl px-3.5 py-2.5 flex-row items-center shadow-sm elevation-2`}
      >
        <Ionicons name="search" size={20} color="#94A3B8" style={tw`mr-2`} />
        <TextInput
          placeholder="Search pharmacies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={tw`flex-1 text-base`}
        />
      </View>

      {/* Pharmacy List */}
      <FlatList
        data={filteredPharmacies}
        keyExtractor={(item) => item.id}
        renderItem={renderPharmacyCard}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={tw`text-center mt-10 text-base text-gray-400`}>
            No pharmacies found.
          </Text>
        }
      />
    </View>
  );
};

export default AllPharmaciesScreen;
