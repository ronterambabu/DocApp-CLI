import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorHeader from '../components/DoctorHeader';

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
        color="#1d9be3"
      />
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <DoctorHeader title="Patient Stories" showSettings showNotifications />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Patient Stories</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Average Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Total Reviews</Text>
            </View>
          </View>
        </View>

        <View style={styles.storiesContainer}>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              <View style={styles.storyHeader}>
                <Image
                  source={{ uri: story.image }}
                  style={styles.patientImage}
                />
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{story.patientName}</Text>
                  <Text style={styles.condition}>{story.condition}</Text>
                </View>
                <Text style={styles.date}>{story.date}</Text>
              </View>
              
              <View style={styles.ratingContainer}>
                {renderStars(story.rating)}
              </View>
              
              <Text style={styles.review}>{story.review}</Text>
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
