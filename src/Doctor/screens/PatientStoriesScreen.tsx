import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

const PatientStoriesScreen = () => {
  const stories = [
    {
      id: 1,
      patientName: 'John Smith',
      rating: 5,
      date: '2 days ago',
      image: 'https://via.placeholder.com/50',
      review: 'Excellent doctor! Very thorough and patient in explaining everything.',
      condition: 'Annual Check-up',
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      rating: 4,
      date: '1 week ago',
      image: 'https://via.placeholder.com/50',
      review: 'Very professional and knowledgeable. The wait time was a bit long though.',
      condition: 'Chronic Migraine',
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#16a34a"
      />
    ));
  };

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Patient Stories" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`pb-6`}> 
        <View style={tw`p-5 bg-green-100 rounded-b-2xl mb-4`}> 
          <Text style={tw`text-2xl font-bold text-green-700 mb-2`}>Patient Stories</Text>
          <View style={tw`flex-row justify-between mt-2`}> 
            <View style={tw`items-center`}> 
              <Text style={tw`text-2xl font-bold text-green-700`}>4.8</Text>
              <Text style={tw`text-green-600`}>Average Rating</Text>
            </View>
            <View style={tw`items-center`}> 
              <Text style={tw`text-2xl font-bold text-green-700`}>156</Text>
              <Text style={tw`text-green-600`}>Total Reviews</Text>
            </View>
          </View>
        </View>

        <View style={tw`px-4`}> 
          {stories.map((story) => (
            <View key={story.id} style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}> 
              <View style={tw`flex-row items-center mb-2`}> 
                <Image source={{ uri: story.image }} style={tw`w-12 h-12 rounded-full mr-3`} />
                <View style={tw`flex-1`}> 
                  <Text style={tw`text-green-700 font-bold`}>{story.patientName}</Text>
                  <Text style={tw`text-green-400 text-xs`}>{story.condition}</Text>
                </View>
                <Text style={tw`text-green-400 text-xs`}>{story.date}</Text>
              </View>
              <View style={tw`flex-row items-center mb-2`}>{renderStars(story.rating)}</View>
              <Text style={tw`text-green-600`}>{story.review}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#bbd4fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202b6d',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202b6d',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  storiesContainer: {
    padding: 16,
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202b6d',
  },
  condition: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  review: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default PatientStoriesScreen;
