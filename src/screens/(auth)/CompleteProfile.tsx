import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import API from '../../../apiConfig'; // Adjust the import path as necessary

export default function CompleteProfile() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handlePickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Image picker error');
        return;
      }
      if (response.assets && response.assets[0]?.uri) {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload: any = {
        date_of_birth: dateOfBirth?.toISOString().split('T')[0],
        gender,
      };
      if (profilePicture) {
        payload.profile_picture = profilePicture;
      }

      const response = await fetch(API.API_ENDPOINTS.completeGeneralUserProfile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile completed successfully!', [
          { text: 'OK', onPress: () => navigation.navigate && navigation.navigate('Profile') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Failed to complete profile');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 bg-white`,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <ScrollView contentContainerStyle={tw`p-4 pt-6 pb-10`}>
        {/* Profile Picture */}
        <View style={tw`mb-6 items-center`}>
          <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Profile Picture</Text>
          <TouchableOpacity
            onPress={handlePickImage}
            style={tw`items-center justify-center`}
            activeOpacity={0.7}
          >
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={tw`w-28 h-28 rounded-full border-2 border-[#202b6d] shadow`}
              />
            ) : (
              <View style={tw`w-28 h-28 bg-white rounded-full items-center justify-center border-2 border-gray-200 shadow-sm`}>
                <AntDesign name="plus" size={24} color="#6B7280" />
                <Text style={tw`text-gray-500 text-xs mt-1`}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={tw`bg-white p-4 rounded-xl mb-6 shadow border border-gray-100`}>
          <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>Your Info</Text>
          <Text style={tw`text-xs text-gray-500`}>Full Name</Text>
          <Text style={tw`text-sm text-gray-800 mb-2`}>{user?.name || 'N/A'}</Text>
          <Text style={tw`text-xs text-gray-500`}>Email</Text>
          <Text style={tw`text-sm text-gray-800 mb-2`}>{user?.email || 'N/A'}</Text>
          <Text style={tw`text-xs text-gray-500`}>Phone</Text>
          <Text style={tw`text-sm text-gray-800`}>{user?.phone || '-'}</Text>
        </View>

        {/* Date of Birth */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-800 mb-1`}>Date of Birth</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={tw`bg-white px-4 py-3 rounded-lg flex-row items-center justify-between border ${errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'} shadow-sm`}
            activeOpacity={0.7}
          >
            <Text style={tw`text-gray-700 text-sm`}>
              {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date'}
            </Text>
            <Feather name="calendar" size={18} color="#6B7280" />
          </TouchableOpacity>
          {errors.dateOfBirth && (
            <Text style={tw`text-red-500 text-xs mt-1`}>{errors.dateOfBirth}</Text>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth || new Date(2000, 0, 1)}
              mode="date"
              maximumDate={new Date()}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDateOfBirth(selectedDate);
                  setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
                }
              }}
            />
          )}
        </View>

        {/* Gender Selection */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Gender</Text>
          <View style={tw`flex-row justify-between`}>
            {['Male', 'Female', 'Others'].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => {
                  setGender(g as typeof gender);
                  setErrors((prev) => ({ ...prev, gender: '' }));
                }}
                style={tw`flex-1 mx-1 py-2 rounded-lg border ${gender === g ? 'bg-[#202b6d] border-[#202b6d]' : 'bg-white border-gray-200'} shadow-sm items-center`}
                activeOpacity={0.7}
              >
                <Text style={tw`${gender === g ? 'text-white' : 'text-gray-700'} text-sm`}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.gender && <Text style={tw`text-red-500 text-xs mt-2`}>{errors.gender}</Text>}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-[#202b6d] rounded-lg h-12 justify-center items-center shadow-md ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white text-base font-semibold`}>Complete Profile</Text>
          )}
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity
          onPress={() => navigation.navigate && navigation.navigate('Profile')}
          style={tw`items-center mt-6 bg-gray-100 rounded-lg py-2 px-4`}
          activeOpacity={0.7}
        >
          <Text style={tw`text-[#202b6d] text-sm font-semibold underline`}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
