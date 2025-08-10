import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

// Replace 'RootStackParamList' with your actual root stack param list type
type RootStackParamList = {
  Tabs: undefined;
  // add other routes if needed
};

export default function NotFoundScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={tw`flex-1 items-center justify-center px-5 bg-green-50`}>
      <Text style={tw`text-xl font-semibold text-green-800`}>This screen doesn't exist.</Text>
      <Button
        title="Go to home screen!"
        onPress={() => navigation.navigate('Tabs')}
      />
    </View>
  );
}