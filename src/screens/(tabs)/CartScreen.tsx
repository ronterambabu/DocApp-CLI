import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';

// Example cart data (replace with context or redux in real app)
const initialCart = [
  {
    id: '1',
    name: 'Baby Soap',
    brand: 'Johnson & Johnson',
    price: 50,
    image: 'https://source.unsplash.com/featured/?babysoap',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Body Lotion',
    brand: 'Nivea',
    price: 250,
    image: 'https://source.unsplash.com/featured/?lotion',
    quantity: 1,
  },
];

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState(initialCart);

  const handleRemove = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleQuantity = (id: string, delta: number) => {
    setCart(cart => cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <PageHeader
        title="My Cart"
        backgroundColor="#202b6d"
        textColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        }
      />
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          contentContainerStyle={tw`p-4 pb-36`}
          ListEmptyComponent={<Text style={tw`text-center text-gray-500 mt-10`}>Your cart is empty.</Text>}
          renderItem={({ item }) => (
            <View style={tw`flex-row items-center bg-white rounded-xl shadow-sm border border-gray-100 mb-4 p-3`}>
              <Image source={{ uri: item.image }} style={tw`w-16 h-16 rounded-lg mr-3`} />
              <View style={tw`flex-1`}>
                <Text style={tw`font-semibold text-base text-gray-800`}>{item.name}</Text>
                <Text style={tw`text-xs text-gray-500`}>{item.brand}</Text>
                <View style={tw`flex-row items-center mt-2`}>
                  <TouchableOpacity onPress={() => handleQuantity(item.id, -1)} style={tw`px-2 bg-gray-200 rounded-full`}><Text style={tw`text-lg`}>-</Text></TouchableOpacity>
                  <Text style={tw`mx-2 text-base`}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantity(item.id, 1)} style={tw`px-2 bg-gray-200 rounded-full`}><Text style={tw`text-lg`}>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={tw`items-end justify-between h-full`}> 
                <Text style={tw`font-bold text-blue-700 text-base`}>₹{item.price * item.quantity}</Text>
                <TouchableOpacity onPress={() => handleRemove(item.id)} style={tw`mt-2`}>
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {cart.length > 0 && (
          <View style={[
            tw`absolute left-0 right-0 bg-white px-4 py-4 border-t border-gray-200`,
            { bottom: 60, zIndex: 10, elevation: 10, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 }
          ]}> 
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-lg font-semibold`}>Total</Text>
              <Text style={tw`text-lg font-bold text-blue-700`}>₹{total}</Text>
            </View>
            <TouchableOpacity
              style={tw`bg-blue-700 py-3 rounded-xl mt-2 shadow-lg`}
              onPress={() => Alert.alert('Order Placed', 'Your pharmacy order has been placed!')}
            >
              <Text style={tw`text-center text-white font-semibold text-base`}>Pay & Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
