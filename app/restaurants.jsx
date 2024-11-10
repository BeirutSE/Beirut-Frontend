import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, Modal, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-reanimated-carousel';
import { useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [tag, setTag] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { width } = useWindowDimensions();
    const [sortOption, setSortOption] = useState('none');
    const [filterArea, setFilterArea] = useState('all');

    const handleRestaurantPress = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setModalVisible(true);
    };

    const filterRestaurants = (restaurants) => {
        let filteredRestaurants = [...restaurants];

        if (filterArea !== 'all') {
            filteredRestaurants = filteredRestaurants.filter(restaurant =>
                restaurant.address.includes(filterArea)
            );
        }

        return filteredRestaurants;
    };
    const getDefaultImage = () => {
        return require('../assets/beirut.png');
    };

    const sortRestaurants = (restaurants) => {
        if (!restaurants) return [];
        if (sortOption === 'none') {
            return restaurants.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
        } else if (sortOption === 'openingTime') {
            return restaurants.sort((a, b) => {
                const aTime = a.openingTime.split(':');
                const bTime = b.openingTime.split(':');
                return aTime[0] - bTime[0] || aTime[1] - bTime[1];
            });
        } else if (sortOption === 'capacity') {
            return restaurants.sort((a, b) => a.capacity - b.capacity);
        }
    }


    const retrieveTag = async () => {
        try {
            const tag = await AsyncStorage.getItem('tag')
            if (tag !== null) {
                setTag(tag);
                fetchRestaurants(tag);
            }
        } catch (error) {
            console.error("Failed to retrieve tag due to error:", error)
        }
    }

    const fetchRestaurants = async (tags) => {
        try {
            const response = await fetch(`https://yourbeirut.tech:3002/getRestaurantByCriteria?tags=${tags}`);
            if (response.ok) {
                const data = await response.json();
                setRestaurants(data);
            } else {
                console.error('Failed to fetch restaurants:', response);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        retrieveTag();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar barStyle="light-content" />
            <Link href="/chat">
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <ImageBackground source={require('../assets/arrow.png')} style={{ width: 20, height: 20, top: "9%", left: "2%" }} />
                    <Text style={styles.Beirut}>Beirut</Text>
                </View>
            </Link>
           <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', top: -38, left: 120}}>{tag}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Sort by:</Text>
                <Picker
                    selectedValue={sortOption}
                    style={{ width: 140, color: 'white', backgroundColor: '#8B2635' }}
                    itemStyle={{ color: 'white', fontSize: 10, height: 40 }}
                    onValueChange={(itemValue) => setSortOption(itemValue)}
                >
                    <Picker.Item label="None" value="none" />
                    <Picker.Item label="Opening Time" value="openingTime" />
                    <Picker.Item label="Capacity" value="capacity" />
                </Picker>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Filter by area:</Text>
                <Picker
                    selectedValue={filterArea}
                    style={{ width: 140, color: 'white', backgroundColor: '#8B2635' }}
                    itemStyle={{ color: 'white', fontSize: 10, height: 40 }}
                    onValueChange={(itemValue) => setFilterArea(itemValue)}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Hamra" value="Hamra" />
                    <Picker.Item label="Ashrafieh" value="Ashrafieh" />
                    <Picker.Item label="Jbeil" value="Jbeil" />
                    <Picker.Item label="Jounieh" value="Jounieh" />
                </Picker>
            </View>
            <ScrollView>
                {sortRestaurants(filterRestaurants(restaurants)).map((restaurant, index) => (
                    <TouchableOpacity key={index} onPress={() => handleRestaurantPress(restaurant)}>
                        <View style={styles.restaurantContainer}>
                            <View style={styles.imageContainer}>
                                {restaurant.imageLinks && JSON.parse(restaurant.imageLinks)[0] ? (
                                    <ImageBackground
                                        source={{ uri: JSON.parse(restaurant.imageLinks)[0] }}
                                        style={styles.restaurantImage}
                                    />
                                ) : (
                                    <ImageBackground source={getDefaultImage()} style={styles.beirutImage} />
                                )}
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                        <Text style={{ color: "#8B2635", fontWeight: 'bold', marginBottom: 10 }}>Swipe to See More!</Text>
                        <Carousel
                            width={width}
                            height={width / 2}
                            data={selectedRestaurant && JSON.parse(selectedRestaurant.imageLinks)}
                            renderItem={({ item }) => (
                                <ImageBackground source={{ uri: item }} style={{ width: width, height: width / 2, padding: 20 }} />
                            )}
                        />
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30 }}>{selectedRestaurant && selectedRestaurant.restaurantName}</Text>
                        <Text style={{ marginTop: 10 }}>Opening Time: {selectedRestaurant && selectedRestaurant.openingTime}</Text>
                        <Text>Closing Time: {selectedRestaurant && selectedRestaurant.closingTime}</Text>
                        <Text>Address: {selectedRestaurant && selectedRestaurant.address}</Text>
                        <Text>Capacity: {selectedRestaurant && selectedRestaurant.capacity}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{ color: '#8B2635', marginTop: 20 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    Beirut: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 35,
        color: "#fff",
        paddingLeft: 15
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    restaurantContainer: {
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 15,
        width: 350,
        left: 20,
        top: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    imageContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        padding: 10,
        borderRadius: 50
    },
    restaurantImage: {
        width: '100%',
        height: 200,
    },
    beirutImage: {
        width: '60%',
        left: 115,
        height: 200,
    },
    restaurantName: {
        fontFamily: 'Hanken Grotesk',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: 32,
        lineHeight: 32,
        color: '#8B2635',
        top: 3,
        padding: 10,
        maxWidth: 200,
        textAlign: 'center',
    },
    nameContainer: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        position: 'absolute',
        bottom: 20,
        left: 20,
    }
});
