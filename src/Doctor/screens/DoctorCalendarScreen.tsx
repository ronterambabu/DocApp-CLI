import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DoctorHeader from '../components/DoctorHeader';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';

// Add index signature to allow string indexing
const meetings: { [date: string]: { time: string; title: string; description: string; datetime: string }[] } = {
  '2025-06-21': [
    { time: '10:00 AM', title: 'Patient: John Smith', description: 'General Consultation', datetime: '2025-06-21T10:00:00' },
    { time: '2:00 PM', title: 'Patient: Sarah Lee', description: 'Follow-up', datetime: '2025-06-21T14:00:00' },
  ],
  '2025-06-22': [
    { time: '11:30 AM', title: 'Patient: Mike Brown', description: 'Cardiology Review', datetime: '2025-06-22T11:30:00' },
  ],
  '2025-06-23': [
    { time: '9:00 AM', title: 'Patient: Priya Singh', description: 'Annual Checkup', datetime: '2025-06-23T09:00:00' },
    { time: '3:00 PM', title: 'Patient: Alex Kim', description: 'Lab Results Discussion', datetime: '2025-06-23T15:00:00' },
  ],
};

const DoctorCalendarScreen = () => {
  const [selected, setSelected] = useState('2025-06-21');
  const now = new Date();

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Calendar" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-4 text-center`}>Your Calendar</Text>
        <Text style={tw`text-base text-gray-600 mb-4 text-center`}>View and manage your upcoming meetings and appointments.</Text>
        <Calendar
          current={selected}
          onDayPress={day => setSelected(day.dateString)}
          markedDates={{
            ...Object.keys(meetings).reduce((acc: Record<string, any>, date) => {
              acc[date] = { marked: true, dotColor: '#1d9be3', selected: date === selected, selectedColor: '#202b6d' };
              return acc;
            }, {} as Record<string, any>),
            [selected]: { selected: true, selectedColor: '#202b6d', marked: !!meetings[selected], dotColor: '#1d9be3' },
          }}
          theme={{
            todayTextColor: '#1d9be3',
            arrowColor: '#202b6d',
            selectedDayBackgroundColor: '#202b6d',
            selectedDayTextColor: '#fff',
            dotColor: '#1d9be3',
          }}
          style={tw`rounded-2xl bg-white shadow-sm mb-6`}
          enableSwipeMonths={true}
        />
        <View style={tw`mt-2`}>
          <Text style={tw`text-lg font-semibold text-[#202b6d] mb-2`}>Meetings on {selected}</Text>
          {Array.isArray(meetings[selected]) ? (meetings[selected] as { time: string; title: string; description: string; datetime: string }[]).map((meeting, idx) => {
            // Check if meeting is within 30 minutes from now
            const meetingTime = new Date(meeting.datetime);
            const diff = (meetingTime.getTime() - now.getTime()) / (1000 * 60); // in minutes
            const isJoinable = diff >= 0 && diff <= 30;
            return (
              <View key={idx} style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm`}>
                <Text style={tw`text-[#202b6d] font-bold text-base`}>{meeting.time} - {meeting.title}</Text>
                <Text style={tw`text-gray-500 text-sm mt-1`}>{meeting.description}</Text>
                {isJoinable && (
                  <TouchableOpacity style={tw`mt-3 bg-[#1d9be3] rounded-full px-4 py-2 items-center`} activeOpacity={0.8}>
                    <Text style={tw`text-white font-bold`}>Join Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }) : (
            <Text style={tw`text-gray-400 text-center mt-4`}>No meetings scheduled for this day.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorCalendarScreen;
