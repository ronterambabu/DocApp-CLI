import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform, TextInput } from 'react-native';
import { Plus, Clock, Calendar, Check, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import DateTimePicker from '@react-native-community/datetimepicker';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;
type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
type SlotType = { time: string; type: string };

const AvailabilityScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [selectedDay, setSelectedDay] = useState<WeekDay>('Monday');
  const [showFutureDatePicker, setShowFutureDatePicker] = useState<false | 'start' | 'end'>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slotStart, setSlotStart] = useState('');
  const [slotEnd, setSlotEnd] = useState('');
  const [slotMode, setSlotMode] = useState('In-Clinic');
  const [showCalendar, setShowCalendar] = useState(false);
  const slotModes = ['In-Clinic', 'Video Consultation'];

  const weekDays: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const schedules: Record<WeekDay, SlotType[]> = {
    Monday: [
      { time: '09:00 AM - 01:00 PM', type: 'In-Clinic' },
      { time: '02:00 PM - 06:00 PM', type: 'Video Consultation' },
    ],
    Tuesday: [
      { time: '09:00 AM - 01:00 PM', type: 'In-Clinic' },
      { time: '02:00 PM - 06:00 PM', type: 'Video Consultation' },
    ],
    Wednesday: [
      { time: '09:00 AM - 01:00 PM', type: 'In-Clinic' },
      { time: '02:00 PM - 06:00 PM', type: 'Video Consultation' },
    ],
    Thursday: [
      { time: '09:00 AM - 01:00 PM', type: 'In-Clinic' },
      { time: '02:00 PM - 06:00 PM', type: 'Video Consultation' },
    ],
    Friday: [
      { time: '09:00 AM - 01:00 PM', type: 'In-Clinic' },
      { time: '02:00 PM - 06:00 PM', type: 'Video Consultation' },
    ],
    Saturday: [
      { time: '09:00 AM - 02:00 PM', type: 'In-Clinic' },
    ],
    Sunday: [],
  };

  // Generate next 14 days for quick date selection
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Consultation Hours" showSettings showNotifications />
      {/* Remove date selector and plus button at the top */}
      {/* <View style={tw`bg-white rounded-2xl p-3 shadow-sm mx-2 mt-4 mb-2 flex-row items-center`}> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`items-center`}>
          {dateOptions.map((d, idx) => (
            <TouchableOpacity
              key={d.toDateString()}
              style={tw`mx-1 px-3 py-2 rounded-full border ${selectedDate.toDateString() === d.toDateString() ? 'bg-[#1d9be3] border-[#1d9be3]' : 'bg-white border-[#1d9be3]'}`}
              onPress={() => setSelectedDate(d)}
            >
              <Text style={tw`${selectedDate.toDateString() === d.toDateString() ? 'text-white' : 'text-[#1d9be3]'} font-bold`}>{d.getDate()}</Text>
            </TouchableOpacity>
          ))}
          {/* Calendar icon at the end */}
          {/* <TouchableOpacity
            style={tw`ml-2 px-3 py-2 rounded-full border border-[#1d9be3] bg-white`}
            onPress={() => setShowCalendar(true)}
          >
            <Calendar size={20} color="#1d9be3" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {showCalendar && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowCalendar(false);
            if (date) setSelectedDate(date);
          }}
          minimumDate={new Date()}
        />
      )} */}      <ScrollView contentContainerStyle={tw`p-4 pb-10`}> 
        <Text style={tw`text-2xl font-bold text-[#202b6d] mb-2 text-center`}>Schedule</Text>
        <Text style={tw`text-base text-gray-500 mb-6 text-center`}>Manage your availability</Text>

        {/* Date Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`mb-6 px-2`}
        >
          {dateOptions.map((d) => (
            <TouchableOpacity
              key={d.toDateString()}
              style={tw`px-4 py-3 mr-3 rounded-xl ${selectedDate.toDateString() === d.toDateString() ? 'bg-[#202b6d]' : 'bg-white border border-gray-200'}`}
              onPress={() => setSelectedDate(d)}
            >
              <Text style={tw`${selectedDate.toDateString() === d.toDateString() ? 'text-white' : 'text-gray-700'} font-medium text-center`}>
                {d.getDate()}
              </Text>
              <Text style={tw`${selectedDate.toDateString() === d.toDateString() ? 'text-white' : 'text-gray-500'} text-xs text-center mt-1`}>
                {d.toLocaleString('default', { weekday: 'short' })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>{/* Today's Schedule */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <Text style={tw`text-lg font-bold text-[#202b6d]`}>Today's Schedule</Text>
            <TouchableOpacity
              style={tw`bg-[#202b6d] px-4 py-2 rounded-full flex-row items-center`}
              onPress={() => setShowFutureDatePicker('start')}
            >
              <Plus size={16} color="#fff" />
              <Text style={tw`text-white font-medium ml-1`}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {schedules[selectedDay].length === 0 ? (
            <View style={tw`py-8 items-center`}>
              <Text style={tw`text-gray-400 text-center`}>No slots available</Text>
              <Text style={tw`text-gray-300 text-sm text-center mt-1`}>Tap 'Add' to create your first slot</Text>
            </View>
          ) : (
            schedules[selectedDay].map((slot, idx) => (
              <View key={idx} style={tw`flex-row items-center justify-between p-3 mb-2 bg-gray-50 rounded-lg`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-[#202b6d] font-medium text-base`}>{slot.time}</Text>
                  <Text style={tw`text-gray-500 text-sm mt-1`}>
                    {slot.type === 'Video Consultation' ? 'Video Call' : 'In-Person'}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={tw`p-2`} 
                  onPress={() => Alert.alert('Remove Slot', 'Are you sure you want to remove this slot?')}
                >
                  <X size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>        {/* Add New Slot */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#202b6d] mb-4`}>Add New Slot</Text>
          
          <View style={tw`flex-row mb-4`}>
            <TouchableOpacity
              style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2 items-center`}
              onPress={() => setShowFutureDatePicker('start')}
            >
              <Text style={tw`text-gray-500 text-sm`}>Start Time</Text>
              <Text style={tw`text-[#202b6d] font-bold text-lg mt-1`}>{slotStart || '00:00'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={tw`flex-1 border border-gray-300 rounded-lg p-3 ml-2 items-center`}
              onPress={() => setShowFutureDatePicker('end')}
            >
              <Text style={tw`text-gray-500 text-sm`}>End Time</Text>
              <Text style={tw`text-[#202b6d] font-bold text-lg mt-1`}>{slotEnd || '00:00'}</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row mb-4`}>
            {slotModes.map((mode) => (
              <TouchableOpacity
                key={mode}
                style={tw`flex-1 p-3 mr-2 rounded-lg border ${
                  slotMode === mode 
                    ? 'bg-[#202b6d] border-[#202b6d]' 
                    : 'bg-white border-gray-300'
                }`}
                onPress={() => setSlotMode(mode)}
              >
                <Text style={tw`text-center font-medium ${
                  slotMode === mode ? 'text-white' : 'text-gray-700'
                }`}>
                  {mode === 'Video Consultation' ? 'Video Call' : mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>          <TouchableOpacity
            style={tw`bg-[#1d9be3] rounded-lg py-3 items-center`}
            onPress={() => {
              if (!slotStart || !slotEnd) {
                Alert.alert('Error', 'Please select both start and end times');
                return;
              }
              Alert.alert('Success', `Slot added: ${slotStart} - ${slotEnd} (${slotMode})`);
              setSlotStart('');
              setSlotEnd('');
            }}
          >
            <Text style={tw`text-white font-bold text-base`}>Add Slot</Text>
          </TouchableOpacity>
        </View>        {/* Time Pickers */}
        {showFutureDatePicker === 'start' && (
          <DateTimePicker
            value={slotStart ? new Date(`1970-01-01T${slotStart}`) : new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            onChange={(event, time) => {
              setShowFutureDatePicker(false);
              if (time) setSlotStart(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }}
          />
        )}
        {showFutureDatePicker === 'end' && (
          <DateTimePicker
            value={slotEnd ? new Date(`1970-01-01T${slotEnd}`) : new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            onChange={(event, time) => {
              setShowFutureDatePicker(false);
              if (time) setSlotEnd(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }}
          />
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={tw`bg-[#202b6d] rounded-lg py-4 items-center mx-4 mb-4`}
          onPress={() => {
            Alert.alert('Success', 'Your schedule has been saved!', [{ 
              text: 'OK',
              onPress: () => navigation.goBack()
            }]);
          }}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AvailabilityScreen;
