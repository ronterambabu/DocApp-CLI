import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

type RootStackParamList = {
  DoctorsScreen: { specialty: string };
};

const specialties = [
  { id: '1', name: 'General Physician', image: require('../Images/PopUpICons/general_physician.png'), doctorsCount: 10 },
  { id: '2', name: 'Cardiologist', image: require('../Images/PopUpICons/cardiology.png'), doctorsCount: 8 },
  { id: '3', name: 'Dermatologist', image: require('../Images/PopUpICons/skincare.png'), doctorsCount: 5 },
  { id: '4', name: 'Neurologist', image: require('../Images/PopUpICons/neurology.png'), doctorsCount: 7 },
  { id: '5', name: 'Pediatrician', image: require('../Images/PopUpICons/pediatrician.png'), doctorsCount: 6 },
  { id: '6', name: 'Psychiatrist', image: require('../Images/PopUpICons/psychiatrist.png'), doctorsCount: 4 },
  { id: '7', name: 'Oncologist', image: require('../Images/PopUpICons/oncology.png'), doctorsCount: 3 },
  { id: '8', name: 'Orthopedic', image: require('../Images/PopUpICons/arthritis.png'), doctorsCount: 9 },
  { id: '9', name: 'ENT Specialist', image: require('../Images/PopUpICons/medical.png'), doctorsCount: 2 },
  { id: '10', name: 'Gastroenterologist', image: require('../Images/PopUpICons/stomach.png'), doctorsCount: 1 },
  { id: '11', name: 'Endocrinologist', image: require('../Images/PopUpICons/endocrine.png'), doctorsCount: 3 },
  { id: '12', name: 'Urologist', image: require('../Images/PopUpICons/kidney.png'), doctorsCount: 4 },
  { id: '13', name: 'Gynecologist', image: require('../Images/PopUpICons/gynecologist.png'), doctorsCount: 5 },
  { id: '14', name: 'Skin & Hair', image: require('../Images/PopUpICons/spots.png'), doctorsCount: 6 },
  { id: '15', name: "Women's Health", image: require('../Images/PopUpICons/prenatal-care.png'), doctorsCount: 7 },
  { id: '16', name: 'Dental Care', image: require('../Images/PopUpICons/tooth.png'), doctorsCount: 8 },
  { id: '17', name: 'Ear, Nose, Throat', image: require('../Images/PopUpICons/medical.png'), doctorsCount: 2 },
  { id: '18', name: 'Mental Wellness', image: require('../Images/PopUpICons/brain.png'), doctorsCount: 3 },
  { id: '19', name: 'Bones & Joints', image: require('../Images/PopUpICons/arthritis.png'), doctorsCount: 9 },
];

const AllSpecialtiesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSpecialtyCard = ({ item }: { item: typeof specialties[0] }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DoctorsScreen', { specialty: item.name })}
      style={tw`bg-white rounded-4xl mx-4 mb-5 shadow-sm elevation-4 overflow-hidden`}
      accessible
      accessibilityLabel={`${item.name} specialty with ${item.doctorsCount} doctors`}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: item.image }}
        style={tw`h-48 w-full`}
        resizeMode="cover"
      />
      <View style={tw`p-3`}>
        <Text style={tw`text-lg font-bold text-slate-800`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-500 mt-0.5`}>
          {item.doctorsCount} Doctors
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PageLayout
      title="All Specialties"
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
            placeholder="Search specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={tw`flex-1 text-base`}
            accessibilityLabel="Search specialties"
            accessibilityRole="search"
          />
        </View>
      </View>

      {/* Specialties List */}
      <FlatList
        data={filteredSpecialties}
        keyExtractor={(item) => item.id}
        renderItem={renderSpecialtyCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-4`}
        ListEmptyComponent={
          <Text style={tw`text-center mt-10 text-base text-gray-400`}>
            No specialties found.
          </Text>
        }
      />
    </PageLayout>
  );
};

export default AllSpecialtiesScreen;
