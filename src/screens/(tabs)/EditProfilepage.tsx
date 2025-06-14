import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker'; // Replace with CLI-compatible imports
import tw from 'twrnc';

const EditProfileScreen = () => {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://randomuser.me/api/portraits/lego/1.jpg'
  );

  // Load user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setName(user.name || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setGender(user.gender || '');
          setDob(user.date_of_birth || '');
          if (user.profile_picture) setProfileImage(user.profile_picture);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Replace pickImage with a CLI-compatible placeholder
  const pickImage = async () => {
    Alert.alert('Not supported', 'Image picking is not available in this build.');
  };

  const handleSave = async () => {
    const updatedUser = {
      name,
      email,
      phone,
      gender,
      date_of_birth: dob,
      profile_picture: profileImage,
    };

    try {
      const stored = await AsyncStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : {};
      const mergedUser = { ...user, ...updatedUser };

      await AsyncStorage.setItem('user', JSON.stringify(mergedUser));
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#2E64FE" />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-5 justify-between`}>
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="#2E64FE" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-blue-600`}>Edit Profile</Text>
          <View style={tw`w-6`} />
        </View>

        {/* Profile Image */}
        <TouchableOpacity style={tw`items-center mb-6`} onPress={pickImage}>
          <Image
            source={{ uri: profileImage }}
            style={tw`w-30 h-30 rounded-full border-2 border-blue-600`}
          />
          <View style={tw`absolute bottom-0 right-[35%] bg-blue-600 p-1.5 rounded-full border-2 border-white`}>
            <Feather name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Form */}
        <View style={tw`bg-white rounded-2xl p-5 shadow`}>
          {[
            { label: 'Full Name', value: name, setValue: setName, placeholder: 'Enter full name' },
            { label: 'Email', value: email, setValue: setEmail, placeholder: 'Enter email', keyboardType: 'email-address' as const },
            { label: 'Phone Number', value: phone, setValue: setPhone, placeholder: 'Enter phone number', keyboardType: 'phone-pad' as const },
            { label: 'Gender', value: gender, setValue: setGender, placeholder: 'Enter gender' },
            { label: 'Date of Birth', value: dob, setValue: setDob, placeholder: 'YYYY-MM-DD' },
          ].map(({ label, value, setValue, placeholder, keyboardType }, index) => (
            <View key={index} style={tw`mb-4`}>
              <Text style={tw`mb-1.5 font-semibold text-gray-800`}>{label}</Text>
              <TextInput
                style={tw`h-12 rounded-xl bg-gray-200 px-3 text-base`}
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                keyboardType={keyboardType as import('react-native').KeyboardTypeOptions}
              />
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={tw`bg-blue-600 rounded-xl py-3.5 items-center mt-7.5`}
          onPress={handleSave}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
