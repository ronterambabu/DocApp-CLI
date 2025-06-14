import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { ArrowLeft, Search, MapPin } from 'lucide-react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';

// Placeholder Unsplash image for doctors
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1652288901598-27c92b47e8e7?auto=format&fit=crop&w=200&q=80';

const doctors = [
  {
    id: '1',
    name: 'Dr. Navya Chowdary',
    specialty: 'Dermatologist',
    gender: 'Female',
    experience: 15,
    rating: '4.8',
    recommendation: '86%',
    patientStories: 22,
    clinic: 'Sasha Luxe Dermatology and Cosmetic Surgery Centre',
    location: 'Madhapur, Hyderabad',
    fee: 1000,
    nextAvailable: '2025-06-06T11:15:00Z',
    type: 'inclinic',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Dr. Soumya Podduturi',
    specialty: 'Dermatologist',
    gender: 'Female',
    experience: 15,
    rating: null,
    recommendation: '95%',
    patientStories: 391,
    clinic: "Dr. Soumya's Aria Skin & Hair Clinic",
    location: 'Kompally, Hyderabad',
    fee: 750,
    nextAvailable: '2025-06-05T19:30:00Z',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=400&q=80',
  },
  // ... other doctors
];

const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Chennai', 'Delhi'];

const FindDoctorsScreen = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('inclinic');
  const [location, setLocation] = useState('Hyderabad');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [genderFilter, setGenderFilter] = useState('All');
  const [consultationTime, setConsultationTime] = useState('Now or Later');
  const [sortOption, setSortOption] = useState('None');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  // Remove router and params from expo-router
  // If you need params, use useRoute and type as needed
  // const route = useRoute<RouteProp<any, any>>();
  // const specialty = route.params?.specialty || 'All Specialties';
  const specialty = 'All Specialties'; // fallback if not using params

  const filteredDoctors = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return doctors
      .filter((doctor) => {
        const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase()) ||
                             doctor.specialty.toLowerCase().includes(search.toLowerCase());
        const matchesTab = doctor.type === activeTab;
        const matchesLocation = doctor.location.toLowerCase().includes(location.toLowerCase());
        const matchesGender = genderFilter === 'All' || doctor.gender === genderFilter;
        const nextAvailableDate = new Date(doctor.nextAvailable);
        const matchesTime =
          consultationTime === 'Now or Later' ||
          (consultationTime === 'Now' && nextAvailableDate <= tomorrow) ||
          (consultationTime === 'Later' && nextAvailableDate > tomorrow);
        return matchesSearch && matchesTab && matchesLocation && matchesGender && matchesTime;
      })
      .sort((a, b) => {
        if (sortOption === 'Rating') {
          return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        } else if (sortOption === 'Experience') {
          return b.experience - a.experience;
        } else if (sortOption === 'Consultation Fee') {
          return a.fee - b.fee;
        }
        return 0;
      });
  }, [search, activeTab, location, genderFilter, consultationTime, sortOption]);
const handleBookPress = (doctor) => {
    const mode = doctor.type === 'video' ? 'online' : 'offline';
    navigation.navigate('BookingScreen', { specialty: doctor.specialty, mode, doctorId: doctor.id });
  };


  return (
    <View style={tw`flex-1 bg-gray-100 px-6 pb-8`} accessible>
      {/* Header */}
      <View style={[tw`flex-row items-center justify-between mb-6`, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={tw`p-3 rounded-full bg-white shadow-sm`}
          onPress={() => navigation.goBack()}
          accessible
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft color="#1F2937" size={24} />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-extrabold text-gray-900`}>{specialty}</Text>
        <TouchableOpacity
          style={tw`flex-row items-center`}
          onPress={() => setLocationModalVisible(true)}
          accessible
          accessibilityLabel={`Current location: ${location}`}
          accessibilityRole="button"
        >
          <MapPin size={20} color="#6B7280" />
          <Text style={tw`text-base font-semibold text-blue-700 ml-1`}>{location}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-white rounded-2xl px-4 h-12 mb-4 shadow-sm`}>
        <Search color="#6B7280" size={20} />
        <TextInput
          style={tw`flex-1 ml-3 text-gray-900 text-base`}
          placeholder="Search doctors or specialties"
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          accessible
          accessibilityLabel="Search for doctors or specialties"
        />
      </View>

      {/* Tabs */}
      <View style={tw`flex-row justify-between mb-4`}>
        <Pressable
          style={({ pressed }) =>
            tw`flex-1 items-center py-3 rounded-l-2xl ${
              activeTab === 'inclinic'
                ? 'bg-blue-700'
                : 'bg-white border border-gray-300'
            } ${pressed ? 'opacity-90' : ''}`
          }
          onPress={() => setActiveTab('inclinic')}
          accessible
          accessibilityLabel="In-Clinic Appointment"
          accessibilityRole="button"
        >
          <Text
            style={tw`${
              activeTab === 'inclinic' ? 'text-white font-semibold' : 'text-gray-700'
            } text-base`}
          >
            In-Clinic
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            tw`flex-1 items-center py-3 rounded-r-2xl ${
              activeTab === 'video'
                ? 'bg-blue-700'
                : 'bg-white border border-gray-300'
            } ${pressed ? 'opacity-90' : ''}`
          }
          onPress={() => setActiveTab('video')}
          accessible
          accessibilityLabel="Video Consultation"
          accessibilityRole="button"
        >
          <Text
            style={tw`${
              activeTab === 'video' ? 'text-white font-semibold' : 'text-gray-700'
            } text-base`}
          >
            Video
          </Text>
        </Pressable>
      </View>

      {/* Filters */}
      <View style={tw`flex-row justify-between mb-4 gap-2`}>
        <Pressable
          style={({ pressed }) =>
            tw`bg-white px-4 py-2 rounded-full shadow-sm ${pressed ? 'opacity-90' : ''}`
          }
          onPress={() =>
            setConsultationTime((prev) =>
              prev === 'Now' ? 'Later' : prev === 'Later' ? 'Now or Later' : 'Now'
            )
          }
          accessible
          accessibilityLabel={`Consultation time: ${consultationTime}`}
        >
          <Text style={tw`text-sm text-gray-900`}>{consultationTime}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            tw`bg-white px-4 py-2 rounded-full shadow-sm ${pressed ? 'opacity-90' : ''}`
          }
          onPress={() =>
            setGenderFilter((prev) =>
              prev === 'All' ? 'Female' : prev === 'Female' ? 'Male' : 'All'
            )
          }
          accessible
          accessibilityLabel={`Gender filter: ${genderFilter}`}
        >
          <Text style={tw`text-sm text-gray-900`}>{genderFilter}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            tw`bg-white px-4 py-2 rounded-full shadow-sm ${pressed ? 'opacity-90' : ''}`
          }
          onPress={() => setSortModalVisible(true)}
          accessible
          accessibilityLabel="Sort and filter options"
        >
          <Text style={tw`text-sm text-gray-900`}>Sort/Filters</Text>
        </Pressable>
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-6`}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={
          <View style={tw`flex-1 items-center justify-center py-10`}>
            <Text style={tw`text-lg text-gray-600`}>No doctors found</Text>
            <Text style={tw`text-sm text-gray-500 mt-2`}>Try adjusting your filters</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) =>
              tw`bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-lg ${
                pressed ? 'opacity-90 scale-98' : ''
              }`
            }
            accessible
            accessibilityLabel={`Doctor ${item.name}, ${item.specialty}`}
            accessibilityRole="button"
            onPress={() => handleBookPress(item)}
          >
            <View style={tw`flex-row`}>
              <Image
                source={{ uri: item.image || PLACEHOLDER_IMAGE }}
                style={tw`w-20 h-20 rounded-full bg-gray-200`}
              />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-lg font-bold text-gray-900`}>{item.name}</Text>
                <Text style={tw`text-base text-gray-600`}>{item.specialty}</Text>
                <Text style={tw`text-sm text-gray-500 mt-1`}>{item.experience} years experience</Text>
                <Text style={tw`text-sm text-green-600 font-medium mt-1`}>🟢 Online Now</Text>

                <View style={tw`flex-row flex-wrap items-center mt-2 gap-2`}>
                  {item.recommendation && (
                    <View style={tw`flex-row items-center bg-green-100 px-3 py-1 rounded-full`}>
                      <Feather name="thumbs-up" size={14} color="#047857" />
                      <Text style={tw`text-sm text-green-800 ml-1`}>{item.recommendation}</Text>
                    </View>
                  )}
                  {item.rating && (
                    <View style={tw`flex-row items-center bg-purple-100 px-3 py-1 rounded-full`}>
                      <FontAwesome5 name="star" size={14} color="#7c3aed" />
                      <Text style={tw`text-sm text-purple-800 ml-1`}>{item.rating}</Text>
                    </View>
                  )}
                  {item.patientStories && (
                    <View style={tw`flex-row items-center bg-blue-100 px-3 py-1 rounded-full`}>
                      <Feather name="message-circle" size={14} color="#1E40AF" />
                      <Text style={tw`text-sm text-blue-800 ml-1`}>{item.patientStories} Stories</Text>
                    </View>
                  )}
                </View>

                <View style={tw`flex-row items-start mt-2`}>
                 <Feather name="map-pin" size={14} color="#6B7280" style={tw`mt-0.5`} />
                  <Text style={tw`text-sm text-gray-600 ml-1 flex-1`}>{item.location} • {item.clinic}</Text>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <FontAwesome5 name="rupee-sign" size={12} color="#6B7280" />
                  <Text style={tw`text-sm text-gray-600 ml-1`}>{item.fee} Fees</Text>
                </View>
                <Text style={tw`text-sm text-blue-700 font-semibold mt-2`}>Next Available</Text>
                <Text style={tw`text-sm text-gray-900`}>{new Date(item.nextAvailable).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  day: 'numeric',
                  month: 'short',
                })}</Text>
              </View>
            </View>
            <View style={tw`flex-row mt-4 gap-3`}>
              <TouchableOpacity
                style={tw`flex-1 bg-blue-600 py-3 rounded-lg items-center`}
                onPress={() => handleBookPress(item, item.type)}
                accessible
                accessibilityLabel={activeTab === 'video' ? `Start video call with ${item.name}` : `Book visit with ${item.name}`}
              >
                <Text style={tw`text-white font-semibold text-base`}>
                  {activeTab === 'video' ? 'Start Video Call' : 'Book Visit'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />

      {/* Location Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={locationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Select Location</Text>
            {locations.map((loc) => (
              <Pressable
                key={loc}
                style={({ pressed }) => tw`py-3 ${pressed ? 'bg-gray-100' : ''} rounded-lg`}
                onPress={() => {
                  setLocation(loc);
                  setLocationModalVisible(false);
                  if (Platform.OS !== 'web') {
                    Haptics.selectionAsync();
                  }
                }}
                accessible
                accessibilityLabel={`Select ${loc}`}
              >
                <Text style={tw`text-base text-gray-900`}>{loc}</Text>
              </Pressable>
            ))}
            <Pressable
              style={({ pressed }) => tw`mt-4 bg-blue-600 py-3 rounded-lg items-center ${pressed ? 'opacity-90' : ''}`}
              onPress={() => setLocationModalVisible(false)}
              accessible
              accessibilityLabel="Close location modal"
            >
              <Text style={tw`text-white font-semibold text-base`}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Sort By</Text>
            {['None', 'Rating', 'Experience', 'Consultation Fee'].map((option) => (
              <Pressable
                key={option}
                style={({ pressed }) => tw`py-3 ${pressed ? 'bg-gray-100' : ''} rounded-lg`}
                onPress={() => {
                  setSortOption(option);
                  setSortModalVisible(false);
                  if (Platform.OS !== 'web') {
                    Haptics.selectionAsync();
                  }
                }}
                accessible
                accessibilityLabel={`Sort by ${option}`}
              >
                <Text
                  style={tw`text-base ${sortOption === option ? 'text-blue-600 font-semibold' : 'text-gray-900'}`}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={({ pressed }) => tw`mt-4 bg-blue-600 py-3 rounded-lg items-center ${pressed ? 'opacity-90' : ''}`}
              onPress={() => setSortModalVisible(false)}
              accessible
              accessibilityLabel="Close sort modal"
            >
              <Text style={tw`text-white font-semibold text-base`}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindDoctorsScreen;