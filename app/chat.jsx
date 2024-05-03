import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import React, { useState, useEffect } from "react"
import { Link } from 'expo-router'

export default function Chat() {
    const [text, setText] = useState(' ');
    const [messages, setMessages] = useState([]);

    // Function to send a message
    const sendMessage = async () => {
        try {
            const response = await fetch('your_api_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });
            const data = await response.json();
            setMessages([...messages, { text: text, sender: 'user' }]);
            setText('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Function to receive messages
    const receiveMessages = async () => {
        try {
            const response = await fetch('your_api_url');
            const data = await response.json();
            // Assuming data is an array of messages
            setMessages([...messages, ...data]);
        } catch (error) {
            console.error('Error receiving messages:', error);
        }
    };

    useEffect(() => {
        receiveMessages(); // Fetch messages when component mounts
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: "#000", flex: 1 }} >
            <StatusBar barStyle="light-content" />
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <Link href="/main">
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <ImageBackground source={require('../assets/arrow.png')} style={{ width: 20, height: 20, top: "9%", left: "2%" }} />
                        <Text style={styles.Beirut}>Beirut</Text>
                    </View>
                </Link>
                <View style={{ display: "flex", flex: "column" }}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.circle}></View>
                        <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
                    </View>
                    <Text style={styles.TodayText}>What do you feel like today?</Text>
                </View>
                {/* Render received messages */}
                {messages.map((message, index) => (
                    <View key={index} style={{ alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start', margin: 10 }}>
                        <Text style={{ color: '#fff' }}>{message.text}</Text>
                    </View>
                ))}
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", borderRadius: 20, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300, left: 50, bottom: "5%" }}>
                    <View style={{ display: "flex" }}>
                        <TextInput style={styles.inputText} onChangeText={setText} placeholderTextColor="#fff" placeholder='Message Beirut...' value={text} />
                    </View>
                    <View style={{ display: "flex" }}>
                        <TouchableOpacity onPress={sendMessage}>
                            <ImageBackground source={require('../assets/send.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
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
    TodayText: {
        fontFamily: "Hanken Grotesk Italic",
        fontStyle: "italic",
        fontWeight: "700",
        fontSize: 20,
        color: "#fff",
        alignSelf: "center",
        top: "20%"
    },
    inputText: {
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 24,
    }
})
