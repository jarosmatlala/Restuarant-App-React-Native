import React from 'react';
import { ScrollView, Text, Image } from 'react-native'; 
import COLORS from '../consts/colors'; 
import restaurants from '../consts/restuarants'; 

const DetailsScreen = ({ route }) => {
    const { restaurantId } = route.params; 
    const restaurant = restaurants.find(r => r.id === restaurantId);

    if (!restaurant) {
        return <Text>Restaurant not found!</Text>; 
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>Details for {restaurant.name}</Text>

            <Text style={{ fontSize: 18, marginVertical: 5 }}>Location: {restaurant.location}</Text>
            <Text style={{ fontSize: 18, marginVertical: 5 }}>Price: ${restaurant.price}</Text>
            
            <Image source={restaurant.image} style={{ width: 200, height: 200, marginVertical: 10 }} />
        </ScrollView>
    );
};

export default DetailsScreen;