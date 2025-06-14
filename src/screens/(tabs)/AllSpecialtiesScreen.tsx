import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ArrowLeft, Search } from 'lucide-react-native';
import { useNavigation, RouteProp, NavigationProp, useRoute } from '@react-navigation/native';
import tw from 'twrnc';

const specialties = [
  { name: 'General Physician', image: require('../Images/PopUpICons/general_physician.png') },
  { name: 'Cardiologist', image: require('../Images/PopUpICons/cardiology.png') },
  { name: 'Dermatologist', image: require('../Images/PopUpICons/skincare.png') },
  { name: 'Neurologist', image: require('../Images/PopUpICons/neurology.png') },
  { name: 'Pediatrician', image: require('../Images/PopUpICons/pediatrician.png') },
  { name: 'Psychiatrist', image: require('../Images/PopUpICons/psychiatrist.png') },
  { name: 'Oncologist', image: require('../Images/PopUpICons/oncology.png') },
  { name: 'Orthopedic', image: require('../Images/PopUpICons/arthritis.png') },
  { name: 'ENT Specialist', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Gastroenterologist', image: require('../Images/PopUpICons/stomach.png') },
  { name: 'Endocrinologist', image: require('../Images/PopUpICons/endocrine.png') },
  { name: 'Urologist', image: require('../Images/PopUpICons/kidney.png') },
  { name: 'Gynecologist', image: require('../Images/PopUpICons/gynecologist.png') },
  { name: 'Skin & Hair', image: require('../Images/PopUpICons/spots.png') },
  { name: "Women's Health", image: require('../Images/PopUpICons/prenatal-care.png') },
  { name: 'Dental Care', image: require('../Images/PopUpICons/tooth.png') },
  { name: 'Ear, Nose, Throat', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Mental Wellness', image: require('../Images/PopUpICons/brain.png') },
  { name: 'Bones & Joints', image: require('../Images/PopUpICons/arthritis.png') },
];

// Define your stack param list for navigation typing
export type RootStackParamList = {
  AllSpecialtiesScreen: { type?: string };
  Doctors: { type?: string; specialty: string };
  ConsultOptionsScreen: { specialty: string };
  // ...other routes
};

type AllSpecialtiesScreenRouteProp = RouteProp<RootStackParamList, 'AllSpecialtiesScreen'>;
type AllSpecialtiesScreenNavProp = NavigationProp<RootStackParamList, 'AllSpecialtiesScreen'>;

const AllSpecialtiesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<AllSpecialtiesScreenNavProp>();
  const route = useRoute<AllSpecialtiesScreenRouteProp>();
  const type = route.params?.type;

  const filtered = specialties.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialtyPress = (specialty: string) => {
    if (type === 'online' || type === 'offline') {
      navigation.navigate('Doctors', { type, specialty });
    } else {
      navigation.navigate('ConsultOptionsScreen', { specialty });
    }
  };

  const renderItem = ({ item }: { item: typeof specialties[0] }) => (
    <TouchableOpacity
      style={tw`bg-white w-[48%] rounded-4xl py-6 px-3 items-center justify-center shadow-sm elevation-3`}
      activeOpacity={0.85}
      onPress={() => handleSpecialtyPress(item.name)}
    >
      <View style={[tw`w-18 h-18 rounded-3xl mb-2.5`, { backgroundColor: '#becfe8', overflow: 'hidden' }]}>
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Text style={[tw`mt-2.5 text-[15px] font-medium text-center`, { color: '#202b6d' }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-blue-50 pt-15 px-4`}>
      {/* Title Bar */}
      <View style={tw`flex-row items-center mb-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-1.5 mr-3`}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[tw`text-2xl font-bold`, { color: '#202b6d' }]}>All Specialties</Text>
      </View>

      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-white rounded-3.5xl px-3 py-2.5 mb-5 shadow-sm elevation-3`}>
        <Search size={20} color="#999" style={tw`mr-2`} />
        <TextInput
          placeholder="Search specialties"
          style={tw`text-base text-gray-800 flex-1`}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Specialties List */}
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={tw`justify-between mb-4`}
        contentContainerStyle={tw`pb-7.5`}
        ListEmptyComponent={
          <Text style={tw`text-center mt-12 text-base text-gray-500`}>
            No specialties found.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllSpecialtiesScreen;
