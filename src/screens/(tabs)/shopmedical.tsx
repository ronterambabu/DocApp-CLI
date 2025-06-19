import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const products = [
    {
        id: '1',
        name: 'Tedibar Soap 75gm',
        company: 'Curatio Healthcare Pvt. Ltd.',
        price: '₹199',
        image: 'https://source.unsplash.com/featured/?soap',
    },
    {
        id: '2',
        name: 'Dettol Cool Soap 75gm',
        company: 'Reckitt Benckiser',
        price: '₹40',
        image: 'https://source.unsplash.com/featured/?dettol',
    },
    {
        id: '3',
        name: 'Venusia Max Lotion 300ml',
        company: 'Dr. Reddys Laboratories Ltd.',
        price: '₹802',
        image: 'https://source.unsplash.com/featured/?lotion',
    },
    {
        id: '4',
        name: 'Kojivit Ultra Gel 30gm',
        company: 'Micro Labs Ltd.',
        price: '₹719',
        image: 'https://source.unsplash.com/featured/?gel',
    },
    {
        id: '5',
        name: 'Dermadew Soap 75gm',
        company: 'Hegde & Hegde Pharmaceutica Llp',
        price: '₹174',
        image: 'https://source.unsplash.com/featured/?skincare',
    },
];

export default function SkinCareScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>All Products</Text>
            <Text style={styles.subheader}>{products.length} products available</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.company}>By {item.company}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.cartBtn}>
                            <Text style={styles.cartText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#222',
    },
    subheader: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 6,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        resizeMode: 'cover',
        marginRight: 12,
        backgroundColor: '#eaeaea',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    company: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 6,
        color: '#007AFF',
    },
    cartBtn: {
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    cartText: {
        color: '#007AFF',
        fontWeight: '500',
    },
});
