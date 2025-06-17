import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  ArrowLeft,
  Search as LucideSearch,
  MapPin,
  ThumbsUp,
  MessageCircle,
  Star,
  IndianRupee,
  Calendar as LucideCalendar,
  Video,
  Hospital,
  Filter,
  SlidersHorizontal,
  Clock,
  Users,
  X,
} from 'lucide-react-native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';

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

type RootStackParamList = {
  Doctors: { specialty?: string; mode?: string };
};

// Add filter types
interface Filters {
  gender: string;
  experience: string;
  fee: string;
  availability: string;
}

const FindDoctorsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'Doctors'>>();
  const initialSpecialty = route.params?.specialty || '';
  const initialMode = route.params?.mode || 'inclinic';

  const [search, setSearch] = useState(initialSpecialty);
  const [activeTab, setActiveTab] = useState(initialMode);

  // Ensure tab switches when navigating from ConsultOptions
  useEffect(() => {
    if (route.params?.mode) {
      setActiveTab(route.params.mode);
    }
  }, [route.params?.mode]);

  const [location, setLocation] = useState('Hyderabad');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    gender: 'All',
    experience: 'All',
    fee: 'All',
    availability: 'All',
  });
  const [sortBy, setSortBy] = useState('Relevance');

  const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Experience: High to Low', value: 'experience_desc' },
    { label: 'Fee: Low to High', value: 'fee_asc' },
    { label: 'Rating: High to Low', value: 'rating_desc' },
    { label: 'Earliest Available', value: 'availability' },
  ];

  const filterOptions = {
    gender: ['All', 'Male', 'Female'],
    experience: ['All', '0-5 years', '5-10 years', '10+ years'],
    fee: ['All', 'Under ₹500', '₹500-1000', 'Above ₹1000'],
    availability: ['All', 'Available Today', 'Available Tomorrow', 'This Week'],
  };

  const applyFilters = (doctors: any[]) => {
    return doctors.filter((doctor) => {
      let matchesFilters = true;

      if (filters.gender !== 'All' && doctor.gender !== filters.gender) {
        matchesFilters = false;
      }

      if (filters.experience !== 'All') {
        const years = parseInt(doctor.experience);
        if (filters.experience === '0-5 years' && years > 5) matchesFilters = false;
        if (filters.experience === '5-10 years' && (years <= 5 || years > 10)) matchesFilters = false;
        if (filters.experience === '10+ years' && years <= 10) matchesFilters = false;
      }

      return matchesFilters;
    });
  };

  const applySorting = (doctors: any[]) => {
    return [...doctors].sort((a, b) => {
      switch (sortBy) {
        case 'experience_desc':
          return b.experience - a.experience;
        case 'fee_asc':
          return a.fee - b.fee;
        case 'rating_desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'availability':
          return new Date(a.nextAvailable).getTime() - new Date(b.nextAvailable).getTime();
        default:
          return 0;
      }
    });
  };

  const filteredDoctors = applySorting(
    applyFilters(
      doctors.filter(
        (doctor) =>
          (search === '' ||
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(search.toLowerCase())) &&
          doctor.type === activeTab &&
          doctor.location.toLowerCase().includes(location.toLowerCase())
      )
    )
  );

  const renderFilterModal = () => (
    <Modal visible={filterModalVisible} transparent animationType="slide">
      <View style={tw`flex-1 bg-black/50 justify-end`}>
        <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 px-4`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <Text style={tw`text-xl font-bold`}>Filters</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Text style={tw`text-blue-600`}>Done</Text>
            </TouchableOpacity>
          </View>

          {Object.entries(filterOptions).map(([key, options]) => (
            <View key={key} style={tw`mb-6`}>
              <Text style={tw`text-lg font-semibold mb-3 capitalize`}>{key}</Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setFilters((prev) => ({ ...prev, [key]: option }))}
                    style={tw`px-4 py-2 rounded-full border ${
                      filters[key as keyof Filters] === option
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    <Text
                      style={tw`${
                        filters[key as keyof Filters] === option
                          ? 'text-white font-semibold'
                          : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal visible={sortModalVisible} transparent animationType="slide">
      <View style={tw`flex-1 bg-black/50 justify-end`}>
        <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 px-4`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <Text style={tw`text-xl font-bold`}>Sort By</Text>
            <TouchableOpacity onPress={() => setSortModalVisible(false)}>
              <Text style={tw`text-blue-600`}>Done</Text>
            </TouchableOpacity>
          </View>

          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                setSortBy(option.value);
                setSortModalVisible(false);
              }}
              style={tw`py-4 border-b border-gray-100`}
            >
              <Text
                style={tw`${
                  sortBy === option.value
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const insets = useSafeAreaInsets();

  return (
    <View style={tw`flex-1 bg-white`}>
      <PageHeader
        title="Find Doctors"
        backgroundColor="#202b6d"
        textColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => setLocationModalVisible(true)} style={tw`p-2`}>
            <MapPin size={24} color="#fff" />
          </TouchableOpacity>
        }
      />
      {/* Header with search and specialty chip */}
      <View style={tw`px-4 pb-2 pt-2`}>
        <View style={tw`flex-row items-center bg-gray-100 rounded-xl px-3 py-2`}>
          <LucideSearch size={20} color="#888" />
          <TextInput
            style={tw`flex-1 ml-2 text-base`}
            placeholder="Search doctors, specialties..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          {(search || initialSpecialty) ? (
            <TouchableOpacity onPress={() => setSearch('')} style={tw`ml-2`}>
              <X size={20} color="#888" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Tabs and Filters */}
      <View style={tw`px-4`}>
        <View style={tw`flex-row justify-between mb-3`}>
          <TouchableOpacity
            onPress={() => setActiveTab('inclinic')}
            style={tw`flex-1 flex-row items-center justify-center py-3 rounded-l-xl ${
              activeTab === 'inclinic' ? 'bg-purple-600 shadow-lg' : 'bg-white border border-gray-300'
            }`}
          >
            <Hospital size={20} color={activeTab === 'inclinic' ? '#fff' : '#7c3aed'} />
            <Text
              style={tw`${
                activeTab === 'inclinic' ? 'text-white font-bold ml-2' : 'text-gray-700 ml-2'
              }`}
            >
              In-Clinic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('video')}
            style={tw`flex-1 flex-row items-center justify-center py-3 rounded-r-xl ${
              activeTab === 'video' ? 'bg-green-600 shadow-lg' : 'bg-white border border-gray-300'
            }`}
          >
            <Video size={20} color={activeTab === 'video' ? '#fff' : '#059669'} />
            <Text
              style={tw`${
                activeTab === 'video' ? 'text-white font-bold ml-2' : 'text-gray-700 ml-2'
              }`}
            >
              Video Consult
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-4 px-4`}>
            <TouchableOpacity
              onPress={() => setFilterModalVisible(true)}
              style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-2`}
            >
              <Filter size={16} color="#666" />
              <Text style={tw`ml-2 text-gray-700`}>Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortModalVisible(true)}
              style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-2`}
            >
              <SlidersHorizontal size={16} color="#666" />
              <Text style={tw`ml-2 text-gray-700`}>Sort</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-2`}
            >
              <Clock size={16} color="#666" />
              <Text style={tw`ml-2 text-gray-700`}>Availability</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-2`}
            >
              <Users size={16} color="#666" />
              <Text style={tw`ml-2 text-gray-700`}>Gender</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Results Count */}
      <View style={tw`px-4 mb-2`}>
        <Text style={tw`text-gray-600`}>
          {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} found
        </Text>
      </View>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4 pb-6`}
        renderItem={({ item }) => (
          <View style={tw`mb-4`}>
            <View style={tw`bg-white rounded-xl border border-gray-200 p-4`}>
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
                  disabled={activeTab !== 'inclinic'}
                  onPress={() => {
                    if (activeTab === 'inclinic') {
                      navigation.navigate('DoctorAvailability', { doctor: item });
                    }
                  }}
                >
                  <Text style={tw`text-white font-semibold text-sm`}>
                    {activeTab === 'video' ? 'Start Video Call' : 'Book Visit'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {renderFilterModal()}
      {renderSortModal()}

      {/* Location Modal */}
      <Modal visible={locationModalVisible} transparent animationType="slide">
        <View style={tw`flex-1 bg-black/50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 px-4`}>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-xl font-bold`}>Select Location</Text>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Text style={tw`text-blue-600`}>Done</Text>
              </TouchableOpacity>
            </View>

            {locations.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() => {
                  setLocation(loc);
                  setLocationModalVisible(false);
                }}
                style={tw`py-4 border-b border-gray-100`}
              >
                <Text
                  style={tw`${
                    location === loc
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  {loc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindDoctorsScreen;