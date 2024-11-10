import { Text, View, StatusBar, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from 'expo-router';
import { ImageBackground } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [toggleVeganCheckBox, setToggleVeganCheckBox] = useState(false);
    const [toggleVegetarianCheckBox, setToggleVegetarianCheckBox] = useState(false);
    const [toggleGlutenFreeCheckBox, setToggleGlutenFreeCheckBox] = useState(false);
    const [toggleHalalCheckBox, setToggleHalalCheckBox] = useState(false);
    const [toggleIndoorCheckBox, setToggleIndoorCheckBox] = useState(false);
    const [toggleOutdoorCheckBox, setToggleOutdoorCheckBox] = useState(false);
    const navigation = useNavigation();

    const retrieveUsername = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            if (username !== null) {
                setUsername(username);
            }
        } catch (error) {
            console.error("Failed to retrieve username due to error:", error);
        }
    };

    const handleCheckboxToggle = (checkbox, value) => {
        if (value) {
            setPreferences([...preferences, checkbox]);
        } else {
            setPreferences(preferences.filter(preference => preference !== checkbox));
        }
    };

    useEffect(() => {
        retrieveUsername();
    }, []);

    const addPreferences = async () => {
        try {
            const response = await fetch('https://yourbeirut.tech:3002/addUserPreferences', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    preferences: preferences,
                    username: username
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Preferences added for username:", username);
                navigation.navigate('chat');
            } else {
                console.error("Failed to add preferences");
            }
        } catch (error) {
            console.error("Error adding preferences for username:", username, "due to error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Navigation Header */}
            <Link href="/chat">
                <View style={styles.header}>
                    <ImageBackground source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                    <Text style={styles.headerText}>Beirut</Text>
                </View>
            </Link>

            {/* Username Section */}
            <View style={styles.usernameContainer}>
                <Text style={styles.helloText}>{username}</Text>
            </View>

            {/* Preferences Section */}
            <View style={styles.preferencesContainer}>
                <Text style={styles.preferencesTitle}>Preferences</Text>

                {/* Divider */}
                <View style={styles.divider}></View>

                <Text style={styles.preferencesSubtitle}>Select all that apply</Text>

                <View style={styles.checkboxList}>
                    {[
                        { label: 'Vegan', state: toggleVeganCheckBox, setter: setToggleVeganCheckBox },
                        { label: 'Vegetarian', state: toggleVegetarianCheckBox, setter: setToggleVegetarianCheckBox },
                        { label: 'Gluten Free', state: toggleGlutenFreeCheckBox, setter: setToggleGlutenFreeCheckBox },
                        { label: 'Halal', state: toggleHalalCheckBox, setter: setToggleHalalCheckBox },
                        { label: 'Indoor', state: toggleIndoorCheckBox, setter: setToggleIndoorCheckBox },
                        { label: 'Outdoor', state: toggleOutdoorCheckBox, setter: setToggleOutdoorCheckBox },
                    ].map((item, index) => (
                        <View key={index} style={styles.checkboxRow}>
                            <Text style={styles.checkboxLabel}>{item.label}</Text>
                            <CheckBox
                                value={item.state}
                                onValueChange={(newValue) => {
                                    item.setter(newValue);
                                    handleCheckboxToggle(item.label.toLowerCase(), newValue);
                                }}
                                style={styles.checkbox}
                            />
                        </View>
                    ))}
                </View>

                {/* Save Button */}
                <Pressable style={styles.saveButton} onPress={addPreferences}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    headerText: {
        fontFamily: "Hanken Grotesk",
        fontWeight: "700",
        fontSize: 35,
        color: "#fff",
        paddingLeft: 15,
    },
    usernameContainer: {
        marginBottom: 30,
        alignItems: 'flex-start',
    },
    helloText: {
        fontFamily: "Hanken Grotesk",
        fontWeight: "500",
        fontSize: 24,
        color: "#fff",
    },
    preferencesContainer: {
        padding: 20,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: '#222',
    },
    preferencesTitle: {
        color: "#fff",
        fontSize: 30,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#fff',
        marginVertical: 15,
    },
    preferencesSubtitle: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    checkboxList: {
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    checkboxLabel: {
        color: "#fff",
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: "#8B2635",
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 12,
    },
    saveButtonText: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "Hanken Grotesk",
    },
});
