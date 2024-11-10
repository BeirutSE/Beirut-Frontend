// NavBar.jsx
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native-web';

export default function NavBar({ isOpen, onClose }) {
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [selectedTag, setSelectedTag] = useState('');
    const navigation = useNavigation();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const handlePress = async (restaurantName) => {
        setSelectedRestaurant(restaurantName);

        try {
            await AsyncStorage.setItem('tag', restaurantName);
            navigation.navigate('restaurants');
        } catch (error) {
            console.error("Failed to save tag:", restaurantName, "due to error:", error);
        }
    };

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isOpen ? 0 : 300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    return (
        <Animated.View style={[styles.navBar, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profilePic} />
                <View>
                    <Text style={styles.profileName}>Adnan Al Zahabi</Text>
                    <Text style={styles.profileSubtext}>Lebanese</Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Restaurants Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Restaurants</Text>

                {/* Italian Restaurant */}
                <TouchableOpacity
                    style={[
                        styles.sectionItem,
                        selectedRestaurant === 'Italian' && styles.selectedSection
                    ]}
                    onPress={() => handlePress('Italian')}
                >
                    <FontAwesome name="cutlery" size={18} color={selectedRestaurant === 'Italian' ? "red" : "white"} />
                    <Text style={[
                        styles.sectionText,
                        selectedRestaurant === 'Italian' && styles.selectedText
                    ]}>Italian</Text>
                </TouchableOpacity>

                {/* American Restaurant */}
                <TouchableOpacity
                    style={[
                        styles.sectionItem,
                        selectedRestaurant === 'American' && styles.selectedSection
                    ]}
                    onPress={() => handlePress('American')}
                >
                    <FontAwesome name="cutlery" size={18} color={selectedRestaurant === 'American' ? "red" : "white"} />
                    <Text style={[
                        styles.sectionText,
                        selectedRestaurant === 'American' && styles.selectedText
                    ]}>American</Text>
                </TouchableOpacity>

                {/* Sweet Restaurant */}
                <TouchableOpacity
                    style={[
                        styles.sectionItem,
                        selectedRestaurant === 'Sweet' && styles.selectedSection
                    ]}
                    onPress={() => handlePress('Sweet')}
                >
                    <FontAwesome name="cutlery" size={18} color={selectedRestaurant === 'Sweet' ? "red" : "white"} />
                    <Text style={[
                        styles.sectionText,
                        selectedRestaurant === 'Sweet' && styles.selectedText
                    ]}>Sweet</Text>
                </TouchableOpacity>

                {/* More Button */}
                <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreText}>More</Text>
                    <Feather name="chevron-right" size={16} color="white" />
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Settings Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.sectionItem}>
                    <Feather name="lock" size={18} color="white" />
                    <Text style={styles.sectionText}>Change Credentials</Text>
                </View>
                <TouchableOpacity style={styles.sectionItem} onPress={() => navigation.navigate('profile')}>
                    <Feather name="sliders" size={18} color="white" />
                    <Text style={styles.sectionText}>Adjust Preferences</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Pod Version 1.0</Text>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.logoutButton}>
                    <FontAwesome name="sign-out" size={18} color="black" style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '70%',
        backgroundColor: '#8B2D3B',
        padding: 20,
        zIndex: 11,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profileName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileSubtext: {
        color: '#fff',
        fontSize: 12,
    },
    divider: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: 10, // Increase this value to push the items further to the right
    },
    sectionText: {
        color: '#fff',
        fontSize: 16, // Increase the font size here
        marginLeft: 15, // Increase the spacing between the icon and text,
        paddingVertical: 5, // Increase the vertical
    },
    moreButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8,
    },
    moreText: {
        color: '#fff',
        fontSize: 18,
        marginRight: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: '100%',
        justifyContent: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 17,
        marginBottom: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    logoutButton: {
        backgroundColor: '#D9D9D9',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: '60%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 10,
    },
});
