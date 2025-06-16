// HealthCashScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { ArrowLeft, Wallet } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const transactions = [
    {
        date: '20 May 2025',
        description: 'Expired',
        amount: '-200.0',
        color: 'text-red-500',
    },
    {
        date: '13 May 2025',
        description: 'from: Promotion',
        amount: '+200.0',
        color: 'text-green-600',
    },
];

const HealthCashScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 bg-white`}>
            <StatusBar barStyle="light-content" backgroundColor="#2E3192" />

            {/* Top Section */}
            <View style={tw`bg-[#2E3192] py-6 px-4 items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`absolute left-4 top-6`}
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>

                <View style={tw`mt-4 items-center`}>
                    <View style={tw`flex-row items-center`}>
                        <Wallet color="white" size={18} />
                        <Text style={tw`text-white text-base ml-2`}>HealthCash Balance</Text>
                    </View>
                    <Text style={tw`text-white text-4xl font-bold mt-2`}>₹0.0</Text>
                </View>
            </View>

            {/* History */}
            <ScrollView contentContainerStyle={tw`pt-4`}>
                <Text style={tw`text-base font-semibold text-gray-700 px-4`}>
                    HealthCash History
                </Text>

                {transactions.map((item, index) => (
                    <View key={index} style={tw`flex-row justify-between px-4 py-4 border-b border-gray-200`}>
                        <View>
                            <Text style={tw`text-gray-800`}>{item.date}</Text>
                            <Text style={tw`text-gray-500 text-sm`}>{item.description}</Text>
                        </View>
                        <Text style={tw`${item.color} font-semibold`}>{item.amount}</Text>
                    </View>
                ))}

                <Text style={tw`text-sm text-gray-400 px-4 mt-2 mb-10`}>
                    Expired on 19 May 2025
                </Text>
            </ScrollView>
        </View>
    );
};

export default HealthCashScreen;
