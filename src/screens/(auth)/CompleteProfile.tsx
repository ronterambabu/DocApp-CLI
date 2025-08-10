import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Plus, Calendar, ImageIcon } from 'lucide-react-native';
import tw from 'twrnc';
import { useUser } from '../contexts/UserContext';

const GREEN = '#22c55e';
const API_ENDPOINT = 'https://landing.docapp.co.in/api/auth/profile/complete/general_user';

export default function CompleteProfile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useUser() as { user: User | null };

  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ dateOfBirth?: string; gender?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const payload = {
        date_of_birth: dateOfBirth?.toISOString().split('T')[0] ?? '',
        gender,
        profile_picture: profilePictureUrl.trim() || undefined,
      };

      const response = await fetch(API_ENDPOINT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile completed successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Profile') },
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
      <StatusBar backgroundColor={GREEN} barStyle="light-content" />
      <ScrollView contentContainerStyle={tw`p-4 pt-20 pb-10`}>
        {/* Profile Picture URL Input */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Profile Picture URL</Text>
          <View style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm`}>
            <ImageIcon size={18} color="gray" />
            <TextInput
              placeholder="Enter image URL"
              value={profilePictureUrl}
              onChangeText={setProfilePictureUrl}
              style={tw`ml-2 flex-1 text-sm text-gray-800`}
              autoCapitalize="none"
            />
          </View>
          {profilePictureUrl.trim() !== '' && (
            <View style={tw`items-center mt-4`}>
              <Image
                source={{ uri: profilePictureUrl }}
                style={tw`w-28 h-28 rounded-full border-2 border-[${GREEN}]` as any}
              />
            </View>
          )}
        </View>

        {/* User Info */}
        <View style={tw`bg-white p-4 rounded-xl mb-6 shadow border border-gray-100`}>
          <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>Your Info</Text>
          <Text style={tw`text-xs text-gray-500`}>Full Name</Text>
          <Text style={tw`text-sm text-gray-800 mb-2`}>{user?.username || 'N/A'}</Text>
          <Text style={tw`text-xs text-gray-500`}>Email</Text>
          <Text style={tw`text-sm text-gray-800 mb-2`}>{user?.email || 'N/A'}</Text>
          <Text style={tw`text-xs text-gray-500`}>Phone</Text>
          <Text style={tw`text-sm text-gray-800`}>{user?.phone_number || '-'}</Text>
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
            <Calendar size={18} color="#6B7280" />
          </TouchableOpacity>
          {errors.dateOfBirth && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.dateOfBirth}</Text>}
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
                style={tw`flex-1 mx-1 py-2 rounded-lg border ${gender === g ? `bg-[${GREEN}] border-[${GREEN}]` : 'bg-white border-gray-200'} shadow-sm items-center`}
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
          style={tw`bg-[${GREEN}] rounded-lg h-12 justify-center items-center shadow-md ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white text-base font-semibold`}>Complete Profile</Text>
          )}
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={tw`items-center mt-6 bg-gray-100 rounded-lg py-2 px-4`}
          activeOpacity={0.7}
        >
          <Text style={tw`text-[${GREEN}] text-sm font-semibold underline`}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
