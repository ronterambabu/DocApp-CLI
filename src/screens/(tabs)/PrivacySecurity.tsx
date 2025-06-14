import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
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
    Alert.alert('Two-Factor Authentication', !twoFactorEnabled ? 'Enabled' : 'Disabled');
  };

  const togglePermission = (key: keyof typeof appPermissions) => {
    setAppPermissions({ ...appPermissions, [key]: !appPermissions[key] });
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Redirecting to password reset flow...');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'You can link to your real privacy policy page here.');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100 px-5`}>
      <TouchableOpacity
        style={tw`mb-2.5 p-2 self-start bg-white rounded-full shadow-sm mt-2.5`}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color="#222B45" />
      </TouchableOpacity>
      <ScrollView>
        <Text style={tw`text-2xl font-bold mb-6`}>Privacy & Security</Text>

        {/* Two-Factor Authentication */}
        <View style={tw`bg-white p-4 rounded-xl mb-4 flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-base font-medium`}>Two-Factor Authentication</Text>
            <Text style={tw`text-gray-600 text-xs mt-1`}>Adds an extra layer of security to your account.</Text>
          </View>
          <Switch value={twoFactorEnabled} onValueChange={toggle2FA} />
        </View>

        {/* Change Password */}
        <TouchableOpacity style={tw`flex-row items-center bg-white p-3.5 rounded-xl mb-4`} onPress={handleChangePassword}>
          <Icon name="lock-closed-outline" size={22} color="#555" />
          <Text style={tw`ml-2.5 text-base text-gray-800`}>Change Password</Text>
        </TouchableOpacity>

        {/* App Permissions */}
        <Text style={tw`text-base font-semibold my-2.5`}>App Permissions</Text>
        {Object.entries(appPermissions).map(([key, value]) => (
          <View key={key} style={tw`bg-white py-3.5 px-4 rounded-xl mb-2.5 flex-row justify-between items-center`}>
            <Text style={tw`text-base font-medium`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <Switch value={value} onValueChange={() => togglePermission(key as keyof typeof appPermissions)} />
          </View>
        ))}

        {/* Privacy Policy */}
        <TouchableOpacity style={tw`flex-row items-center bg-white p-3.5 rounded-xl mb-4`} onPress={handlePrivacyPolicy}>
          <Icon name="document-text-outline" size={22} color="#555" />
          <Text style={tw`ml-2.5 text-base text-gray-800`}>View Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;