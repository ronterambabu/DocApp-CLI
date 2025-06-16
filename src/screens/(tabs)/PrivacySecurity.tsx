import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

const PrivacySecurityScreen = () => {
  const navigation = useNavigation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [appPermissions, setAppPermissions] = useState({
    location: true,
    notifications: true,
    camera: false,
  });

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    Alert.alert(
      'Two-Factor Authentication',
      !twoFactorEnabled ? 'Enabled' : 'Disabled'
    );
  };

  const togglePermission = (key: keyof typeof appPermissions) => {
    setAppPermissions({ ...appPermissions, [key]: !appPermissions[key] });
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Redirecting to password reset flow...');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'You can link to your real privacy policy page here.'
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <View style={tw`px-4`}>
        {/* Header */}
        <TouchableOpacity
          style={tw`mt-2 mb-4 p-2 self-start bg-white rounded-full shadow`}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#222B45" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>
          Privacy & Security
        </Text>
      </View>

      <ScrollView
        style={tw`px-4`}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Two-Factor Authentication */}
        <View
          style={tw`bg-white p-4 rounded-xl mb-4 flex-row justify-between items-start`}
        >
          <View style={tw`flex-1 pr-3`}>
            <Text style={tw`text-base font-medium text-gray-900`}>
              Two-Factor Authentication
            </Text>
            <Text style={tw`text-gray-600 text-sm mt-1`}>
              Adds an extra layer of security to your account.
            </Text>
          </View>
          <Switch value={twoFactorEnabled} onValueChange={toggle2FA} />
        </View>

        {/* Change Password */}
        <TouchableOpacity
          style={tw`flex-row items-center bg-white p-4 rounded-xl mb-4`}
          onPress={handleChangePassword}
        >
          <Icon name="lock-closed-outline" size={22} color="#555" />
          <Text style={tw`ml-3 text-base text-gray-800`}>Change Password</Text>
        </TouchableOpacity>

        {/* App Permissions Header */}
        <Text style={tw`text-base font-semibold text-gray-800 mb-3 mt-4`}>
          App Permissions
        </Text>

        {/* Permissions List */}
        {Object.entries(appPermissions).map(([key, value]) => (
          <View
            key={key}
            style={tw`bg-white py-4 px-4 rounded-xl mb-3 flex-row justify-between items-center`}
          >
            <Text style={tw`text-base text-gray-900`}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <Switch
              value={value}
              onValueChange={() =>
                togglePermission(key as keyof typeof appPermissions)
              }
            />
          </View>
        ))}

        {/* Privacy Policy */}
        <TouchableOpacity
          style={tw`flex-row items-center bg-white p-4 rounded-xl mt-4`}
          onPress={handlePrivacyPolicy}
        >
          <Icon name="document-text-outline" size={22} color="#555" />
          <Text style={tw`ml-3 text-base text-gray-800`}>
            View Privacy Policy
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;
