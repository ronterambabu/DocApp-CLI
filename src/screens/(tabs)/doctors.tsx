import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Linking,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import {
  ArrowLeft,
  MapPin,
  Video,
  Hospital,
  Filter,
  SlidersHorizontal,
  Clock,
  Users,
  Star,
  ThumbsUp,
  LucideSearch,
  X,
} from 'lucide-react-native';
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

  useEffect(() => {
    if (route.params?.mode) {
      setActiveTab(route.params.mode);
    }
  }, [route.params?.mode]);

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
      let matches = true;
      if (filters.gender !== 'All' && doctor.gender !== filters.gender) matches = false;
      if (filters.experience !== 'All') {
        const years = parseInt(doctor.experience);
        if (filters.experience === '0-5 years' && years > 5) matches = false;
        if (filters.experience === '5-10 years' && (years <= 5 || years > 10)) matches = false;
        if (filters.experience === '10+ years' && years <= 10) matches = false;
      }
      return matches;
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

  const handleCardPress = (doctor: any) => {
    navigation.navigate('DoctorProfile', {
      doctor: {
        ...doctor,
        clinics: [
          {
            name: doctor.clinic,
            location: doctor.location,
            fee: doctor.fee,
            slots: [
              {
                date: 'tomorrow',
                times: ['09:30 AM', '10:00 AM'],
              },
            ],
          },
        ],
      },
    });
  };

  const handleBookingPress = (doctor: any, type: 'inclinic' | 'video') => {
    navigation.navigate('DoctorAvailability', {
      doctor,
      consultationType: type,
    });
  };

  const renderModalList = (title: string, data: string[], onSelect: (val: string) => void) => (
    <Modal visible={locationModalVisible} transparent animationType="slide">
      <View style={tw`flex-1 bg-black/50 justify-end`}>
        <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 px-4`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <Text style={tw`text-xl font-bold`}>{title}</Text>
            <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
              <Text style={tw`text-green-600`}>Done</Text>
            </TouchableOpacity>
          </View>
          {data.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                onSelect(item);
                setLocationModalVisible(false);
              }}
              style={tw`py-4 border-b border-gray-100`}
            >
              <Text style={tw`${location === item ? 'text-green-600 font-semibold' : 'text-gray-700'}`}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const renderFilterModal = () => (
    <Modal visible={filterModalVisible} transparent animationType="slide">
      <View style={tw`flex-1 bg-black/50 justify-end`}>
        <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 px-4`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <Text style={tw`text-xl font-bold`}>Filters</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Text style={tw`text-green-600`}>Done</Text>
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
                        ? 'bg-green-600 border-green-600'
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
              <Text style={tw`text-green-600`}>Done</Text>
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
                  sortBy === option.value ? 'text-green-600 font-semibold' : 'text-gray-700'
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

  return (
    <View style={tw`flex-1 bg-white`}>
      <PageHeader
        title="Find Doctors"
        backgroundColor="#166534"
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

      {/* Search Input */}
      <View style={tw`px-4 pt-2`}>
        <View style={tw`flex-row items-center bg-gray-100 rounded-xl px-3 py-2`}>
          <LucideSearch size={20} color="#888" />
          <TextInput
            style={tw`flex-1 ml-2 text-base`}
            placeholder="Search doctors, specialties..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')} style={tw`ml-2`}>
              <X size={20} color="#888" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Tabs */}
      <View style={tw`px-4 mt-2`}>
        <View style={tw`flex-row justify-between mb-3`}>
          <TouchableOpacity
            onPress={() => setActiveTab('inclinic')}
            style={tw`flex-1 flex-row items-center justify-center py-3 rounded-l-xl ${
              activeTab === 'inclinic' ? 'bg-green-700 shadow-lg' : 'bg-white border border-gray-300'
            }`}
          >
            <Hospital size={20} color={activeTab === 'inclinic' ? '#fff' : '#166534'} />
            <Text style={tw`${activeTab === 'inclinic' ? 'text-white font-bold ml-2' : 'text-gray-700 ml-2'}`}>
              In-Clinic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('video')}
            style={tw`flex-1 flex-row items-center justify-center py-3 rounded-r-xl ${
              activeTab === 'video' ? 'bg-green-700 shadow-lg' : 'bg-white border border-gray-300'
            }`}
          >
            <Video size={20} color={activeTab === 'video' ? '#fff' : '#166534'} />
            <Text style={tw`${activeTab === 'video' ? 'text-white font-bold ml-2' : 'text-gray-700 ml-2'}`}>
              Video Consult
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters Row */}
      <View style={tw`px-4 mb-2`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView>
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)} style={tw`bg-white p-4 mb-4 rounded-xl shadow-sm mx-4`}>
            <View style={tw`flex-row`}>
              <Image source={{ uri: item.image }} style={tw`w-20 h-20 rounded-lg`} />
              <View style={tw`flex-1 ml-3`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>{item.name}</Text>
                <Text style={tw`text-gray-600`}>{item.specialty}</Text>
                <View style={tw`flex-row items-center mt-1`}>
                  <Clock size={14} color="#666" />
                  <Text style={tw`text-gray-600 ml-1`}>{item.experience} Years experience</Text>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <MapPin size={14} color="#666" />
                  <Text style={tw`text-gray-600 ml-1`}>{item.location}</Text>
                </View>
              </View>
            </View>
            <View style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100`}>
              <View style={tw`flex-row items-center`}>
                {item.rating && (
                  <View style={tw`flex-row items-center mr-4`}>
                    <Star size={16} color="#22c55e" fill="#22c55e" />
                    <Text style={tw`ml-1 font-medium`}>{item.rating}</Text>
                  </View>
                )}
                <ThumbsUp size={14} color="#22c55e" />
                <Text style={tw`ml-1 font-medium`}>{item.recommendation}</Text>
                <Text style={tw`text-gray-600 ml-1`}>• {item.patientStories} Stories</Text>
              </View>
              <Text style={tw`text-[#166534] font-bold`}>₹{item.fee}</Text>
            </View>
            <View style={tw`flex-row mt-3`}>
              <TouchableOpacity onPress={() => Linking.openURL('tel:+1234567890')} style={tw`flex-1 border border-[#166534] py-2 rounded-lg mr-2`}>
                <Text style={tw`text-[#166534] text-center font-medium`}>Contact Clinic</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleBookingPress(item, item.type)} style={tw`flex-1 bg-[#166534] py-2 rounded-lg ml-2`}>
                <Text style={tw`text-white text-center font-medium`}>
                  {item.type === 'inclinic' ? 'Book Clinic Visit' : 'Book Video Consult'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {renderFilterModal()}
      {renderSortModal()}
      {renderModalList('Select Location', locations, setLocation)}
    </View>
  );
};

export default FindDoctorsScreen;
