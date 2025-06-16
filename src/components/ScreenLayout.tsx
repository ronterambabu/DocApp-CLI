import React from 'react';
import { View, ViewStyle, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface ScreenLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noHorizontalPadding?: boolean;
  noVerticalPadding?: boolean;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  style,
  noHorizontalPadding = false,
  noVerticalPadding = false,
}) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <View
      style={[
        tw`flex-1 bg-gray-100`,
        {
          paddingTop: noVerticalPadding ? 0 : Math.max(insets.top, 16),
          paddingBottom: noVerticalPadding ? 0 : Math.max(insets.bottom, 16),
          paddingLeft: noHorizontalPadding ? 0 : Math.max(insets.left, 24),
          paddingRight: noHorizontalPadding ? 0 : Math.max(insets.right, 24),
          minHeight: height,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenLayout;
