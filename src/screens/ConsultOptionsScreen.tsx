import React from 'react';
import { View, Text, TouchableOpacity, Platform, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { ArrowLeft, Hospital, Video } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

// Constants
const FALLBACK_SPECIALTY = 'General Consultation';

// Font configuration
const fontConfig = Platform.select({
  ios: {
    regular: 'System',
    medium: '-apple-system',
    bold: '-apple-system',
    semibold: '-apple-system',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto_medium',
    bold: 'Roboto_bold',
    semibold: 'Roboto_medium',
  },
  default: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    semibold: 'System',
  },
}) ?? {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  semibold: 'System',
};

// Define your stack param list for navigation typing
// Adjust the names/types to match your navigator
export type RootStackParamList = {
  ConsultOptionsScreen: { specialty?: string };
  Doctors: { specialty: string; mode: string };
};

type ConsultOptionsScreenRouteProp = RouteProp<RootStackParamList, 'ConsultOptionsScreen'>;
type ConsultOptionsScreenNavProp = NavigationProp<RootStackParamList, 'ConsultOptionsScreen'>;

const ConsultOptionsScreen = () => {
  const navigation = useNavigation<ConsultOptionsScreenNavProp>();
  const route = useRoute<ConsultOptionsScreenRouteProp>();
  const specialty = route.params?.specialty || FALLBACK_SPECIALTY;
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const handleOptionPress = (mode: string) => {
    // Convert mode to lowercase and standardize format
    const standardMode = mode === 'Clinic' ? 'inclinic' : mode.toLowerCase();
    navigation.navigate('Doctors', { specialty, mode: standardMode });
  };

  return (
    <View 
      style={[
        tw`flex-1 bg-gray-100`,
        { 
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 16),
          paddingLeft: Math.max(insets.left, 24),
          paddingRight: Math.max(insets.right, 24),
          minHeight: height,
        }
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <Pressable
          style={({ pressed }) => [
            tw`p-3 rounded-full bg-white shadow-sm`,
            pressed && tw`opacity-70`
          ]}
          onPress={() => navigation.goBack()}
          accessible
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color="#1F2937" />
        </Pressable>
        <Text style={[tw`text-xl text-gray-900 font-semibold`]}>
          Consultation Options
        </Text>
        <View style={tw`w-12`} />
      </View>

      {/* Content Container */}
      <View style={tw`flex-1 justify-between py-4`}>
        <View>
          {/* Specialty Title */}
          <Text
            style={tw`text-2xl text-blue-900 text-center font-bold mb-4`}
            accessible
            accessibilityLabel={`Specialty: ${specialty}`}
            adjustsFontSizeToFit
            numberOfLines={2}
          >
            {specialty}
          </Text>

          {/* Prompt */}
          <Text
            style={tw`text-base text-gray-600 text-center mb-8`}
            accessible
            accessibilityLabel="Choose your consultation method"
          >
            Choose your consultation method
          </Text>
        </View>

        {/* Options */}
        <View style={tw`gap-6 mb-4`}>
          <Pressable
            style={({ pressed }) => [
              tw`flex-row items-center py-5 px-6 rounded-3xl bg-blue-600 shadow-lg`,
              pressed && tw`opacity-90 scale-98`
            ]}
            onPress={() => handleOptionPress('Clinic')}
            accessible
            accessibilityLabel="Book a clinic visit"
            accessibilityRole="button"
          >
            <Hospital size={30} color="#fff" />
            <Text style={tw`text-lg font-semibold text-white ml-4`}>
              Clinic Visit
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              tw`flex-row items-center py-5 px-6 rounded-3xl bg-green-600 shadow-lg`,
              pressed && tw`opacity-90 scale-98`
            ]}
            onPress={() => handleOptionPress('Video')}
            accessible
            accessibilityLabel="Book a video consultation"
            accessibilityRole="button"
          >
            <Video size={30} color="#fff" />
            <Text style={tw`text-lg font-semibold text-white ml-4`}>
              Video Consultation
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fontConfig.bold,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  titleText: {
    fontFamily: fontConfig.bold,
    includeFontPadding: false,
    letterSpacing: -0.5,
  },
  promptText: {
    fontFamily: fontConfig.regular,
    includeFontPadding: false,
  },
  buttonText: {
    fontFamily: fontConfig.semibold,
    includeFontPadding: false,
  },
  pressedButton: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
});

export default ConsultOptionsScreen;