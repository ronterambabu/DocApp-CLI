import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

// Device dimensions
const screenWidth = Dimensions.get('window').width;
const itemSpacing = 16;
const horizontalPadding = 32;
const numColumns = 2;
const itemSize = (screenWidth - horizontalPadding - itemSpacing * (numColumns - 1)) / numColumns;

const categories = [
  { id: '1', name: 'Blood Test', image: require('../Images/labtesticons/blood-test.png') },
  { id: '2', name: 'Urine Test', image: require('../Images/labtesticons/dark-urine.png') },
  { id: '3', name: 'Diabetes Panel', image: require('../Images/labtesticons/sugar-blood-level.png') },
  { id: '4', name: 'Thyroid Test', image: require('../Images/labtesticons/allergy-test.png') },
  { id: '5', name: 'Liver Function', image: require('../Images/labtesticons/liver-function-test.png') },
  { id: '6', name: 'Kidney Function', image: require('../Images/labtesticons/kidney (1).png') },
  { id: '7', name: 'Vitamin Test', image: require('../Images/labtesticons/supplement.png') },
  { id: '8', name: 'Lipid Profile', image: require('../Images/labtesticons/portfolio.png') },
  { id: '9', name: 'Complete Blood Count', image: require('../Images/labtesticons/blood-analysis.png') },
  { id: '10', name: 'COVID-19 Test', image: require('../Images/labtesticons/coronavirus.png') },
  { id: '11', name: 'Electrolyte Panel', image: require('../Images/labtesticons/hydration.png') },
  { id: '12', name: 'Hormone Panel', image: require('../Images/labtesticons/hormonal-imbalance.png') },
  { id: '13', name: 'Allergy Test', image: require('../Images/labtesticons/test.png') },
  { id: '14', name: 'Blood Culture', image: require('../Images/labtesticons/blood-donation.png') },
  { id: '15', name: 'Coagulation Test', image: require('../Images/labtesticons/tube.png') },
];

type RootStackParamList = {
  LabTestScreen: { category: string };
};

const LabTestCategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategorySelect = (category: string) => {
    navigation.navigate('LabTestScreen', { category });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`h-14 flex-row items-center justify-between px-4 border-b border-gray-300 bg-white`}>
        <TouchableOpacity
          style={tw`w-8 justify-center items-center`}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#202b6d" />
        </TouchableOpacity>

        <View style={tw`flex-1 items-center`}>
          <Text style={[tw`text-xl font-bold`, { color: '#202b6d' }]}>Select a Test Category</Text>
        </View>

        <View style={tw`w-8`} />
      </View>

      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-white mx-4 mt-4 mb-2 px-3 py-2 rounded-3xl shadow`}>
        <Feather name="search" size={20} color="#999" style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1 h-10 text-base text-gray-800`}
          placeholder="Search tests..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category Grid */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={tw`px-4 pb-5`}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: itemSize,
              aspectRatio: 1,
              backgroundColor: 'white',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
            activeOpacity={0.8}
            onPress={() => handleCategorySelect(item.name)}
          >
            <Image
              source={item.image}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text style={[tw`mt-3 text-center text-[14px] font-semibold`, { color: '#202b6d' }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default LabTestCategoriesScreen;
