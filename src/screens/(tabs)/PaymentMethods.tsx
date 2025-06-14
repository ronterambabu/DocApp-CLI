import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

type PaymentMethod = {
  id: string;
  type: string;
  cardNumber: string;
  isDefault: boolean;
};

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();

  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'Credit Card',
      cardNumber: '**** **** **** 1234',
      isDefault: true,
    },
    {
      id: '2',
      type: 'PayPal',
      cardNumber: 'john.doe@gmail.com',
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState('');
  const [newType, setNewType] = useState('');

  const handleAddMethod = () => {
    if (!newCard || !newType) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newMethod = {
      id: Date.now().toString(),
      type: newType,
      cardNumber: newCard,
      isDefault: methods.length === 0,
    };

    setMethods([...methods, newMethod]);
    setNewCard('');
    setNewType('');
  };

  const handleSetDefault = (id: string) => {
    const updatedMethods = methods.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));
    setMethods(updatedMethods);
  };

  const handleRemove = (id: string) => {
    Alert.alert('Confirm', 'Remove this payment method?', [
      { text: 'Cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          const filtered = methods.filter((item) => item.id !== id);
          setMethods(filtered);
        },
      },
    ]);
  };

  const renderMethod = ({ item }: { item: PaymentMethod }) => (
    <View
      style={[
        tw`bg-white p-4 rounded-xl mb-3 flex-row justify-between border border-gray-200`,
        { elevation: 1 }, // elevation kept inline for Android
      ]}
    >
      <View style={tw`flex-1`}>
        <Text style={tw`font-semibold text-base text-gray-800`}>{item.type}</Text>
        <Text style={tw`text-gray-600 mt-1`}>{item.cardNumber}</Text>
        {item.isDefault && (
          <Text style={tw`mt-1.5 text-green-500 font-semibold`}>Default</Text>
        )}
      </View>
      <View style={tw`justify-center items-end ml-2.5`}>
        {!item.isDefault && (
          <TouchableOpacity onPress={() => handleSetDefault(item.id)}>
            <Text style={tw`text-blue-500 mb-2`}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Text style={tw`text-red-500`}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={tw`flex-1 bg-gray-100 px-5 android:pt-10 pt-5`}
    >
      <View style={tw`flex-row items-center justify-between mb-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[tw`p-2 rounded-full bg-white shadow-sm`, { elevation: 2 }]}
        >
          <ArrowLeft size={24} color="#222B45" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-gray-800 text-center flex-1`}>
          Payment Methods
        </Text>
        <View style={tw`w-10`} /> {/* spacing for symmetry */}
      </View>

      <FlatList
        data={methods}
        renderItem={renderMethod}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500 mt-5`}>No Payment Methods</Text>
        }
        contentContainerStyle={tw`pb-7 min-h-[100px]`}
      />

      <Text style={tw`text-base font-semibold mt-7 mb-2.5 text-gray-800`}>
        Add New Payment Method
      </Text>

      <TextInput
        style={tw`bg-white p-3 rounded-xl border border-gray-300 mb-3`}
        placeholder="e.g. Credit Card, PayPal"
        value={newType}
        onChangeText={setNewType}
      />

      <TextInput
        style={tw`bg-white p-3 rounded-xl border border-gray-300 mb-3`}
        placeholder="Card Number or Email"
        value={newCard}
        onChangeText={setNewCard}
      />

      <TouchableOpacity
        style={tw`bg-blue-500 py-3.5 rounded-xl items-center mb-7`}
        onPress={handleAddMethod}
      >
        <Text style={tw`text-white font-bold text-base`}>Add Method</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;