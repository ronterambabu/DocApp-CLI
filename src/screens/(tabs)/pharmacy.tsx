import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

const allProducts = [
  {
    id: '1',
    name: 'Tedibar Soap 75gm',
    brand: 'Curatio Healthcare Pvt. Ltd.',
    price: '199',
    image: { uri: 'https://source.unsplash.com/featured/?babysoap' },
  },
  {
    id: '2',
    name: 'Dettol Cool Soap 75gm',
    brand: 'Reckitt Benckiser',
    price: '40',
    image: { uri: 'https://source.unsplash.com/featured/?dettol,soap' },
  },
  {
    id: '3',
    name: 'Venusia Max Lotion 300ml',
    brand: 'Dr. Reddys Laboratories Ltd.',
    price: '802',
    image: { uri: 'https://source.unsplash.com/featured/?lotion' },
  },
  {
    id: '4',
    name: 'Kojivit Ultra Gel 30gm',
    brand: 'Micro Labs Ltd.',
    price: '719',
    image: { uri: 'https://source.unsplash.com/featured/?skincream' },
  },
  {
    id: '5',
    name: 'Dermadew Soap 75gm',
    brand: 'Hegde & Hegde Pharmaceutica Llp',
    price: '174',
    image: { uri: 'https://source.unsplash.com/featured/?medicatedsoap' },
  },
];

type RootStackParamList = {
  pharmacy: undefined;
};

export default function ProductListScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{ params: { category?: string } }, 'params'>>();
  const category = route.params?.category;

  const [filterVisible, setFilterVisible] = useState(false);
  const [priceFilter, setPriceFilter] = useState<null | 'low' | 'medium' | 'high'>(null); // "low", "medium", "high"

  const filteredProducts = allProducts.filter((item) => {
    const price = parseInt(item.price);
    if (priceFilter === 'low') return price < 100;
    if (priceFilter === 'medium') return price >= 100 && price <= 500;
    if (priceFilter === 'high') return price > 500;
    return true;
  });

  const handleFilter = (range: null | 'low' | 'medium' | 'high') => {
    setPriceFilter(range);
    setFilterVisible(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold`}>{category || 'All Products'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('pharmacy')}>
          <Feather name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center px-4 py-2`}>
        <Feather name="map-pin" size={16} color="gray" />
        <Text style={tw`text-sm ml-1`}>Deliver to - Bangalore</Text>
        <TouchableOpacity>
          <Text style={tw`text-sm text-blue-500 ml-2`}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center justify-between px-4 pt-2`}>
        <Text style={tw`font-bold text-base`}>All Products</Text>
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <Feather name="filter" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={tw`px-4 pb-2 text-xs text-gray-500`}>
        {filteredProducts.length} products available
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4 pb-6`}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-start py-3 border-b border-gray-200`}>
            <Image
              source={item.image}
              style={tw`w-20 h-20 rounded-lg mr-4`}
              resizeMode="cover"
            />
            <View style={tw`flex-1`}>
              <Text style={tw`font-semibold text-sm`}>{item.name}</Text>
              <Text style={tw`text-xs text-gray-500 mt-1`}>By {item.brand}</Text>
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`text-base font-semibold`}>MRP {item.price}</Text>
                <TouchableOpacity
                  style={tw`border border-blue-500 px-3 py-1 rounded-full`}
                  onPress={() => navigation.navigate('pharmacy')}
                >
                  <Text style={tw`text-blue-500 text-sm`}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal visible={filterVisible} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-t-2xl p-4`}>
            <Text style={tw`text-base font-semibold mb-3`}>Filter by Price</Text>

            <TouchableOpacity onPress={() => handleFilter('low')} style={tw`py-2`}>
              <Text style={tw`text-sm`}>Below ₹100</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('medium')} style={tw`py-2`}>
              <Text style={tw`text-sm`}>₹100 - ₹500</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('high')} style={tw`py-2`}>
              <Text style={tw`text-sm`}>Above ₹500</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter(null)} style={tw`py-2`}>
              <Text style={tw`text-sm text-red-500`}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
