import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';

const HelpCentreScreen = () => {
  const navigation = useNavigation();
  const helpTopics = [
    { id: 1, title: 'Account Issues', icon: 'person-outline' },
    { id: 2, title: 'Payment & Billing', icon: 'card-outline' },
    { id: 3, title: 'Booking Support', icon: 'calendar-outline' },
    { id: 4, title: 'Test Results', icon: 'document-text-outline' },
    { id: 5, title: 'Privacy & Security', icon: 'lock-closed-outline' },
  ];

  type HelpTopic = { id: number; title: string; icon: string };

  const handleHelpTopicPress = (topic: HelpTopic) => {
    Alert.alert(topic.title, 'More detailed support can be added here.');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support team will get in touch with you soon.');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100 px-5 pt-2.5`}>
      <ScrollView>
        {/* Header with back button and title */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#222B45" />
          </TouchableOpacity>
          <Text style={tw`text-[22px] font-bold text-gray-800 flex-1 text-center`}>Help Centre</Text>
          <View style={tw`w-6`} />
        </View>

        <Text style={tw`text-base text-gray-600 mb-5`}>How can we assist you today?</Text>

        {/* Help Topics */}
        <View style={tw`mb-7.5`}>
          {helpTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={tw`bg-white rounded-xl p-3.5 mb-3 shadow`}
              onPress={() => handleHelpTopicPress(topic)}
            >
              <Icon name={topic.icon} size={24} color="#007bff" />
              <Text style={tw`flex-1 ml-3 text-base font-medium`}>{topic.title}</Text>
              <Icon name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Support */}
        <View style={tw`mb-7.5`}>
          <Text style={tw`text-base font-semibold mb-2.5`}>Still need help?</Text>
          <TouchableOpacity
            style={tw`bg-blue-600 p-3.5 rounded-xl flex-row items-center justify-center`}
            onPress={handleContactSupport}
          >
            <Icon name="chatbubbles-outline" size={20} color="#fff" />
            <Text style={tw`text-white text-base ml-2`}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCentreScreen;