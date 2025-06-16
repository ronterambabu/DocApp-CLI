import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search as LucideSearch, MapPin, ThumbsUp, MessageCircle, Star, IndianRupee, Calendar as LucideCalendar } from 'lucide-react-native';
import tw from 'twrnc';

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
  const navigation = useNavigation();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) &&
      doctor.type === activeTab &&
      doctor.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <View style={tw`flex-1 bg-white px-4`}>
      {/* Header */}
      <View style={[tw`pb-2`, { paddingTop: insets.top + 10 }]}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#222B45" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold flex-1 text-center`}>Find Doctors</Text>
          <View style={tw`w-8`} />
        </View>
      </View>
      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mt-3 mb-2`}>
        <LucideSearch size={20} color="#888" />
        <TextInput
          style={tw`flex-1 ml-2 text-base`}
          placeholder="Search doctors..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Tabs */}
      <View style={tw`flex-row justify-between mb-3`}>
        <TouchableOpacity
          onPress={() => setActiveTab('inclinic')}
          style={tw`flex-1 items-center py-2 ${
            activeTab === 'inclinic' ? 'bg-purple-600' : 'bg-white border border-gray-300'
          } rounded-l-xl`}>
          <Text style={tw`${activeTab === 'inclinic' ? 'text-white font-semibold' : 'text-gray-600'}`}>
            In-Clinic Appointment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('video')}
          style={tw`flex-1 items-center py-2 ${
            activeTab === 'video' ? 'bg-purple-600' : 'bg-white border border-gray-300'
          } rounded-r-xl`}>
          <Text style={tw`${activeTab === 'video' ? 'text-white font-semibold' : 'text-gray-600'}`}>
            Video Consultation
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters Row */}
      <View style={tw`flex-row justify-between mb-2`}>
        <TouchableOpacity
          style={tw`bg-gray-100 px-3 py-1 rounded-full`}
          onPress={() =>
            setConsultationTime((prev) =>
              prev === 'Now' ? 'Later' : prev === 'Later' ? 'Now or Later' : 'Now'
            )
          }
        >
          <Text style={tw`text-sm`}>{consultationTime}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-gray-100 px-3 py-1 rounded-full`}
          onPress={() =>
            setGenderFilter((prev) =>
              prev === 'All' ? 'Female' : prev === 'Female' ? 'Male' : 'All'
            )
          }
        >
          <Text style={tw`text-sm`}>{genderFilter}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-gray-100 px-3 py-1 rounded-full`}
          onPress={() => setSortModalVisible(true)}
        >
          <Text style={tw`text-sm`}>Sort/Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Instant Text */}
      <Text style={tw`text-sm text-black font-semibold mt-1`}>
        ⚡ Doctors Available Instantly
      </Text>
      <Text style={tw`text-xs text-purple-600 mb-3`}>
        {activeTab === 'video' ? 'Online across India' : 'Nearby clinics available for walk-in'}
      </Text>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-6`}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-xl border border-gray-200 p-4 mb-4`}>
            <View style={tw`flex-row`}>
              <Image source={{ uri: item.image }} style={tw`w-18 h-18 rounded-full`} />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-base font-bold text-gray-900`}>{item.name}</Text>
                <Text style={tw`text-sm text-gray-600`}>{item.specialty}</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.experience} yrs exp</Text>
                <Text style={tw`text-xs text-green-600 mt-0.5`}>🟢 Online Now</Text>
                <View style={tw`flex-row flex-wrap items-center mt-1`}>
                  {item.recommendation && (
                    <View style={tw`flex-row items-center bg-green-100 px-2 py-0.5 rounded-full mr-1`}>
                      <ThumbsUp size={12} color="#047857" />
                      <Text style={tw`text-xs text-green-800 ml-1`}>
                        {item.recommendation} Recommended
                      </Text>
                    </View>
                  )}
                  {item.rating && (
                    <View style={tw`flex-row items-center bg-purple-100 px-2 py-0.5 rounded-full mt-1 ml-1`}>
                      <Star size={12} color="#7c3aed" />
                      <Text style={tw`text-xs text-purple-800 ml-1`}>{item.rating}</Text>
                    </View>
                  )}
                </View>
                {item.patientStories && (
                  <View style={tw`flex-row items-center mt-1`}>
                    <MessageCircle size={12} color="#6B7280" />
                    <Text style={tw`text-xs text-gray-500 ml-1`}>
                      {item.patientStories} Patient Stories
                    </Text>
                  </View>
                )}
                <View style={tw`flex-row items-start mt-1`}>
                  <MapPin size={12} color="#6B7280" style={tw`mt-0.5`} />
                  <Text style={tw`text-xs text-gray-500 ml-1`}>
                    {item.location} • {item.clinic}
                  </Text>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <IndianRupee size={10} color="#6B7280" />
                  <Text style={tw`text-xs text-gray-500 ml-1`}>
                    {item.fee} Consultation Fees
                  </Text>
                </View>
                <Text style={tw`text-xs text-green-700 font-semibold mt-1`}>
                  NEXT AVAILABLE AT
                </Text>
                <Text style={tw`text-xs text-black`}>{item.nextAvailable}</Text>
              </View>
            </View>
            <View style={tw`flex-row mt-3`}>
              <TouchableOpacity style={tw`flex-1 border border-blue-500 py-2 rounded-lg mr-2 items-center`}>
                <Text style={tw`text-blue-600 font-semibold text-sm`}>Contact Clinic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1 bg-blue-600 py-2 rounded-lg items-center`}
                onPress={() => navigation.navigate('Doctors', { specialty, mode })}
              >
                <Text style={tw`text-white font-semibold text-sm`}>
                  {activeTab === 'video' ? 'Start Video Call' : 'Book Visit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Location Modal */}
      <Modal visible={locationModalVisible} transparent animationType="fade">
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Select Location</Text>
            {locations.map((loc) => (
              <Pressable
                key={loc}
                onPress={() => {
                  setLocation(loc);
                  setLocationModalVisible(false);
                }}
                style={tw`py-3 rounded-lg`}
              >
                <Text style={tw`text-base text-gray-900`}>{loc}</Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setLocationModalVisible(false)}
              style={tw`mt-4 bg-blue-600 py-3 rounded-lg items-center`}
            >
              <Text style={tw`text-white font-semibold text-base`}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={sortModalVisible} transparent animationType="fade">
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6 shadow-lg`}>
            <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Sort By</Text>
            {['None', 'Rating', 'Experience', 'Consultation Fee'].map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setSortOption(option);
                  setSortModalVisible(false);
                }}
                style={tw`py-3 rounded-lg`}
              >
                <Text style={tw`${sortOption === option ? 'text-blue-600 font-semibold' : 'text-gray-900'} text-base`}>
                  {option}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setSortModalVisible(false)}
              style={tw`mt-4 bg-blue-600 py-3 rounded-lg items-center`}
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