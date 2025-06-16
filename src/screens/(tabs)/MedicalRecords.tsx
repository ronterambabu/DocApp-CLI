import tw from 'twrnc';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
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
  const canGoBack = navigation.canGoBack();
  return (
    <View style={tw`flex-1 bg-gray-50 pt-0`}>
      {/* Custom StatusBar for this screen (optional, can be removed if global) */}
      {Platform.OS === 'android' && (
        <StatusBar backgroundColor="#202b6d" barStyle="light-content" />
      )}
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-4 bg-[#202b6d] rounded-b-3xl shadow-md`}>
        {canGoBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 bg-white rounded-full shadow-md`}
          >
            <ArrowLeft size={22} color="#202b6d" />
          </TouchableOpacity>
        ) : (
          <View style={tw`w-10`} />
        )}
        <Text style={tw`text-xl font-bold flex-1 text-center text-white -ml-6`}>
          Medical Records
        </Text>
        <View style={tw`flex-row gap-4`}>
          <TouchableOpacity style={tw`relative`}>
            <ShoppingCart size={22} color="#fff" />
            <View style={tw`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500`} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={tw`mx-4 mt-4 mb-2 flex-row items-center bg-gray-200 px-3 rounded-full h-11 shadow-sm`}>
        <Search size={20} color="#666" />
        <TextInput
          placeholder="Search your file..."
          placeholderTextColor="#888"
          style={tw`flex-1 mx-2 text-base`}
        />
        <TouchableOpacity>
          <SlidersHorizontal size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Records Grid */}
      <ScrollView contentContainerStyle={tw`flex-row flex-wrap justify-between gap-4 pb-28 px-4`}>
        {records.map((item, index) => (
          <View
            key={index}
            style={tw`w-[47%] bg-white rounded-2xl p-4 shadow-lg`}
          >
            <View
              style={[
                tw`w-12 h-12 rounded-xl justify-center items-center mb-3`,
                { backgroundColor: item.color },
              ]}
            >
              <Folder size={28} color="white" />
            </View>
            <View style={tw`flex-row justify-between items-start`}>
              <Text style={tw`text-base font-semibold flex-1 text-gray-800`}>
                {item.title}
              </Text>
              <TouchableOpacity>
                <MoreVertical size={20} color="#999" />
              </TouchableOpacity>
            </View>
            <Text style={tw`text-xs text-gray-500 my-1`}>
              {item.files} files
            </Text>
            <View style={tw`flex-row justify-between items-center mt-1`}>
              <Text style={tw`text-xs text-gray-600`}>{item.size}</Text>
              <View style={tw`flex-row`}>
                {item.avatars.map((a, i) => (
                  <View
                    key={i}
                    style={[
                      tw`w-7 h-7 rounded-full items-center justify-center bg-gray-200 border-2 border-white`,
                      { marginLeft: i === 0 ? 0 : -10 },
                    ]}
                  >
                    <Text style={tw`text-base`}>{a}</Text>
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
