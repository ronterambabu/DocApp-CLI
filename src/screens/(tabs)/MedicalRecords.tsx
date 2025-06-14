import tw from 'twrnc';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  ShoppingCart,
  Bell,
  Folder,
  ArrowLeft,
} from 'lucide-react-native';

const records = [
  {
    title: 'X-Ray',
    files: 15,
    size: '20.3 Mb',
    color: '#B39DDB',
    avatars: ['👨‍⚕️', '👩‍⚕️', '🧑‍⚕️'],
  },
  {
    title: 'Diagnostic reports',
    files: 5,
    size: '17.5 Mb',
    color: '#F48FB1',
    avatars: ['👩‍⚕️', '👨‍⚕️'],
  },
  {
    title: 'Med reports',
    files: 27,
    size: '32.4 Mb',
    color: '#90A4AE',
    avatars: ['👨‍⚕️', '🧑‍⚕️'],
  },
  {
    title: 'All Blood test reports',
    files: 25,
    size: '25.6 Mb',
    color: '#F06292',
    avatars: ['👨‍⚕️', '👩‍⚕️'],
  },
  {
    title: 'Lab test',
    files: 16,
    size: '21.1 Mb',
    color: '#FFB74D',
    avatars: ['👩‍⚕️', '👨‍⚕️'],
  },
  {
    title: 'Other reports',
    files: 10,
    size: '12.7 Mb',
    color: '#90A4AE',
    avatars: ['👨‍⚕️'],
  },
];

const MedicalRecordsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-gray-50 pt-12 px-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2 bg-white rounded-full shadow-md`}
        >
          <ArrowLeft size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-semibold flex-1 text-center -ml-6`}>
          Record File
        </Text>
        <View style={tw`flex-row gap-4`}>
          <TouchableOpacity style={tw`relative`}>
            <ShoppingCart size={22} />
            <View style={tw`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500`} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={tw`mb-4 flex-row items-center bg-gray-200 px-3 rounded-full h-10`}>
        <Search size={20} color="#666" />
        <TextInput
          placeholder="Search your file..."
          placeholderTextColor="#888"
          style={tw`flex-1 mx-2 text-sm`}
        />
        <SlidersHorizontal size={20} color="#666" />
      </View>

      {/* Records Grid */}
      <ScrollView contentContainerStyle={tw`flex-row flex-wrap justify-between gap-4 pb-24`}>
        {records.map((item, index) => (
          <View
            key={index}
            style={tw`w-[47%] bg-white rounded-2xl p-4 shadow-md`}
          >
            <View
              style={[
                tw`w-10 h-10 rounded-lg justify-center items-center mb-3`,
                { backgroundColor: item.color },
              ]}
            >
              <Folder size={24} color="white" />
            </View>
            <View style={tw`flex-row justify-between items-start`}>
              <Text style={tw`text-sm font-semibold flex-1`}>{item.title}</Text>
              <MoreVertical size={18} color="#999" />
            </View>
            <Text style={tw`text-xs text-gray-500 my-1`}>
              {item.files} files
            </Text>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-xs text-gray-600`}>{item.size}</Text>
              <View style={tw`flex-row`}>
                {item.avatars.map((a, i) => (
                  <View
                    key={i}
                    style={[
                      tw`w-6 h-6 rounded-full items-center justify-center bg-gray-200`,
                      { marginLeft: i === 0 ? 0 : -8 },
                    ]}
                  >
                    <Text style={tw`text-xs`}>{a}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MedicalRecordsScreen;
