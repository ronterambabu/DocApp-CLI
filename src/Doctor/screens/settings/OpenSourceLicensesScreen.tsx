import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../../types/navigation';
import DoctorHeader from '../../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const OpenSourceLicensesScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  const licenses = [
    {
      name: 'React Native',
      version: '0.72.0',
      license: 'MIT License',
      url: 'https://github.com/facebook/react-native'
    },
    {
      name: 'React Navigation',
      version: '6.0.0',
      license: 'MIT License',
      url: 'https://github.com/react-navigation/react-navigation'
    },
    {
      name: 'React Native Paper',
      version: '5.0.0',
      license: 'MIT License',
      url: 'https://github.com/callstack/react-native-paper'
    },
    {
      name: 'React Native Vector Icons',
      version: '9.0.0',
      license: 'MIT License',
      url: 'https://github.com/oblador/react-native-vector-icons'
    },
    {
      name: 'Lucide React Native',
      version: '0.263.1',
      license: 'ISC License',
      url: 'https://github.com/lucide-icons/lucide'
    },
    {
      name: 'AsyncStorage',
      version: '1.19.0',
      license: 'MIT License',
      url: 'https://github.com/react-native-async-storage/async-storage'
    },
    {
      name: 'DateTimePicker',
      version: '7.2.0',
      license: 'MIT License',
      url: 'https://github.com/react-native-datetimepicker/datetimepicker'
    },
    {
      name: 'TWRNC',
      version: '4.2.0',
      license: 'MIT License',
      url: 'https://github.com/jaredh159/tailwind-react-native-classnames'
    }
  ];

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Open Source Licenses" />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-2 text-center`}>Open Source Licenses</Text>
        <Text style={tw`text-base text-gray-500 mb-6 text-center`}>Third-party libraries used in this app</Text>

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Acknowledgments</Text>
          <Text style={tw`text-gray-700 leading-6`}>
            This application uses various open-source libraries. We are grateful to the developers 
            and contributors of these projects for their valuable work.
          </Text>
        </View>

        {licenses.map((library, index) => (
          <View key={index} style={tw`bg-white rounded-xl p-4 mb-3`}>
            <View style={tw`flex-row justify-between items-start mb-2`}>
              <Text style={tw`text-lg font-bold text-[#202b6d] flex-1`}>{library.name}</Text>
              <Text style={tw`text-gray-500 text-sm`}>v{library.version}</Text>
            </View>
            <Text style={tw`text-gray-600 mb-3`}>{library.license}</Text>
            <TouchableOpacity
              style={tw`bg-[#1d9be3] rounded-lg py-2 px-4 self-start`}
              onPress={() => openUrl(library.url)}
            >
              <Text style={tw`text-white font-medium`}>View Source</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>License Information</Text>
          <Text style={tw`text-gray-700 leading-6 mb-3`}>
            All third-party libraries are used in accordance with their respective licenses. 
            For detailed license terms, please visit the individual project repositories.
          </Text>
          <Text style={tw`text-gray-700 leading-6`}>
            If you have any questions about the licensing of these components, 
            please contact us through the support section.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OpenSourceLicensesScreen;
