import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Pressable, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function login() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation()

    const saveUsername = async (username) => {
        try {
            await AsyncStorage.setItem('username', username)
        } catch (error) {
            console.error("Failed to save username:", username, "due to error:", error)
        }
    }

    useEffect(() => {
        saveUsername(username)
    }, [username])

    const onChangeTextUsername = (text) => {
        setUsername(text)
    }

    const onChangeTextPassword = (text) => {
        setPassword(text)
    }

    const loginMain = async () => {
        console.log("Logging in with username:", username, "and password:", password)

        try {
            const response = await fetch('https://yourbeirut.tech:3002/loginUser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Successfully logged in with username:", username);
                navigation.navigate('main')
            } else {
                console.error("Failed to login with username:", username);
            }
        } catch (error) {
            console.error("Failed to login with username:", username, "due to error:", error);
        }
    }
    return (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <StatusBar barStyle="light-content" />
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", top: 100 }}>
                <View style={styles.circle}></View>
                <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
            </View>
            <View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 80 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeTextUsername} placeholderTextColor="#fff" placeholder='Username' value={username} />
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 100 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeTextPassword} placeholderTextColor="#fff" placeholder='Password' value={password} secureTextEntry={true} />
                </View>
            </View>
            <Pressable style={styles.enterButton} onPress={loginMain}>
                <Text style={styles.text}>Login</Text>
            </Pressable>
            <View>
                <Link href="/signup" style={styles.account}>
                    <Text style={styles.accountText}>Haven't made an account?</Text>
                </Link>
            </View>
            <ImageBackground
                source={require('../assets/wave.png')}
                style={styles.wave}
                resizeMode="cover"
            ></ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    wave: {
        width: "100%",
        height: 100,
        bottom: -30
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute"
    },
    imageBackground: {
        position: "relative",
        width: 150,
        height: 150,
        top: "15%",
        left: "2%"
    },
    inputText: {
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 24,
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
        top: 60,
    },
    text: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    account: {
        top: 60,
        alignSelf: "center"
    },
    accountText: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontSize: 18,
        textDecorationLine: "underline",
        color: "#fff"
    }
})