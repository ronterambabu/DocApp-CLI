import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, ShoppingCart, ChevronDown, Search } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';

const categories = [
  { name: 'Covid Essentials', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/covid-essentials.png' } },
  { name: 'Skin Care', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/skin-care.png' } },
  { name: 'Vitamins and Minerals', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/vitamins-minerals.png' } },
  { name: 'Sexual Wellness', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/sexual-wellness.png' } },
  { name: 'Health Food and Drinks', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/health-food-drinks.png' } },
  { name: 'Baby Care', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/baby-care.png' } },
  { name: 'Pain Relief', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/pain-relief.png' } },
  { name: 'Diabetic Care', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/diabetic-care.png' } },
  { name: 'Protein and Supplements', image: { uri: 'https://assets-netstorage.groww.in/medias/medicines/protein-supplements.png' } },
];

const locations = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai'];

type RootStackParamList = {
  Pharmacy: { category: string };
  Home: undefined;
  Cart: undefined;
};

export default function PharmacyCategoriesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [cart, setCart] = useState<{ name: string }[]>([]);
  const [location, setLocation] = useState('Bangalore');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [search, setSearch] = useState('');

  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 64) / 3;

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#f7fafd]`}>
      {/* Header */}
      <PageHeader
        title="Pharmacy"
        backgroundColor="#16a34a"
        textColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)} style={tw`p-2`}>
            <ShoppingCart size={24} color="#fff" />
          </TouchableOpacity>
        }
      />

      {/* Location Selector */}
      <View style={tw`flex-row items-center px-4 py-2`}>
        <Text style={tw`text-sm text-green-800`}>Deliver to - </Text>
        <TouchableOpacity onPress={() => setShowLocationModal(true)}>
          <Text style={tw`text-sm text-green-600 font-semibold`}>{location}</Text>
        </TouchableOpacity>
        <ChevronDown size={18} color="gray" style={tw`ml-1`} />
      </View>

      {/* Location Modal */}
      <Modal visible={showLocationModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-green-900/10`}>
          <View style={tw`bg-green-50 rounded-t-xl p-4`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Choose Location</Text>
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() => {
                  setLocation(loc);
                  setShowLocationModal(false);
                }}
                style={tw`py-2 border-b border-green-100`}
              >
                <Text style={tw`text-base`}>{loc}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowLocationModal(false)} style={tw`py-3`}>
              <Text style={tw`text-center text-green-600`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Bar */}
      <View style={tw`px-4 pt-2 pb-1`}>
        <View style={tw`flex-row items-center bg-green-50 rounded-full px-4 py-2 shadow-sm`}>
          <Search size={20} color="gray" />
          <TextInput
            placeholder="Search Medicines & Health Products"
            style={tw`ml-2 flex-1 text-sm`}
            placeholderTextColor="gray"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Section Title */}
      <Text style={tw`px-4 pt-4 pb-2 font-bold text-lg text-green-900`}>Shop Health Products By Categories</Text>

      {/* Image Grid with glassmorphism and gradient overlay */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={tw`px-4 pb-6`}
        columnWrapperStyle={tw`justify-between`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Pharmacy', { category: item.name })}>
            <View style={{
              backgroundColor: '#f5f8fc',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
              width: imageSize,
              height: imageSize + 32,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}>
              <Image
                source={item.image}
                style={{ width: imageSize - 12, height: imageSize - 12, resizeMode: 'contain', borderRadius: 12 }}
              />
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#222', marginTop: 8, textAlign: 'center' }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  categoryText: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 4,
  },
});
