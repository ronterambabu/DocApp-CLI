import React from 'react';
import { View, Text, ScrollView, ViewStyle, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
  leftComponent?: React.ReactNode; // renamed prop
  headerContent?: React.ReactNode;
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
  leftComponent, // renamed prop
  headerContent,
}) => {
  const statusBarHeight = getStatusBarHeight(true);
  const Content = scrollable ? ScrollView : View;

  return (
    <View
      style={[
        tw`flex-1 bg-gray-100`,
        style,
        hideHeader && { paddingTop: statusBarHeight },
      ]}
    >
      {!hideHeader && (
        <>
          <PageHeader
            title={title}
            backgroundColor={headerBackgroundColor}
            textColor={headerTextColor}
            onBackPress={onBackPress}
            rightComponent={headerRight}
            leftComponent={leftComponent}
          />
          {headerContent && (
            <View style={tw`px-4 mt-2`}>{headerContent}</View>
          )}
        </>
      )}

      <Content
        style={[tw`flex-1`, contentStyle]}
        contentContainerStyle={[
          scrollable && tw`grow`,
          tw`pt-4`,
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
