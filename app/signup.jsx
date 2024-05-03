import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React from 'react'

export default function login() {
    const [text, onChangeText] = React.useState(' ')
    return (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", top: 70 }}>
                <View style={styles.circle}></View>
                <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
            </View>
            <View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 50 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeText} placeholderTextColor="#fff" placeholder='Email' />
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 70 }}>
                    <TextInput stbyle={styles.inputText} onChangeText={onChangeText} placeholderTextColor="#fff" placeholder='Username' />
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 90 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeText} placeholderTextColor="#fff" placeholder='Password' />
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 110 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeText} placeholderTextColor="#fff" placeholder='Confirm Password' />
                </View>
            </View>
            <Pressable style={styles.enterButton}>
                <Text style={styles.text}>Sign Up</Text>
            </Pressable>
            <View>
                <Link href="/login" style={styles.account}>
                    <Text style={styles.accountText}>Already have an account?</Text>
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
        top: 80,
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