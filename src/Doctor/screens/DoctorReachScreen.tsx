import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLayout from '../../components/PageLayout';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

const DoctorReachScreen = () => {
  const stats = [
    { title: 'Profile Views', count: 1234, icon: 'eye' },
    { title: 'Patient Reviews', count: 156, icon: 'star' },
    { title: 'Recommendations', count: 45, icon: 'thumb-up' },
    { title: 'Total Consultations', count: 890, icon: 'doctor' },
  ];

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Online Reach" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`pb-6`}> 
        <View style={tw`p-5 bg-green-100 rounded-b-2xl mb-4`}> 
          <Text style={tw`text-2xl font-bold text-green-700 mb-2`}>Your Online Reach</Text>
          <Text style={tw`text-base text-green-600`}>Monitor and improve your online presence</Text>
        </View>

        <View style={tw`flex-row flex-wrap justify-between px-4 mb-4`}> 
          {stats.map((stat, index) => (
            <View key={index} style={tw`bg-white rounded-xl p-4 mb-4 w-[47%] items-center shadow-sm`}>
              <Icon name={stat.icon} size={32} color="#16a34a" />
              <Text style={tw`text-2xl font-bold text-green-700 mt-2`}>{stat.count}</Text>
              <Text style={tw`text-green-600 mt-1`}>{stat.title}</Text>
            </View>
          ))}
        </View>

        <View style={tw`px-4 mb-4`}> 
          <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Profile Completion</Text>
          <View style={tw`h-3 bg-green-100 rounded-full overflow-hidden mb-2`}> 
            <View style={[tw`h-3 bg-green-600 rounded-full`, { width: '85%' }]} />
          </View>
          <Text style={tw`text-green-600`}>85% Complete</Text>
        </View>

        <View style={tw`px-4 mb-4`}> 
          <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Improve Your Reach</Text>
          <View style={tw`bg-green-100 rounded-xl p-4 mb-2 flex-row items-center`}>
            <Icon name="lightbulb-on" size={24} color="#16a34a" />
            <Text style={tw`text-green-600 ml-2`}>Complete your profile to appear higher in search results</Text>
          </View>
          <View style={tw`bg-green-100 rounded-xl p-4 flex-row items-center`}>
            <Icon name="star" size={24} color="#16a34a" />
            <Text style={tw`text-green-600 ml-2`}>Encourage satisfied patients to leave reviews</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#bbd4fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202b6d',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202b6d',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202b6d',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  progress: {
    height: '100%',
    backgroundColor: '#1d9be3',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#444',
  },
});

export default DoctorReachScreen;
