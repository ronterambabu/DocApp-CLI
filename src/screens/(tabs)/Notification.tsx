import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import { ArrowLeft } from 'lucide-react-native';

type Notification = {
  id: string;
  type: 'appointment' | 'report' | 'payment' | string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Smith is confirmed for May 25, 2025.',
      time: '2 hrs ago',
      read: false,
    },
    {
      id: '2',
      type: 'report',
      title: 'Medical Report Ready',
      message: 'Your latest test results are now available.',
      time: '1 day ago',
      read: true,
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'We received your payment of ₹1200.',
      time: '3 days ago',
      read: false,
    },
  ]);

  const getIcon = (type: Notification['type'], read: boolean) => {
    const color = read ? '#666' : '#007bff';
    switch (type) {
      case 'appointment':
        return <MaterialCommunityIcons name="calendar-check" size={24} color={color} />;
      case 'report':
        return <MaterialCommunityIcons name="file-document" size={24} color={color} />;
      case 'payment':
        return <FontAwesome5 name="rupee-sign" size={20} color={color} />;
      default:
        return <MaterialCommunityIcons name="bell" size={24} color={color} />;
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    setNotifications(updated);
  };

  const clearNotifications = () => {
    Alert.alert('Clear All', 'Are you sure you want to clear all notifications?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => setNotifications([]),
      },
    ]);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        tw`bg-white p-4 rounded-xl flex-row my-1.5 items-center`,
        !item.read && tw`border-l-4 border-blue-500`,
        { elevation: 1 }, // elevation kept inline for Android
      ]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.8}
    >
      <View style={tw`mr-3 w-7 items-center`}>{getIcon(item.type, item.read)}</View>
      <View style={tw`flex-1`}>
        <Text style={tw`font-semibold text-base text-gray-800`}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-600 my-1`}>{item.message}</Text>
        <Text style={tw`text-xs text-gray-400`}>{item.time}</Text>
      </View>
      {!item.read && <View style={tw`w-2.5 h-2.5 bg-blue-500 rounded-full ml-2.5`} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={tw`flex-1 bg-gray-100`}
    >
      <View style={tw`flex-1 px-5`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between py-4`}>
          <TouchableOpacity
            style={[tw`p-2 rounded-full bg-white shadow-sm`, { elevation: 2, zIndex: 10 }]}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={22} color="#222B45" />
          </TouchableOpacity>

          <Text style={tw`text-2xl font-bold text-gray-800`}>Notifications</Text>

          {notifications.length > 0 ? (
            <TouchableOpacity onPress={clearNotifications}>
              <Text style={tw`text-sm text-red-500`}>Clear All</Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`w-[70px]`} /> // Placeholder to keep centered
          )}
        </View>

        {/* Content */}
        {notifications.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <MaterialCommunityIcons name="bell-off-outline" size={50} color="#aaa" />
            <Text style={tw`text-base text-gray-500 mt-2.5`}>No Notifications</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`pb-5`}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;