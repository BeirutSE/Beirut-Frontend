import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import React from 'react'

export default function login() {
    const [text, onChangeText] = React.useState(' ')
    
    const loginMain = () => {
        console.log('Login')
    }
    return (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", top: 100 }}>
                <View style={styles.circle}></View>
                <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
            </View>
            <View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 80 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeText} placeholderTextColor="#fff" placeholder='Username' />
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, top: 100 }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeText} placeholderTextColor="#fff" placeholder='Password' />
                </View>
            </View> 
            // implement loginMain function https://docs.expo.dev/router/reference/authentication/
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