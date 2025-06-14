import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const popularDoctors = [
  {
    id: '1',
    name: 'Dr. Truluck Nik',
    specialty: 'Medicine Specialist',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Dr. Tranquilli',
    specialty: 'Pathology Specialist',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'Dr. Tim John',
    specialty: 'Skin Specialist',
    image: 'https://via.placeholder.com/100',
  },
];

const doctorList = [
  {
    id: '1',
    name: 'Dr. Pediatrician',
    specialty: 'Specialist Cardiologist',
    rating: 2.4,
    views: 2475,
    liked: true,
    image: 'https://via.placeholder.com/80',
  },
  {
    id: '2',
    name: 'Dr. Mistry Brick',
    specialty: 'Specialist Dentist',
    rating: 2.8,
    views: 2893,
    liked: false,
    image: 'https://via.placeholder.com/80',
  },
  {
    id: '3',
    name: 'Dr. Ether Wall',
    specialty: 'Specialist Cancer',
    rating: 2.7,
    views: 2754,
    liked: true,
    image: 'https://via.placeholder.com/80',
  },
  {
    id: '4',
    name: 'Dr. Johan Smith',
    specialty: 'Specialist Cardiologist',
    rating: 3.0,
    views: 2000,
    liked: false,
    image: 'https://via.placeholder.com/80',
  },
];

const DoctorPopularScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <ScrollView>
        {/* Header */}
        <View style={tw`flex-row px-4 py-4 items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-semibold`}>Popular Doctor</Text>
          <TouchableOpacity>
            <Icon name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Popular Doctor */}
        <View style={tw`flex-row justify-between px-4 items-center`}>
          <Text style={tw`text-lg font-bold px-4 mt-2.5 mb-2.5`}>Popular Doctor</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-blue-500`}>See all ›</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularDoctors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tw`w-35 bg-white ml-4 p-2.5 rounded-3xl shadow-sm elevation-2`}>
              <Image source={{ uri: item.image }} style={tw`w-full h-20 rounded-2xl`} />
              <Text style={tw`font-bold text-sm mt-1.5`}>{item.name}</Text>
              <Text style={tw`text-xs text-gray-600 mb-1`}>{item.specialty}</Text>
              <View style={tw`flex-row items-center`}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={14} color="#fbc02d" />
                ))}
              </View>
            </View>
          )}
        />

        {/* Category */}
        <Text style={tw`text-lg font-bold px-4 mt-2.5 mb-2.5`}>Category</Text>
        {doctorList.map((doctor) => (
          <View key={doctor.id} style={tw`flex-row px-3 mx-4 mb-3 bg-white rounded-3xl shadow-sm elevation-2 items-center`}>
            <Image source={{ uri: doctor.image }} style={tw`w-15 h-15 rounded-full`} />
            <View style={tw`flex-1 ml-2.5`}>
              <Text style={tw`font-bold text-sm`}>{doctor.name}</Text>
              <Text style={tw`text-xs text-gray-500 my-1`}>{doctor.specialty}</Text>
              <View style={tw`flex-row items-center`}>
                <Icon name="star" size={16} color="#fbc02d" />
                <Text style={tw`ml-1`}>{doctor.rating} ({doctor.views} views)</Text>
              </View>
            </View>
            <Icon
              name={doctor.liked ? 'favorite' : 'favorite-border'}
              size={24}
              color={doctor.liked ? 'red' : 'gray'}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorPopularScreen;