import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLayout from '../../components/PageLayout';

const DoctorReachScreen = () => {
  const stats = [
    { title: 'Profile Views', count: 1234, icon: 'eye' },
    { title: 'Patient Reviews', count: 156, icon: 'star' },
    { title: 'Recommendations', count: 45, icon: 'thumb-up' },
    { title: 'Total Consultations', count: 890, icon: 'doctor' },
  ];

  return (
    <PageLayout title="Online Reach">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Online Reach</Text>
          <Text style={styles.subtitle}>Monitor and improve your online presence</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Icon name={stat.icon} size={32} color="#1d9be3" />
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Completion</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '85%' }]} />
          </View>
          <Text style={styles.progressText}>85% Complete</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Improve Your Reach</Text>
          <View style={styles.tipCard}>
            <Icon name="lightbulb-on" size={24} color="#1d9be3" />
            <Text style={styles.tipText}>
              Complete your profile to appear higher in search results
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="star" size={24} color="#1d9be3" />
            <Text style={styles.tipText}>
              Encourage satisfied patients to leave reviews
            </Text>
          </View>
        </View>
      </ScrollView>
    </PageLayout>
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
