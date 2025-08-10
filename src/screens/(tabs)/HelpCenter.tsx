import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  User, CreditCard, Calendar, FileText, Lock, MessageSquare,
  ChevronRight
} from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const HelpCenterScreen = () => {
  const navigation = useNavigation();
  
  const helpTopics = [
    { id: 1, title: 'Account Issues', icon: User },
    { id: 2, title: 'Payment & Billing', icon: CreditCard },
    { id: 3, title: 'Booking Support', icon: Calendar },
    { id: 4, title: 'Test Results', icon: FileText },
    { id: 5, title: 'Privacy & Security', icon: Lock },
  ];

  type HelpTopic = { id: number; title: string; icon: any };

  const handleHelpTopicPress = (topic: HelpTopic) => {
    Alert.alert(topic.title, 'More detailed support can be added here.');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support team will get in touch with you soon.');
  };

  return (
    <PageLayout
      title="Help Center"
        headerBackgroundColor="#16a34a"
      scrollable={true}
    >
      <View style={tw`px-4`}>
        <Text style={tw`text-base text-green-700 mb-6`}>
          How can we assist you today?
        </Text>

        {/* Help Topics */}
        <View style={tw`mb-8`}>
          {helpTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              onPress={() => handleHelpTopicPress(topic)}
              style={tw`bg-green-50 rounded-xl px-4 py-4 mb-3 flex-row items-center justify-between shadow`}
              accessibilityRole="button"
              accessibilityLabel={topic.title}
            >
              <View style={tw`flex-row items-center`}>
                <topic.icon size={22} color="#007bff" />
                <Text style={tw`ml-3 text-base text-green-800 font-medium`}>
                  {topic.title}
                </Text>
              </View>
              <ChevronRight size={20} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Support */}
        <View>
          <Text style={tw`text-base font-semibold mb-3 text-green-800`}>
            Still need help?
          </Text>
          <TouchableOpacity
            style={tw`bg-green-600 py-4 px-4 rounded-xl flex-row items-center justify-center`}
            onPress={handleContactSupport}
            accessibilityRole="button"
            accessibilityLabel="Contact Support"
          >
            <MessageSquare size={20} color="#fff" />
            <Text style={tw`text-white text-base ml-2 font-semibold`}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageLayout>
  );
};

export default HelpCenterScreen;
