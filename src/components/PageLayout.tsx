import React from 'react';
import { View, Text, ScrollView, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'twrnc';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  onBackPress?: () => void;
  sectionTitle?: string;
  scrollable?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  hideHeader?: boolean;
  headerRight?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  headerBackgroundColor,
  headerTextColor,
  onBackPress,
  sectionTitle,
  scrollable = true,
  style,
  contentStyle,
  hideHeader = false,
  headerRight,
}) => {
  const insets = useSafeAreaInsets();

  const Content = scrollable ? ScrollView : View;

  return (
    <View style={[tw`flex-1 bg-gray-100`, style]}>
      {!hideHeader && (
        <PageHeader
          title={title}
          backgroundColor={headerBackgroundColor}
          textColor={headerTextColor}
          onBackPress={onBackPress}
          rightComponent={headerRight}
        />
      )}

      <Content
        style={[tw`flex-1`, contentStyle]}
        contentContainerStyle={[
          scrollable && tw`grow`,
          tw`pt-4`, // Add consistent top padding
        ]}
      >
        {sectionTitle && (
          <Text style={tw`text-gray-500 text-xs px-4 mb-4 uppercase font-semibold`}>
            {sectionTitle}
          </Text>
        )}
        {children}
      </Content>
    </View>
  );
};

export default PageLayout;
