import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, User2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const PersonalInfoScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    consultationFee: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from APIs with HTTP-only cookie authentication
    // - https://landing.docapp.co.in/api/auth/get-user-data
    // - https://landing.docapp.co.in/api/filter/filter-doctors
    const fetchData = async () => {
      try {
        // Mock response for get-user-data
        const userResponse = {
          message: 'succesfully fetched the user details',
          userData: {
            username: 'premchandu',
            email: 'premmekiri22@gmail.com',
            phone_number: '9381197503',
            role: 'doctor',
          },
        };

        // Mock response for filter-doctors (filtered for user_id: 21)
        const filterResponse = {
          doctors: [
            {
              user_id: 21,
              date_of_birth: '2002-02-22T00:00:00.000Z',
              gender: 'Male',
              specialization: 'Cardiologist',
              experience_years: 2,
              consultation_fee: '540.00',
              profile_picture: 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
              user: {
                address: [
                  {
                    street: 'madhapur',
                    city: 'Hyderabad',
                    state: 'Telangana',
                    pincode: '500018',
                  },
                ],
              },
            },
          ],
        };

        const doctor = filterResponse.doctors.find((d) => d.user_id === 21);
        setPersonalInfo({
          name: `Dr. ${userResponse.userData.username}`,
          email: userResponse.userData.email,
          phone: userResponse.userData.phone_number,
          address: doctor?.user.address[0]
            ? `${doctor.user.address[0].street}, ${doctor.user.address[0].city}, ${doctor.user.address[0].state}, ${doctor.user.address[0].pincode}`
            : '',
          specialization: doctor?.specialization || '',
          experience: doctor?.experience_years ? `${doctor.experience_years} years` : '',
          consultationFee: doctor?.consultation_fee ? `₹${doctor.consultation_fee}` : '',
          dateOfBirth: doctor?.date_of_birth ? doctor.date_of_birth.split('T')[0] : '',
          gender: doctor?.gender || '',
          profilePicture: doctor?.profile_picture || personalInfo.profilePicture,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
        <Text style={tw`text-green-100 text-lg`}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Personal Information" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        <View style={tw`items-center mb-6`}>
          <View style={tw`relative`}>
            <Image
              source={{ uri: personalInfo.profilePicture }}
              style={tw`w-24 h-24 rounded-full`}
            />
            <TouchableOpacity
              style={tw`absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full`}
              activeOpacity={0.7}
            >
              <Camera size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={tw`text-green-700 text-xl font-bold mt-3`}>{personalInfo.name}</Text>
          <Text style={tw`text-emerald-500 text-base`}>{personalInfo.specialization}</Text>
        </View>

        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Contact Information</Text>
          <View style={tw`flex-row items-center mb-3`}>
            <Mail size={20} color="#16a34a" />
            <Text style={tw`text-green-600 ml-3`}>{personalInfo.email}</Text>
          </View>
          <View style={tw`flex-row items-center mb-3`}>
            <Phone size={20} color="#16a34a" />
            <Text style={tw`text-green-600 ml-3`}>{personalInfo.phone}</Text>
          </View>
          {personalInfo.address && (
            <View style={tw`flex-row items-center`}>
              <MapPin size={20} color="#16a34a" />
              <Text style={tw`text-green-600 ml-3`}>{personalInfo.address}</Text>
            </View>
          )}
        </View>

        <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Doctor Details</Text>
          <View style={tw`flex-row items-center mb-3`}>
            <Briefcase size={20} color="#16a34a" />
            <Text style={tw`text-green-600 ml-3`}>Experience: {personalInfo.experience}</Text>
          </View>
          <View style={tw`flex-row items-center mb-3`}>
            <Briefcase size={20} color="#16a34a" />
            <Text style={tw`text-green-600 ml-3`}>Consultation Fee: {personalInfo.consultationFee}</Text>
          </View>
          <View style={tw`flex-row items-center mb-3`}>
            <Calendar size={20} color="#16a34a" />
            <Text style={tw`text-green-600 ml-3`}>Date of Birth: {personalInfo.dateOfBirth}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <User2 size={20} color="#16a34a" />
            <Text style={tw`text-green-600 ml-3`}>Gender: {personalInfo.gender}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={tw`mt-6 bg-emerald-500 rounded-full px-6 py-3 items-center`}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('EditDoctorProfile')}
        >
          <Text style={tw`text-white font-bold text-base`}>Edit Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;