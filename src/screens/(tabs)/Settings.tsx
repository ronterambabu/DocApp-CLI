import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc'; // Import twrnc for Tailwind CSS
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tw`pb-20`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between mb-2.5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#222B45" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-center flex-1`}>Settings</Text>
          <View style={tw`w-6`} />
        </View>

        {/* Intro Section */}
        <View style={tw`flex-row items-center my-4 bg-white p-3.5 rounded-3xl shadow-sm`}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/65.jpg' }}
            style={tw`w-15 h-15 rounded-full mr-3.5`}
          />
          <View>
            <Text style={tw`text-lg font-bold text-blue-500`}>Dr. John Doe</Text>
            <Text style={tw`text-sm text-gray-600 mt-1`}>Cardiologist</Text>
          </View>
        </View>

        {/* Toggle Settings */}
        <View style={tw`mb-7.5`}>
          <View style={tw`bg-white flex-row items-center justify-between p-3.5 rounded-xl mb-2.5 shadow-sm`}>
            <Icon name="notifications-outline" size={22} color="#007bff" />
            <Text style={tw`flex-1 ml-3 text-base`}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>

          <View style={tw`bg-white flex-row items-center justify-between p-3.5 rounded-xl mb-2.5 shadow-sm`}>
            <Icon name="moon-outline" size={22} color="#007bff" />
            <Text style={tw`flex-1 ml-3 text-base`}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
          </View>
        </View>

        {/* Navigation Links */}
        <View style={tw`mb-7.5`}>
          <TouchableOpacity style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}>
            <Icon name="key-outline" size={22} color="#007bff" />
            <Text style={tw`flex-1 ml-3 text-base`}>Change Password</Text>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}>
            <Icon name="language-outline" size={22} color="#007bff" />
            <Text style={tw`flex-1 ml-3 text-base`}>Language</Text>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}>
            <Icon name="information-circle-outline" size={22} color="#007bff" />
            <Text style={tw`flex-1 ml-3 text-base`}>About App</Text>
            <Icon name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={tw`bg-red-600 flex-row items-center justify-center p-3.5 rounded-xl mt-2.5 min-h-12`} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#fff" />
          <Text style={tw`text-white text-base ml-2`}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;