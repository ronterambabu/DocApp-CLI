import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
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
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View
        style={[
          tw`flex-1`,
          { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
        ]}
      >
        <ScrollView
          contentContainerStyle={tw`px-5 pt-4 pb-10`}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={tw`flex-row items-center mb-5`}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`pr-3`}>
            <ArrowLeft size={24} color="#222B45" />
          </TouchableOpacity>

            <Text style={tw`text-xl font-bold text-gray-800 flex-1 text-center mr-6`}>
              Help Centre
            </Text>
          </View>

          <Text style={tw`text-base text-gray-600 mb-6`}>
            How can we assist you today?
          </Text>

          {/* Help Topics */}
          <View style={tw`mb-8`}>
            {helpTopics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                onPress={() => handleHelpTopicPress(topic)}
                style={tw`bg-white rounded-xl px-4 py-4 mb-3 flex-row items-center justify-between shadow`}
              >
                <View style={tw`flex-row items-center`}>
                  <Icon name={topic.icon} size={22} color="#007bff" />
                  <Text style={tw`ml-3 text-base text-gray-800 font-medium`}>
                    {topic.title}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color="#aaa" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Support */}
          <View>
            <Text style={tw`text-base font-semibold mb-3 text-gray-700`}>
              Still need help?
            </Text>
            <TouchableOpacity
              style={tw`bg-blue-600 py-4 px-4 rounded-xl flex-row items-center justify-center`}
              onPress={handleContactSupport}
            >
              <Icon name="chatbubbles-outline" size={20} color="#fff" />
              <Text style={tw`text-white text-base ml-2 font-semibold`}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HelpCentreScreen;
