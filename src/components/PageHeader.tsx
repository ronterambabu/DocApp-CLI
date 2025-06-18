import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tw from 'twrnc';

interface PageHeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode; // NEW
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backgroundColor = '#202b6d',
  textColor = '#fff',
  onBackPress,
  rightComponent,
  leftComponent, // NEW
}) => {
  const navigation = useNavigation();
  const statusBarHeight = getStatusBarHeight(true);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={{ backgroundColor: '#202b6d' }}>
      <View style={{ height: statusBarHeight + 12 }} /> {/* Extra padding after status bar */}
      <View 
        style={[
          tw`px-4 flex-row items-center`,
          { 
            height:90, // Fixed header content height
          }
        ]}
      >
        {leftComponent ? (
          leftComponent
        ) : (
          <TouchableOpacity 
            onPress={handleBackPress}
            style={tw`p-2 -ml-2`}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <ArrowLeft size={24} color={textColor} />
          </TouchableOpacity>
        )}
        <Text style={[tw`text-lg font-semibold flex-1 ml-3`, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>
        {rightComponent && <View style={tw`ml-2`}>{rightComponent}</View>}
      </View>
    </View>
  );
};

export default PageHeader;
