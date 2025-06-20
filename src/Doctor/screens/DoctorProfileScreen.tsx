import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  UserSquare2,
  Medal,
  Clock,
  BadgeDollarSign,
  MapPin,
  Star,
  Award,
  ChevronRight,
  ThumbsUp,
  Edit,
  ArrowLeft,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { DoctorStackParamList } from '../types/navigation';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const DoctorProfileScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  const menuItems = [
    {
      id: 1,
      title: 'Personal Information',
      subtitle: 'Update your personal details and credentials',
      icon: <UserSquare2 size={24} color="#202b6d" />,
      route: 'PersonalInfo' as const,
    },
    {
      id: 2,
      title: 'Specializations',
      subtitle: 'Manage your specialties and expertise',
      icon: <Medal size={24} color="#202b6d" />,
      route: 'Specializations' as const,
    },
    {
      id: 3,
      title: 'Consultation Hours',
      subtitle: 'Set your availability and consultation timings',
      icon: <Clock size={24} color="#202b6d" />,
      route: 'Availability' as const,
    },
    {
      id: 4,
      title: 'Consultation Fees',
      subtitle: 'Manage your consultation charges',
      icon: <BadgeDollarSign size={24} color="#202b6d" />,
      route: 'ConsultationFees' as const,
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-[#202b6d] px-4 py-3`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={tw`mr-4`}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-xl font-bold flex-1`}>Doctor Profile</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('EditDoctorProfile')}
          >
            <Edit size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={tw`bg-white p-4 shadow-sm`}>
          <View style={tw`flex-row`}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={tw`w-24 h-24 rounded-2xl`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-[#202b6d] text-xl font-bold`}>Dr. John Doe</Text>
              <Text style={tw`text-[#1d9be3] text-base`}>Cardiologist</Text>
              <View style={tw`flex-row items-center mt-2`}>
                <MapPin size={16} color="#6B7280" />
                <Text style={tw`text-gray-600 ml-1`}>Mumbai, Maharashtra</Text>
              </View>
              <View style={tw`flex-row items-center mt-1`}>
                <Clock size={16} color="#6B7280" />
                <Text style={tw`text-gray-600 ml-1`}>10+ Years Experience</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={tw`flex-row justify-between mt-6 bg-[#bbd4fa] p-4 rounded-xl`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-[#202b6d] text-lg font-bold`}>4.8</Text>
              <View style={tw`flex-row items-center`}>
                <Star size={14} color="#202b6d" />
                <Text style={tw`text-[#202b6d] ml-1`}>Rating</Text>
              </View>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-[#202b6d] text-lg font-bold`}>15K+</Text>
              <View style={tw`flex-row items-center`}>
                <ThumbsUp size={14} color="#202b6d" />
                <Text style={tw`text-[#202b6d] ml-1`}>Reviews</Text>
              </View>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-[#202b6d] text-lg font-bold`}>10+</Text>
              <View style={tw`flex-row items-center`}>
                <Award size={14} color="#202b6d" />
                <Text style={tw`text-[#202b6d] ml-1`}>Years</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={tw`px-4 mt-4`}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`bg-white p-4 rounded-xl mb-3 shadow-sm flex-row items-center`}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={tw`w-12 h-12 rounded-full bg-[#bbd4fa] items-center justify-center mr-4`}>
                {item.icon}
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-[#202b6d] font-medium text-lg`}>{item.title}</Text>
                <Text style={tw`text-gray-600 text-sm mt-1`}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw`h-6`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfileScreen;
