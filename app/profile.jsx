import { Text, View, StatusBar, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
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

    const retrieveUsername = async () => {
        try {
            const username = await AsyncStorage.getItem('username')
            if (username !== null) {
                setUsername(username);
            }
        } catch (error) {
            console.error("Failed to retrieve username due to error:", error)
        }
    }

    const handleCheckboxToggle = (checkbox, value) => {
        if (value) {
            setPreferences([...preferences, checkbox]);
        } else {
            setPreferences(preferences.filter(preference => preference !== checkbox));
        }
    }

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
                body: JSON.parse(JSON.stringify({
                    preferences: preferences,
                    username: username
                }))
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Preferences added for username:", username);
            } else {

            }
        } catch (error) {
            console.error("Failed to add preferences for username:", username, "due to error:", error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar barStyle="light-content" />
            <Link href="/main">
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <ImageBackground source={require('../assets/arrow.png')} style={{ width: 20, height: 20, top: "9%", left: "2%" }} />
                    <Text style={styles.Beirut}>Beirut</Text>
                </View>
            </Link>
            <View style={{ display: "flex", flexDirection: "row", left: 250, top: -40 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <Text style={styles.helloText}>{username}</Text>
                    <View style={styles.icon} />
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "column", padding: 20, borderRadius: 20, borderColor: 'white', borderWidth: 1, top: "10%", width: 350, left: 20 }}>
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                    <Text style={{ color: "#fff", paddingTop: 15, paddingLeft: 5, fontSize: 30 }}>Preferences</Text>
                    <Text style={{ color: "#fff", paddingTop: 15, paddingLeft: 5, fontSize: 20 }}>Select all that apply</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                        <CheckBox
                            value={toggleVeganCheckBox}
                            onValueChange={newValue => {
                                setToggleVeganCheckBox(newValue);
                                handleCheckboxToggle("vegan", newValue);
                            }}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "#fff", paddingTop: 3, paddingLeft: 5, fontSize: 14 }}>Vegan</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                        <CheckBox
                            value={toggleVegetarianCheckBox}
                            onValueChange={newValue => {
                                setToggleVegetarianCheckBox(newValue);
                                handleCheckboxToggle("vegetarian", newValue);
                            }}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "#fff", paddingTop: 3, paddingLeft: 5, fontSize: 14 }}>Vegetarian</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                        <CheckBox
                            value={toggleGlutenFreeCheckBox}
                            onValueChange={newValue => {
                                setToggleGlutenFreeCheckBox(newValue);
                                handleCheckboxToggle("glutenFree", newValue);
                            }}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "#fff", paddingTop: 3, paddingLeft: 5, fontSize: 14 }}>Gluten Free</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                        <CheckBox
                            value={toggleHalalCheckBox}
                            onValueChange={newValue => {
                                setToggleHalalCheckBox(newValue);
                                handleCheckboxToggle("halal", newValue);
                            }}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "#fff", paddingTop: 3, paddingLeft: 5, fontSize: 14 }}>Halal</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                        <CheckBox
                            value={toggleIndoorCheckBox}
                            onValueChange={newValue => {
                                setToggleIndoorCheckBox(newValue);
                                handleCheckboxToggle("indoor", newValue);
                            }}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "#fff", paddingTop: 3, paddingLeft: 5, fontSize: 14 }}>Indoor</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                        <CheckBox
                            value={toggleOutdoorCheckBox}
                            onValueChange={newValue => {
                                setToggleOutdoorCheckBox(newValue);
                                handleCheckboxToggle("outdoor", newValue);
                            }}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ color: "#fff", paddingTop: 3, paddingLeft: 5, fontSize: 14 }}>Outdoor</Text>
                    </View>
                </View>
                <View style={{ paddingVertical: 20 }}>
                    <Pressable style={styles.enterButton} onPress={addPreferences}>
                        <Text style={styles.text}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    helloText: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 24,
        top: -2,
        color: "#fff",
        paddingTop: 15,
        paddingRight: 20,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 100,
        right: 10,
        top: -5,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Beirut: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 35,
        color: "#fff",
        paddingLeft: 15
    },
    enterButton: {
        color: "#fff",
        backgroundColor: "#8B2635",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        alignItems: "center",
        alignSelf: "center",
    },
    text: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
});