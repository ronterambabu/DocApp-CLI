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
  ScrollView,
  Dimensions,
} from 'react-native';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

const categories = [
  { name: 'Covid Essentials', image: { uri: 'https://source.unsplash.com/featured/?sanitizer,mask' } },
  { name: 'Skin Care', image: { uri: 'https://source.unsplash.com/featured/?skincare' } },
  { name: 'Vitamins and Minerals', image: { uri: 'https://source.unsplash.com/featured/?vitamins' } },
  { name: 'Sexual Wellness', image: { uri: 'https://source.unsplash.com/featured/?wellness' } },
  { name: 'Health Food and Drinks', image: { uri: 'https://source.unsplash.com/featured/?healthdrink' } },
  { name: 'Pain Relief', image: { uri: 'https://source.unsplash.com/featured/?painrelief' } },
  { name: 'Diabetic Care', image: { uri: 'https://source.unsplash.com/featured/?diabetes' } },
  { name: 'Protein and Supplements', image: { uri: 'https://source.unsplash.com/featured/?protein,supplements' } },
  { name: 'Skin Care', image: { uri: 'https://source.unsplash.com/featured/?skincare' } },
];

const locations = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai'];

type RootStackParamList = {
  pharmacy: undefined;
};

export default function PharmacyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [cart, setCart] = useState<{ name: string }[]>([]);
  const [location, setLocation] = useState('Bangalore');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleAddToCart = (item: { name: string }) => {
    setCart((prev) => [...prev, item]);
    Alert.alert('Added to Cart', `${item.name} added to cart`);
  };

  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 64) / 3;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold`}>Pharmacy</Text>
        <TouchableOpacity onPress={() => Alert.alert('Cart', `${cart.length} item(s) in cart`)}>
          <Feather name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Location Selector */}
      <View style={tw`flex-row items-center px-4 py-2`}>
        <Text style={tw`text-sm`}>Deliver to - </Text>
        <TouchableOpacity onPress={() => setShowLocationModal(true)}>
          <Text style={tw`text-sm text-blue-500`}>{location}</Text>
        </TouchableOpacity>
        <Feather name="chevron-down" size={16} color="gray" style={tw`ml-1`} />
      </View>

      {/* Location Modal */}
      <Modal visible={showLocationModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black bg-opacity-40`}>
          <View style={tw`bg-white rounded-t-xl p-4`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Choose Location</Text>
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() => {
                  setLocation(loc);
                  setShowLocationModal(false);
                }}
                style={tw`py-2 border-b border-gray-200`}
              >
                <Text style={tw`text-base`}>{loc}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowLocationModal(false)} style={tw`py-3`}>
              <Text style={tw`text-center text-red-500`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Bar */}
      <View style={tw`px-4 py-2`}>
        <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2`}>
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search Medicines & Health Products"
            style={tw`ml-2 flex-1 text-sm`}
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Section Title */}
      <Text style={tw`px-4 pt-4 pb-2 font-semibold text-lg`}>
        Shop Health Products By Categories
      </Text>

      {/* Image Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={tw`px-4 pb-6`}
        columnWrapperStyle={tw`justify-between`}
        renderItem={({ item }) => (
         <TouchableOpacity onPress={() => navigation.navigate('pharmacy')}>
            <View style={{ position: 'relative' }}>
              <Image
                source={item.image}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: imageSize,
                  height: imageSize,
                  borderRadius: 12,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              />
            </View>
            <Text style={tw`text-xs text-center mt-2 w-[90%]`}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}







// image to code from path

// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import { Feather, MaterialIcons } from '@expo/vector-icons';
// import tw from 'twrnc';

// const categories = [
//   { name: 'Covid Essentials', image: require('../assets/covid.png') },
//   { name: 'Skin Care', image: require('../assets/skincare.png') },
//   { name: 'Vitamins and Minerals', image: require('../assets/vitamins.png') },
//   { name: 'Sexual Wellness', image: require('../assets/wellness.png') },
//   { name: 'Health Food and Drinks', image: require('../assets/healthfood.png') },
//   { name: 'Baby Care', image: require('../assets/babycare.png') },
//   { name: 'Pain Relief', image: require('../assets/painrelief.png') },
//   { name: 'Diabetic Care', image: require('../assets/diabetic.png') },
//   { name: 'Protein and Supplements', image: require('../assets/supplements.png') },
// ];

// export default function PharmacyScreen({ navigation }) {
//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       {/* Header */}
//       <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="arrow-left" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={tw`text-lg font-semibold`}>Practo Pharmacy</Text>
//         <TouchableOpacity>
//           <Feather name="shopping-cart" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Location */}
//       <View style={tw`flex-row items-center px-4 py-2`}>
//         <Text style={tw`text-sm`}>Deliver to - </Text>
//         <TouchableOpacity>
//           <Text style={tw`text-sm text-blue-500`}>Bangalore</Text>
//         </TouchableOpacity>
//         <Feather name="chevron-down" size={16} color="gray" style={tw`ml-1`} />
//       </View>

//       {/* Search Bar */}
//       <View style={tw`px-4 py-2`}>
//         <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2`}>
//           <Feather name="search" size={20} color="gray" />
//           <TextInput
//             placeholder="Search Medicines & Health Products"
//             style={tw`ml-2 flex-1 text-sm`}
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>

//       {/* Section Title */}
//       <Text style={tw`px-4 pt-4 pb-2 font-semibold text-lg`}>
//         Shop Health Products By Categories
//       </Text>

//       {/* Grid */}
//       <FlatList
//         data={categories}
//         keyExtractor={(item) => item.name}
//         numColumns={3}
//         columnWrapperStyle={tw`justify-between px-4`}
//         contentContainerStyle={tw`pb-6`}
//         renderItem={({ item }) => (
//           <View style={tw`items-center w-[30%] my-3`}>
//             <Image source={item.image} style={tw`w-16 h-16 rounded-md`} resizeMode="contain" />
//             <Text style={tw`text-center text-xs mt-2`}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }
