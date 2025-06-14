import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { 
  Home, 
  Calendar, 
  User, 
  PieChart, 
  MessageCircle, 
  Search, 
  Hospital, 
  Pill, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Edit, 
  FileText, 
  Video, 
  Phone, 
  MapPin, 
  CreditCard, 
  Lock, 
  HelpCircle, 
  Star, 
  Stethoscope, 
  Heart, 
  ClipboardList, 
  FilePlus, 
  FileCheck, 
  FileX, 
  FileMinus, 
  File, 
  Camera, 
  Upload, 
  Download, 
  Trash, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone as PhoneIcon, 
  Globe 
} from 'lucide-react-native';
import tw from 'twrnc'; // Import twrnc
import Modal from 'react-native-modal'; // or 'react-native' if you use the built-in Modal
import Footer from './Footer';

const { width: screenWidth } = Dimensions.get('window');

// Define your stack param list for navigation typing
export type RootStackParamList = {
  index: undefined;
  AllHospitals: undefined;
  AllPharmacies: undefined;
  Onboarding: undefined;
  Search: undefined;
  VideoCall: undefined;
  // Add all screens you navigate to from this file:
  Profile: undefined;
  Language: undefined;
  Notification: undefined;
  Searcheverything: undefined;
  AllSpecialtiesScreen: { type?: string } | undefined;
  doctors: { type?: string; specialty: string };
  ConsultOptionsScreen: { specialty: string };
  HospitalDetailsScreen: { id: number; name: string; location: string; image: string };
  PharmacyDetailsScreen: { id: number; name: string; location: string; image: string };
  AllOffersScreen: undefined;
  // ...add more as needed
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const profileImageUri = 'https://randomuser.me/api/portraits/men/4.jpg';

  const banners = [
    require('../Images/Banner1.jpg'),
    require('../Images/Banner2.jpg'),
    require('../Images/Banner3.jpg'),
  ];

  const specialties = [
    { name: 'General Physician', image: require('../Images/Labtests.jpg') },
    { name: 'Skin & Hair', image: require('../Images/Labtests.jpg') },
    { name: "Women's Health", image: require('../Images/Labtests.jpg') },
    { name: 'Dental Care', image: require('../Images/Labtests.jpg') },
    { name: 'Child Specialist', image: require('../Images/Labtests.jpg') },
    { name: 'ENT', image: require('../Images/Labtests.jpg') },
    { name: 'Mental Health', image: require('../Images/Labtests.jpg') },
    { name: 'Orthopedic', image: require('../Images/Labtests.jpg') },
  ];
const cityList = [
  'Bangalore',
  'Hyderabad',
  'Delhi',
  'Mumbai',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];
const [selectedLocation, setSelectedLocation] = useState('Bangalore');
const [showLocationModal, setShowLocationModal] = useState(false);

  const bottomBanners = [
    require('../Images/BottomBanner1.jpg'),
    require('../Images/BottomBanner2.jpg'),
    require('../Images/BottomBanner3.jpg'),
  ];

  const hospitals = [
    {
      id: 1,
      name: 'Apollo Hospital',
      location: 'Delhi, India',
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8c3',
    },
    {
      id: 2,
      name: 'Fortis Healthcare',
      location: 'Mumbai, India',
      image: 'https://images.unsplash.com/photo-1576765607924-9d7ae228f1b9',
    },
    {
      id: 3,
      name: 'AIIMS',
      location: 'New Delhi, India',
      image: 'https://images.unsplash.com/photo-1589758438368-56d6c9a3e1ab',
    },
  ];

  const pharmacies = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      location: 'Delhi, India',
      image: 'https://images.unsplash.com/photo-1606813902532-0fdd8b6a3caa',
    },
    {
      id: 2,
      name: 'MedPlus',
      location: 'Bangalore, India',
      image: 'https://images.unsplash.com/photo-1601022353923-5226cb45e8f4',
    },
    {
      id: 3,
      name: '1MG Pharmacy',
      location: 'Hyderabad, India',
      image: 'https://images.unsplash.com/photo-1580281657527-47aab76dfdc1',
    },
  ];

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerWidth = screenWidth - 40;

  const onBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    setActiveBannerIndex(Math.round(x / bannerWidth));
  };

  const iconMap: Record<string, React.ElementType> = {
    'doctor': Stethoscope,
    'calendar': Calendar,
    'user': User,
    'pie-chart': PieChart,
    'message-circle': MessageCircle,
    // add more mappings as needed
  };

  const FeatureCard = ({
    iconName,
    iconSet = 'FontAwesome5',
    label,
    badge,
    onPress,
    image,
  }: {
    iconName?: string;
    iconSet?: string;
    label: string;
    badge?: string;
    onPress?: () => void;
    image?: any;
  }) => {
    return (
      <TouchableOpacity
        style={tw`w-[30%] mb-4 items-center justify-center`}
        onPress={onPress}
      >
        <View
          style={tw`relative bg-white w-[100px] h-[100px] rounded-[30px] items-center justify-center overflow-hidden shadow-sm`}
        >
          {image ? (
            <Image
              source={image}
              style={tw`w-[120%] h-[120%]`}
              resizeMode="contain"
            />
          ) : (
            iconName && iconMap[iconName] ? (
              React.createElement(iconMap[iconName], { size: 24, color: '#FFFFFF' })
            ) : null
          )}
          {badge && (
            <View style={tw`absolute top-0 right-0 bg-red-600 rounded-full px-2 py-1`}>
              <Text style={tw`text-white text-xs text-center`}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={tw`text-xs mt-2 text-center text-gray-600 font-medium`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#202b6d" // Practo’s dark blue
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={tw`pb-20`}
        showsVerticalScrollIndicator={false}
      >
<View
  style={[
    tw`px-4 pb-4`,
    {
      backgroundColor: '#202b6d',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 50,
    },
  ]}
>
  {/* Top Row: Profile | Location | Language & Notification */}
  <View style={tw`flex-row items-center justify-between`}>
    {/* Profile Image */}
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Image
        source={{ uri: profileImageUri }}
        style={tw`w-14 h-14 rounded-full border-2 border-white`} // Slightly smaller than before
      />
    </TouchableOpacity>

    {/* Location */}
    <TouchableOpacity
      onPress={() => setShowLocationModal(true)}
      style={tw`flex-row items-center mx-3`}
    >
      <MapPin size={16} color="white" />
      <Text style={tw`ml-1 text-white font-medium text-sm`}>
        {selectedLocation}
      </Text>
      <ChevronDown size={16} color="white" style={tw`ml-1`} />
    </TouchableOpacity>
    <Modal isVisible={showLocationModal} onBackdropPress={() => setShowLocationModal(false)}>
      <View style={tw`bg-white p-6 rounded-2xl items-center`}>
        <Text style={tw`text-base font-semibold mb-2`}>Select your city</Text>
        {cityList.map((city) => (
          <TouchableOpacity
            key={city}
            style={tw`py-2 w-full items-center`}
            onPress={() => {
              setSelectedLocation(city);
              setShowLocationModal(false);
            }}
          >
            <Text style={tw`text-lg ${selectedLocation === city ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>{city}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={tw`mt-4`} onPress={() => setShowLocationModal(false)}>
          <Text style={tw`text-blue-600 font-bold`}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    {/* Language & Notification */}
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <Globe size={18} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={tw`ml-3`}>
        <View>
          <Bell size={20} color="white" />
          <View style={tw`absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600`} />
        </View>
      </TouchableOpacity>
    </View>
  </View>

  {/* Search Bar */}
  <TouchableOpacity
   onPress={() => navigation.navigate('Searcheverything')}
    activeOpacity={0.9}
    style={tw`mt-4 flex-row items-center px-4 py-2.5 bg-white rounded-full shadow-sm border border-gray-200`}
  >
    <Search size={18} color="#6B7280" />
    <Text style={tw`ml-3 text-gray-600 text-sm`}>
      Search doctors, clinics, tests...
    </Text>
  </TouchableOpacity>
</View>

  {/* Quick Actions Grid - Images only */}
<View style={tw`flex-row flex-wrap justify-between mx-4 mt-6 gap-2`}>
  <TouchableOpacity onPress={() => navigation.navigate('AllSpecialtiesScreen', { type: 'online' })}>
    <Image
      source={require('../Images/onlineconsultations.jpg')}
      style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
      resizeMode="cover"
    />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('AllSpecialtiesScreen', { type: 'offline' })}>
    <Image
      source={require('../Images/onlineconsultations.jpg')}
      style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
      resizeMode="cover"
    />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('LabTestCategoriesScreen')}>
    <Image
      source={require('../Images/Labtests.jpg')}
      style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
      resizeMode="cover"
    />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('pharmacytestcategories')}>
    <Image
      source={require('../Images/Pharmacy.jpg')}
      style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
      resizeMode="cover"
    />
  </TouchableOpacity>
</View>


        {/* Banner Section */}
        <View style={tw`mt-6`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onBannerScroll}
            scrollEventThrottle={16}
            snapToInterval={bannerWidth}
            decelerationRate="fast"
            contentContainerStyle={tw`px-4`}
          >
            {banners.map((source, index) => (
              <View
                key={index}
                style={tw`w-[${screenWidth - 32}px] h-40 rounded-4xl overflow-hidden mr-4 shadow-sm`}
              >
                <Image
                  source={typeof source === 'string' ? { uri: source } : source}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
          <View style={tw`flex-row justify-center mt-3`}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={tw`w-2 h-2 bg-gray-300 rounded-full mx-1 ${
                  activeBannerIndex === index ? 'bg-blue-900 w-4 shadow-sm' : ''
                }`}
              />
            ))}
          </View>
        </View>

        {/* Specialties */}
        <View style={tw`mt-6 px-6`}>
          <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
            Find a Doctor for your Health Problem
          </Text>
          <View style={tw`mt-2`}>
            <View style={tw`flex-row flex-wrap justify-between`}>
              {specialties.slice(0, 9).map((item, index) => (
                <FeatureCard
                  key={index}
                  label={item.name}
                  image={item.image}
                  onPress={() =>
                    navigation.navigate('ConsultOptionsScreen', { specialty: item.name })
                  }
                />
              ))}
              <TouchableOpacity
                style={tw`w-[30%] mb-4 items-center`} 
                onPress={() => navigation.navigate('AllSpecialtiesScreen')}
              >
                <View style={tw`bg-indigo-100 w-[100px] h-[100px] rounded-[30px] items-center justify-center`}>
                  <ChevronRight size={18} color="#A3A3A3" />
                </View>
                <Text style={tw`text-xs mt-2 text-center text-blue-800 font-bold`}>
                  View More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Explore Hospitals */}
        <View style={tw`mt-6 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
              Top Hospitals
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllHospitals')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-xs text-gray-400 font-semibold py-2 px-2`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2`}
          >
            {hospitals.map((hospital) => (
              <TouchableOpacity
                key={hospital.id}
                style={tw`w-[${screenWidth - 150}px] h-40 rounded-4xl overflow-hidden mr-6 shadow-sm`}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('HospitalDetailsScreen', { id: hospital.id, name: hospital.name, location: hospital.location, image: hospital.image })}
              >
                <Image
                  source={require('../Images/apllo1.jpg')}
                  style={tw`w-full h-full absolute top-0 left-0`}
                  resizeMode="cover"
                />
                <View style={tw`absolute bottom-0 left-0 right-0 bg-black/50 py-1.5 px-2`}>
                  <Text style={tw`text-sm font-bold text-white`}>{hospital.name}</Text>
                  <View style={tw`flex-row items-center mt-0.5`}>
                    <MapPin size={10} color="#E5E7EB" />
                    <Text style={tw`text-xs text-gray-200 ml-1`}>{hospital.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Explore Pharmacies */}
        <View style={tw`mt-6 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
              Nearby Pharmacies
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllPharmacies')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-xs text-gray-400 font-semibold py-2 px-2`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2`}
          >
            {pharmacies.map((pharmacy) => (
              <TouchableOpacity
                key={pharmacy.id}
                style={tw`w-[${screenWidth - 150}px] h-40 rounded-4xl overflow-hidden mr-6 shadow-sm`}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PharmacyDetailsScreen', { id: pharmacy.id, name: pharmacy.name, location: pharmacy.location, image: pharmacy.image })}
              >
                <Image
                  source={require('../Images/medpluse1.jpg')}
                  style={tw`w-full h-full absolute top-0 left-0`}
                  resizeMode="cover"
                />
                <View style={tw`absolute bottom-0 left-0 right-0 bg-black/50 py-1.5 px-2`}>
                  <Text style={tw`text-sm font-bold text-white`}>{pharmacy.name}</Text>
                  <View style={tw`flex-row items-center mt-0.5`}>
                    <MapPin size={12} color="#E5E7EB" />
                    <Text style={tw`text-xs text-gray-200 ml-1`}>{pharmacy.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Banners */}
        <View style={tw`mt-6 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
              Special Offers
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllOffersScreen')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-xs text-gray-400 font-semibold py-2 px-2`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2`}
          >
            {bottomBanners.map((imgSrc, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={tw`w-70 h-30 rounded-3xl overflow-hidden mr-4 shadow-sm`}
              >
                <Image
                  source={imgSrc}
                  style={tw`w-full h-full rounded-3xl`}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
 
    </SafeAreaView>

  );

};

export default HomeScreen;