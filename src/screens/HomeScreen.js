import React from 'react';
import { SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors'; // Correct path to colors
import restaurants from '../consts/restaurants'; // Correct path to restaurants

const HomeScreen = ({ navigation }) => {
    const categories = ['All', 'Popular', 'Top Rated', 'Featured'];

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <ScrollView>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>Home Screen</Text>

                {/* Categories */}
                {categories.map((category, index) => (
                    <Text key={index} style={{ fontSize: 18, marginVertical: 5 }}>{category}</Text>
                ))}

                {/* List of Restaurants */}
                <Text style={{ fontSize: 22, marginTop: 20, fontWeight: 'bold', color: COLORS.primary }}>Restaurants:</Text>
                {restaurants.map((restaurant) => (
                    <TouchableOpacity 
                        key={restaurant.id} 
                        onPress={() => navigation.navigate('DetailsScreen', { restaurantId: restaurant.id })}
                    >
                        <Text style={{ fontSize: 18, marginVertical: 5 }}>
                            {restaurant.name} - {restaurant.location} - ${restaurant.price}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;