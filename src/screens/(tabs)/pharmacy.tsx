import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import { ArrowLeft, Plus, MapPin, Filter, Search, ChevronDown, X, ShoppingCart } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  description?: string;
};

type RootStackParamList = {
  Pharmacy: {
    category?: string;
  };
};

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Baby Soap',
    brand: 'Johnson & Johnson',
    price: '50',
    image: 'https://source.unsplash.com/featured/?babysoap',
    description: 'Gentle baby soap for sensitive skin'
  },
  {
    id: '2',
    name: 'Dettol Soap',
    brand: 'Dettol',
    price: '35',
    image: 'https://source.unsplash.com/featured/?dettol,soap',
    description: 'Antibacterial soap for protection'
  },
  {
    id: '3',
    name: 'Body Lotion',
    brand: 'Nivea',
    price: '250',
    image: 'https://source.unsplash.com/featured/?lotion',
    description: '24-hour moisturizing lotion'
  },
  {
    id: '4',
    name: 'Face Cream',
    brand: 'Olay',
    price: '450',
    image: 'https://source.unsplash.com/featured/?skincream',
    description: 'Anti-aging face cream'
  },
  {
    id: '5',
    name: 'Medicated Soap',
    brand: 'Dove',
    price: '65',
    image: 'https://source.unsplash.com/featured/?medicatedsoap',
    description: 'Medicated soap for skin problems'
  },
];

