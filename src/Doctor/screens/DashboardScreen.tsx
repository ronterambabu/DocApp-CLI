import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import {
  Settings,
  Bell,
  UserSquare2,
  MessageSquare,
  ThumbsUp,
  Stethoscope,
  Calendar,
  Users,
  BarChart2,
  FileText,
  Crown,
  BadgeDollarSign,
} from 'lucide-react-native';
import tw from 'twrnc';

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<DoctorStackParamList>>();

  const menuItems = [
    {
      id: 1,
      title: 'Profile',
      icon: <UserSquare2 size={24} color="#202b6d" />,
      route: 'DoctorProfile' as const,
      count: null,
    },
    {
      id: 2,
      title: 'Reach',
      icon: <MessageSquare size={24} color="#202b6d" />,
      route: 'DoctorReach' as const,
      count: '1.9K',
    },
    {
      id: 3,
      title: 'Patient Stories',
      icon: <ThumbsUp size={24} color="#202b6d" />,
      route: 'PatientStories' as const,
      count: '24',
    },
    {
      id: 4,
      title: 'Consult',
      icon: <Stethoscope size={24} color="#202b6d" />,
      route: 'DoctorConsult' as const,
      count: null,
    },
    {
      id: 5,
      title: 'Healthfeed',
      icon: <FileText size={24} color="#202b6d" />,
      route: 'Healthfeed' as const,
      count: null,
    },
    {
      id: 6,
      title: 'Earnings',
      icon: <BadgeDollarSign size={24} color="#202b6d" />,
      route: 'DoctorEarnings' as const,
      count: null,
    },
    {
      id: 7,
      title: 'Prime',
      icon: <Crown size={24} color="#202b6d" />,
      route: 'DoctorPrime' as const,
      count: null,
    },
    {
      id: 8,
      title: 'Reports',
      icon: <BarChart2 size={24} color="#202b6d" />,
      route: 'DoctorReports' as const,
      count: null,
    },
    {
      id: 9,
      title: 'Calendar',
      icon: <Calendar size={24} color="#202b6d" />,
      route: 'DoctorCalendar' as const,
      count: null,
    },
    {
      id: 10,
      title: 'Patients',
      icon: <Users size={24} color="#202b6d" />,
      route: 'DoctorPatients' as const,
      count: null,
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar backgroundColor="#202b6d" barStyle="light-content" />
      
      {/* Header */}
      <View style={tw`bg-[#202b6d] px-4 py-3`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <Image
              source={require('../assets/images/logo.png')}
              style={tw`w-24 h-8`}
              resizeMode="contain"
            />
            <Text style={tw`text-white text-xl font-bold ml-2`}>DOCTO</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity 
              style={tw`mr-4`}
              onPress={() => navigation.navigate('DoctorSettings')}
            >
              <Settings size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DoctorNotifications')}
            >
              <View>
                <Bell size={24} color="white" />
                <View style={tw`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full`} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`mt-4`}>
          <Text style={tw`text-white text-lg`}>SUMMARY</Text>
        </View>
      </View>

      {/* Dashboard Grid */}
      <ScrollView 
        style={tw`flex-1 bg-gray-50`}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row flex-wrap justify-between`}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`w-[31%] bg-white rounded-2xl p-4 mb-4 shadow-sm items-center justify-center`}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={tw`items-center`}>
                {item.icon}
                <Text style={tw`text-[#202b6d] text-xs font-medium mt-2 text-center`}>
                  {item.title}
                </Text>
                {item.count && (
                  <View style={tw`absolute -top-2 -right-2 bg-[#1d9be3] rounded-full px-2 py-0.5`}>
                    <Text style={tw`text-white text-xs font-bold`}>{item.count}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Quick Stats</Text>
          <View style={tw`bg-white rounded-2xl p-4 shadow-sm`}>
            <View style={tw`flex-row justify-between mb-4`}>
              <View>
                <Text style={tw`text-gray-600`}>Today's Appointments</Text>
                <Text style={tw`text-2xl font-bold text-[#202b6d]`}>12</Text>
              </View>
              <View>
                <Text style={tw`text-gray-600`}>Total Patients</Text>
                <Text style={tw`text-2xl font-bold text-[#202b6d]`}>1,234</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View>
                <Text style={tw`text-gray-600`}>This Month's Earnings</Text>
                <Text style={tw`text-2xl font-bold text-[#202b6d]`}>₹45,000</Text>
              </View>
              <View>
                <Text style={tw`text-gray-600`}>Rating</Text>
                <Text style={tw`text-2xl font-bold text-[#202b6d]`}>4.8 ⭐</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
