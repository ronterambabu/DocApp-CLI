import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import { Star, TrendingUp, Users, Award, MessageCircle } from 'lucide-react-native';

const features = [
	{
		icon: <TrendingUp size={28} color="#1d9be3" />,
		title: 'Boost Your Online Reach',
		desc: 'Appear higher in patient searches and get more appointment bookings with Prime visibility.',
	},
	{
		icon: <Users size={28} color="#1d9be3" />,
		title: 'Prime Patient Community',
		desc: 'Connect with a premium patient base seeking top-rated doctors for their healthcare needs.',
	},
	{
		icon: <Award size={28} color="#1d9be3" />,
		title: 'Verified Prime Badge',
		desc: 'Showcase your expertise and credibility with a special Prime badge on your profile.',
	},
	{
		icon: <MessageCircle size={28} color="#1d9be3" />,
		title: 'Priority Support',
		desc: 'Get faster support and dedicated assistance from our Prime helpdesk.',
	},
	{
		icon: <Star size={28} color="#1d9be3" />,
		title: 'Exclusive Insights',
		desc: 'Access advanced analytics and tips to further grow your practice and reputation.',
	},
];

const DoctorsPrimeScreen = () => {
	return (
		<View style={tw`flex-1 bg-[#f8fafc]`}>
			<DoctorHeader title="Doctor's Prime" showSettings showNotifications />
			<ScrollView contentContainerStyle={tw`p-5 pb-10 items-center`}>
				<View style={tw`w-full max-w-xl bg-white rounded-2xl p-6 shadow-sm mb-6`}>
					<Text style={tw`text-3xl font-bold text-[#202b6d] mb-2 text-center`}>
						Doctor's Prime
					</Text>
					<Text style={tw`text-base text-gray-600 mb-4 text-center`}>
						Unlock exclusive features to grow your practice, improve your reach, and connect with
						more patients.
					</Text>
					<Text style={tw`text-lg font-bold text-[#1d9be3] mb-2 text-center`}>Prime Features</Text>
					{features.map((f, idx) => (
						<View key={idx} style={tw`flex-row items-start mb-5`}>
							<View style={tw`mr-4 mt-1`}>{f.icon}</View>
							<View style={tw`flex-1`}>
								<Text style={tw`text-[#202b6d] font-semibold text-base`}>{f.title}</Text>
								<Text style={tw`text-gray-500 text-sm mt-1`}>{f.desc}</Text>
							</View>
						</View>
					))}
					<TouchableOpacity
						style={tw`mt-4 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
						activeOpacity={0.85}
					>
						<Text style={tw`text-white font-bold text-lg`}>Upgrade to Prime</Text>
					</TouchableOpacity>
				</View>
				<View style={tw`w-full max-w-xl bg-white rounded-2xl p-6 shadow-sm`}>
					<Text style={tw`text-lg font-bold text-[#202b6d] mb-2`}>Why Go Prime?</Text>
					<Text style={tw`text-gray-600 text-base mb-2`}>
						Doctor's Prime is designed for ambitious doctors who want to:
					</Text>
					<Text style={tw`text-gray-700 text-base mb-1`}>
						• Grow their online reputation and patient base
					</Text>
					<Text style={tw`text-gray-700 text-base mb-1`}>
						• Get more appointments and positive reviews
					</Text>
					<Text style={tw`text-gray-700 text-base mb-1`}>
						• Stand out with a verified Prime badge
					</Text>
					<Text style={tw`text-gray-700 text-base mb-1`}>
						• Access exclusive resources and support
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default DoctorsPrimeScreen;