export default function ProductListScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Pharmacy'>>();
  const category = route.params?.category;

  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [priceFilter, setPriceFilter] = useState<null | 'low' | 'medium' | 'high'>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFilteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((item) => {
      // Category filter
      if (category && item.name && !item.name.toLowerCase().includes(category.toLowerCase())) {
        return false;
      }

      // Search filter - search in name, brand, and description
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.brand.toLowerCase().includes(searchLower) ||
          (item.description && item.description.toLowerCase().includes(searchLower))
        );
      }

      // Price filter
      const price = parseInt(item.price);
      if (priceFilter === 'low') return price < 100;
      if (priceFilter === 'medium') return price >= 100 && price <= 500;
      if (priceFilter === 'high') return price > 500;
      return true;
    });

    // Sort products
    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-asc') {
        return parseInt(a.price) - parseInt(b.price);
      } else {
        return parseInt(b.price) - parseInt(a.price);
      }
    });
  }, [category, searchQuery, priceFilter, sortBy]);

  const handleSearch = (text: string) => {
    setLoading(true);
    setSearchQuery(text);
    // Simulate search delay for better UX
    setTimeout(() => setLoading(false), 300);
  };

  const renderEmptyState = () => (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <Text style={tw`text-xl font-semibold text-green-800 mb-2`}>No Products Found</Text>
      <Text style={tw`text-base text-green-600 text-center`}>
        {searchQuery 
          ? `No products match "${searchQuery}"`
          : "No products available in this category"}
      </Text>
      {(searchQuery || priceFilter || category) && (
        <TouchableOpacity
          style={tw`mt-4 py-2 px-4 bg-green-50 rounded-lg`}
          onPress={() => {
            setSearchQuery('');
            setPriceFilter(null);
            if (category) {
              navigation.setParams({ category: undefined });
            }
          }}
        >
          <Text style={tw`text-green-600 font-medium`}>Clear All Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <PageHeader 
        title={category ? `${category}` : "Pharmacy"}
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

      {/* Search Bar */}
      <View style={tw`px-4 pb-2 pt-1 bg-green-50 shadow-sm`}>
        <View style={[
          tw`flex-row items-center bg-green-100 rounded-xl`,
          isSearchFocused && tw`bg-green-50 border-2 border-green-600`
        ]}>
          <View style={tw`px-3 py-2`}>
            <Search size={20} color={isSearchFocused ? "#16a34a" : "#6B7280"} />
          </View>
          <TextInput
            style={tw`flex-1 py-2 pr-3 text-base text-green-800`}
            placeholder="Search by name, brand, or description..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={tw`px-3`}
              onPress={() => setSearchQuery('')}
            >
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={tw`flex-row items-center justify-between mt-2`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-sm text-green-700`}>
              {getFilteredAndSortedProducts.length} results
            </Text>
            {(searchQuery || priceFilter || category) && (
              <TouchableOpacity
                style={tw`ml-2 flex-row items-center`}
                onPress={() => {
                  setSearchQuery('');
                  setPriceFilter(null);
                  if (category) {
                    navigation.setParams({ category: undefined });
                  }
                }}
              >
                <Text style={tw`text-sm text-green-600`}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <TouchableOpacity 
              onPress={() => setSortVisible(true)}
              style={tw`flex-row items-center bg-green-50 border border-green-200 rounded-lg px-3 py-1.5`}
            >
              <ChevronDown size={16} color="#4B5563" />
              <Text style={tw`ml-1 text-sm text-green-800`}>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setFilterVisible(true)}
              style={tw`bg-green-50 border border-green-200 rounded-lg px-3 py-1.5`}
            >
              <Filter size={16} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#16a34a" />
        </View>
      ) : (
        <FlatList
          data={getFilteredAndSortedProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`p-2`}
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={tw`flex-1 m-2 bg-green-50 rounded-xl shadow-sm border border-green-100`}
              onPress={() => {
                // Handle product press
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`w-full h-32 rounded-t-xl`}
                resizeMode="cover"
              />
              <View style={tw`p-3`}>
                <Text style={tw`text-lg font-medium text-green-800`}>{item.name}</Text>
                <Text style={tw`text-sm text-green-600`}>{item.brand}</Text>
                <Text style={tw`text-xs text-green-600 mt-1`} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={tw`flex-row items-center justify-between mt-2`}>
                  <Text style={tw`text-lg font-semibold text-green-600`}>₹{item.price}</Text>
                  <TouchableOpacity 
                    style={tw`bg-green-600 rounded-full p-2`}
                    onPress={() => Alert.alert('Success', `${item.name} added to cart`)}
                  >
                    <Plus size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Sort Modal */}
      <Modal
        transparent={true}
        visible={sortVisible}
        animationType="slide"
        onRequestClose={() => setSortVisible(false)}
      >
        <TouchableOpacity 
          style={tw`flex-1 bg-green-900 bg-opacity-10`} 
          activeOpacity={1} 
          onPress={() => setSortVisible(false)}
        >
          <View style={tw`mt-auto bg-green-50 rounded-t-3xl`}>
            <View style={tw`w-12 h-1 bg-green-200 rounded-full mx-auto mt-3`} />
            <View style={tw`p-4`}>
              <Text style={tw`text-xl font-semibold text-green-800 mb-4`}>Sort By</Text>
              <TouchableOpacity 
                style={tw`py-3 px-4 flex-row justify-between items-center`}
                onPress={() => {
                  setSortBy('name');
                  setSortVisible(false);
                }}
              >
                <Text style={tw`text-base ${sortBy === 'name' ? 'text-green-600 font-medium' : 'text-green-800'}`}>Name</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`py-3 px-4 flex-row justify-between items-center`}
                onPress={() => {
                  setSortBy('price-asc');
                  setSortVisible(false);
                }}
              >
                <Text style={tw`text-base ${sortBy === 'price-asc' ? 'text-green-600 font-medium' : 'text-gray-800'}`}>Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`py-3 px-4 flex-row justify-between items-center`}
                onPress={() => {
                  setSortBy('price-desc');
                  setSortVisible(false);
                }}
              >
                <Text style={tw`text-base ${sortBy === 'price-desc' ? 'text-green-600 font-medium' : 'text-gray-800'}`}>Price: High to Low</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal
        transparent={true}
        visible={filterVisible}
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableOpacity 
          style={tw`flex-1 bg-black bg-opacity-50`} 
          activeOpacity={1} 
          onPress={() => setFilterVisible(false)}
        >
          <View style={tw`mt-auto bg-white rounded-t-3xl`}>
            <View style={tw`w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3`} />
            <View style={tw`p-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800 mb-4`}>Filter By Price</Text>
              <TouchableOpacity 
                style={tw`py-3 px-4 flex-row justify-between items-center`}
                onPress={() => {
                  setPriceFilter('low');
                  setFilterVisible(false);
                }}
              >
                <Text style={tw`text-base ${priceFilter === 'low' ? 'text-green-600 font-medium' : 'text-gray-800'}`}>Under ₹100</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`py-3 px-4 flex-row justify-between items-center`}
                onPress={() => {
                  setPriceFilter('medium');
                  setFilterVisible(false);
                }}
              >
                <Text style={tw`text-base ${priceFilter === 'medium' ? 'text-green-600 font-medium' : 'text-gray-800'}`}>₹100 - ₹500</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`py-3 px-4 flex-row justify-between items-center`}
                onPress={() => {
                  setPriceFilter('high');
                  setFilterVisible(false);
                }}
              >
                <Text style={tw`text-base ${priceFilter === 'high' ? 'text-green-600 font-medium' : 'text-gray-800'}`}>Above ₹500</Text>
              </TouchableOpacity>
              {(priceFilter || category) && (
                <TouchableOpacity 
                  style={tw`mt-4 py-3 px-4 bg-red-50 rounded-lg`}
                  onPress={() => {
                    setPriceFilter(null);
                    setFilterVisible(false);
                  }}
                >
                  <Text style={tw`text-base text-red-600 text-center`}>Clear Filters</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
