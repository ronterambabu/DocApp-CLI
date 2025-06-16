import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Home, FileText, User, Stethoscope } from 'lucide-react-native';
import tw from 'twrnc';

import { useLoading } from '../../components/LoadingOverlay';

type RootStackParamList = {
  Home: undefined;
  MedicalRecords: undefined;
  ConsultOptionsScreen: { specialty: string };
};

const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const { setLoading } = useLoading();

const specialties = [
  { name: 'General Physician', image: require('../Images/PopUpICons/general_physician.png') },
  { name: 'Cardiologist', image: require('../Images/PopUpICons/cardiology.png') },
  { name: 'Dermatologist', image: require('../Images/PopUpICons/skincare.png') },
  { name: 'Neurologist', image: require('../Images/PopUpICons/neurology.png') },
  { name: 'Pediatrician', image: require('../Images/PopUpICons/pediatrician.png') },
  { name: 'Psychiatrist', image: require('../Images/PopUpICons/psychiatrist.png') },
  { name: 'Oncologist', image: require('../Images/PopUpICons/oncology.png') },
  { name: 'Orthopedic', image: require('../Images/PopUpICons/arthritis.png') },
  { name: 'ENT Specialist', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Gastroenterologist', image: require('../Images/PopUpICons/stomach.png') },
  { name: 'Endocrinologist', image: require('../Images/PopUpICons/endocrine.png') },
  { name: 'Urologist', image: require('../Images/PopUpICons/kidney.png') },
  { name: 'Gynecologist', image: require('../Images/PopUpICons/gynecologist.png') },
  { name: 'Skin & Hair', image: require('../Images/PopUpICons/spots.png') },
  { name: "Women's Health", image: require('../Images/PopUpICons/prenatal-care.png') },
  { name: 'Dental Care', image: require('../Images/PopUpICons/tooth.png') },
  
  { name: 'Mental Wellness', image: require('../Images/PopUpICons/brain.png') },
  { name: 'Bones & Joints', image: require('../Images/PopUpICons/arthritis.png') },
];

  return (
    <>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onShow={() => setLoading(false)}
      >
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`w-[95%] h-[80%] bg-white rounded-2xl p-5 items-center`}>
            <Text style={tw`text-lg font-bold mb-2.5`}>Choose a Specialty</Text>
            <ScrollView contentContainerStyle={tw`flex-row flex-wrap justify-between pb-5`}>
              {specialties.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`w-[30%] items-center mb-5`}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('ConsultOptionsScreen', { specialty: item.name });
                  }}
                >
                  <View style={[tw`w-16 h-16 rounded-xl mb-1.5 justify-center items-center`, { backgroundColor: '#becfe8' }]}>
                    <Image
                      source={item.image}
                      style={{ width: '95%', height: '95%', borderRadius: 12 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={[tw`text-xs text-center font-semibold`, { color: '#202b6d' }]}> {item.name} </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Pressable
              style={tw`mt-2.5 py-2.5 px-6 rounded-lg bg-gray-500`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-white font-bold`}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View
        style={tw`flex-row bg-white py-2.5 px-7.5 rounded-t-2xl shadow-md absolute bottom-0 left-0 right-0 justify-between items-center h-15 border-t-0`}
      >
        <TouchableOpacity
          style={tw`flex-1 items-center`}
          accessibilityRole="button"
          onPress={async () => {
            if (navigation.getState().routes[navigation.getState().index].name !== 'Home') {
              setLoading(true);
              navigation.navigate('Home');
              setTimeout(() => setLoading(false), 400);
            }
          }}
        >
          <Home size={22} color={'#B0B0B0'} />
          <Text style={tw`text-[10px] mt-0.5 text-gray-400`}>Home</Text>
        </TouchableOpacity>
        <View style={tw`flex-1 items-center`} /> {/* Empty space for center */}
        <TouchableOpacity
          style={tw`flex-1 items-center`}
          accessibilityRole="button"
          onPress={async () => {
            setLoading(true);
            navigation.navigate('MedicalRecords');
            setTimeout(() => setLoading(false), 400);
          }}
        >
          <FileText size={22} color={'#B0B0B0'} />
          <Text style={tw`text-[10px] mt-0.5 text-gray-400`}>Medical Records</Text>
        </TouchableOpacity>
      </View>
      {/* Floating Doctor Button Only */}
      <TouchableOpacity
        style={tw`absolute bottom-0 left-1/2 -translate-x-8.75 shadow-lg z-10 flex-col items-center`}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <View style={tw`w-[70px] h-[70px] rounded-full bg-blue-600 justify-center items-center border-4 border-white`}>
          <Stethoscope size={32} color="#fff" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Footer;
