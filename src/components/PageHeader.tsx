import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

interface PageHeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backgroundColor = '#2E3192',
  textColor = '#fff',
  onBackPress,
  rightComponent,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View style={[tw`px-4 py-5 flex-row items-center`, { backgroundColor }]}>
        <TouchableOpacity 
          onPress={handleBackPress}
          style={tw`p-2 -ml-2`}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[tw`text-lg font-semibold flex-1 ml-3`, { color: textColor }]}>
          {title}
        </Text>
        {rightComponent && <View style={tw`ml-2`}>{rightComponent}</View>}
      </View>
    </>
  );
};

export default PageHeader;
