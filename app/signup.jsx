import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, Keyboard, StatusBar } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import React from 'react'

export default function signup() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const navigation = useNavigation()

    const onChangeTextUsername = (text) => {
        setUsername(text)
    }

    const onChangeTextPassword = (text) => {
        setPassword(text)
    }

    const onChangeTextConfirmPassword = (text) => {
        setConfirmPassword(text)
    }

    const onChangeTextEmail = (text) => {
        setEmail(text)
    }

    const onChangeTextGender = (text) => {
        setGender(text)
    }

    const onChangeTextPhoneNumber = (text) => {
        setPhoneNumber(text)
    }

    const signUp = async () => {
        console.log("Signing up with username:", username, "password:", password, "email:", email, "phoneNumber:", phoneNumber)
        const userData = {
            username: username,
            password: password,
            email: email,
            phoneNumber: phoneNumber
        };

        try {
            const response = await fetch('https://yourbeirut.tech:3002/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.parse(JSON.stringify(userData))
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Successfully signed up with username:", username);
                navigation.navigate('login')

            } else {
                console.error("Failed to sign up with username:", username);
            }

        } catch (error) {
            console.log("Failed to sign up with username:", username, "due to error:", error);
        }
    }

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 200 : 'height'} style={{ backgroundColor: "#000", flex: 1 }} >
                <StatusBar barStyle="light-content" />
                <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", top: 10 }}>
                        <View style={styles.circle}></View>
                        <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
                    </View>
                    <ScrollView>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 10, justifyContent: "space-between", width: 300, left: 50, top: 30 }}>
                            <TextInput style={styles.inputText} onChangeText={onChangeTextEmail} placeholderTextColor="#fff" placeholder='Email' />
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 10, justifyContent: "space-between", width: 300, left: 50, top: 50 }}>
                            <TextInput style={styles.inputText} onChangeText={onChangeTextUsername} placeholderTextColor="#fff" placeholder='Username' />
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 10, justifyContent: "space-between", width: 300, left: 50, top: 70 }}>
                            <TextInput style={styles.inputText} onChangeText={onChangeTextPassword} placeholderTextColor="#fff" placeholder='Password' secureTextEntry={true} />
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 10, justifyContent: "space-between", width: 300, left: 50, top: 90 }}>
                            <TextInput style={styles.inputText} onChangeText={onChangeTextConfirmPassword} placeholderTextColor="#fff" placeholder='Confirm Password' secureTextEntry={true} />
                        </View>
                        <Pressable style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 10, justifyContent: "space-between", width: 300, left: 50, top: 110 }}>
                            <TextInput style={styles.inputText} onChangeText={onChangeTextPhoneNumber} placeholderTextColor="#fff" placeholder='Phone Number' />
                        </Pressable>
                    </ScrollView>
                    <View style={{ display: 'flex', bottom: 140 }}>
                        <Pressable style={styles.enterButton} onPress={signUp}>
                            <Text style={styles.text}>Sign Up</Text>
                        </Pressable>
                        <Pressable style={styles.account}>
                            <Link href="/login">
                                <Text style={styles.accountText}>Already have an account?</Text>
                            </Link>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView >
            <ImageBackground
                source={require('../assets/wave.png')}
                style={styles.wave}
                resizeMode="cover"
            ></ImageBackground>
        </>
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
        width: 140,
        alignItems: "center",
        alignSelf: "center",
        top: 100,
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
        top: 120,
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