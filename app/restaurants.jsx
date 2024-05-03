import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async (tags = '') => {
        try {
            const response = await fetch(`https://10.21.131.94/getRestaurantByCriteria?tags=${tags}`);
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    // Function to handle filter changes
    const handleFilterChange = (selectedTags) => {
        const tagsQuery = selectedTags.join(',');
        fetchRestaurants(tagsQuery);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar barStyle="light-content" />
            {restaurants.map((restaurant, index) => (
                <View key={index} style={styles.restaurantContainer}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                </View>
            ))}
        </View>
    );
}
