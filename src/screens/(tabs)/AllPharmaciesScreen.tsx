import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

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

export type RootStackParamList = {
  AllPharmaciesScreen: undefined;
  PharmacyDetailsScreen: { id: string };
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
      style={tw`bg-white rounded-2xl mx-4 mb-4 shadow-md overflow-hidden`}
      accessibilityRole="button"
      accessibilityLabel={`${item.name} pharmacy in ${item.location}`}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: Dimensions.get('window').width - 32,
          height: 180,
          resizeMode: 'cover',
        }}
      />
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold text-gray-900`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-500 mt-1`}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PageLayout
      title="All Pharmacies"
      headerBackgroundColor="#2E3192"
      scrollable={false}
    >
      {/* Search Bar */}
      <View style={tw`px-4 mt-4 mb-3`}>
        <View style={tw`flex-row items-center bg-white rounded-full px-4 py-2 shadow`}>
          <Search size={20} color="#9CA3AF" style={tw`mr-2`} />
          <TextInput
            placeholder="Search pharmacies..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={tw`flex-1 text-base text-gray-800`}
            accessibilityLabel="Search pharmacies"
          />
        </View>
      </View>

      {/* Pharmacy List */}
      <FlatList
        data={filteredPharmacies}
        keyExtractor={(item) => item.id}
        renderItem={renderPharmacyCard}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={tw`text-center mt-10 text-base text-gray-400`}>
            No pharmacies found.
          </Text>
        }
      />
    </PageLayout>
  );
};

export default AllPharmaciesScreen;
