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
import { Search } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const hospitals = [
  {
    id: '1',
    name: 'Apollo Hospital',
    location: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Fortis Hospital',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1576765607929-58de7aa88033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'AIIMS',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1588776814546-ec7b7386c79f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Max Healthcare',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1584036561584-b03c19da874c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Manipal Hospital',
    location: 'Chennai, India',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Narayana Health',
    location: 'Hyderabad, India',
    image: 'https://images.unsplash.com/photo-1588776814901-dc5a5faeb5f3?auto=format&fit=crop&w=800&q=80',
  },
];

// Define your stack param list for navigation typing
export type RootStackParamList = {
  AllHospitalsScreen: undefined;
  HospitalDetailsScreen: { id: string };
  // ...other routes
};

const AllHospitalsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHospitalCard = ({ item }: { item: typeof hospitals[0] }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HospitalDetailsScreen', { id: item.id })}
      style={tw`bg-white rounded-4xl mx-4 mb-5 shadow-sm elevation-4 overflow-hidden`}
      accessible
      accessibilityLabel={`${item.name} hospital in ${item.location}`}
      accessibilityRole="button"
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
    <PageLayout
      title="All Hospitals"
      headerBackgroundColor="#2E3192"
      scrollable={false}
    >
      {/* Search Bar */}
      <View style={tw`px-4 mb-4`}>
        <View
          style={tw`bg-white rounded-3xl px-3.5 py-2.5 flex-row items-center shadow-sm elevation-2`}
        >
          <Search size={20} color="#94A3B8" style={tw`mr-2`} />
          <TextInput
            placeholder="Search hospitals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={tw`flex-1 text-base`}
            accessibilityLabel="Search hospitals"
            accessibilityRole="search"
          />
        </View>
      </View>

      {/* Hospital List */}
      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id}
        renderItem={renderHospitalCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-4`}
        ListEmptyComponent={
          <Text style={tw`text-center mt-10 text-base text-gray-400`}>
            No hospitals found.
          </Text>
        }
      />
    </PageLayout>
  );
};

export default AllHospitalsScreen;
