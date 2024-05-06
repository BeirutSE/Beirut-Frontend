import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, Platform, StatusBar, Pressable, ScrollView, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from "react"
import { Link } from 'expo-router'

export default function Chat() {
    const ScrollViewRef = useRef(null);
    const [chatTag, setChatTag] = useState('')
    const [message, setMessage] = useState('')
    const [aiMessage, setAiMessage] = useState('')
    const [isMessageSent, setIsMessageSent] = useState(false)
    const [messagesSent, setMessagesSent] = useState([])

    const onChangeTextMessage = (text) => {
        setMessage(text)
        setIsMessageSent(true)
    }

    

    const sendMessage = async () => {
        try {
            const response = await fetch('https://yourbeirut.tech:3002/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatTag: chatTag,
                    message: message
                }),
            });
            const data = await response.json();

            if (response.ok) {
                const receivedMessage = data.response;
                setAiMessage(receivedMessage);
                console.log('Message sent:', message);
                console.log('Message received:', receivedMessage);
                setMessagesSent([...messagesSent, , { text: message, type: 'user' }, { text: receivedMessage, type: 'ai' }]);
                setMessage('');
                Keyboard.dismiss();
            } else {
                console.error('Failed to send message:', message);
            }
        } catch (error) {yy
            console.error('Error sending message:', error);
        }
    };

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
                {!isMessageSent && (
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.circle}></View>
                            <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
                        </View>
                        <Text style={styles.TodayText}>What do you feel like today?</Text>
                    </View>
                )}
                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20, bottom: "10%", height: 650}}>
                    <ScrollView ref={ref => { this.scrollView = ref }}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
                    {messagesSent.map((msg, index) => (
                        msg && msg.text && msg.type ? (
                            <Text key={index} style={msg.type === 'user' ? styles.userMessage : styles.beirutMessage}>{msg.text}</Text>
                        ) : null
                    ))}
                    </ScrollView>
                </View>
                <View style={{ position: 'absolute', bottom: 10, left: 40, right: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderRadius: 20, borderColor: 'white', borderWidth: 1, width: '80%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ flex: 1 }}>
                        <TextInput style={styles.inputText} onChangeText={onChangeTextMessage} placeholderTextColor="#fff" placeholder='Message Beirut...' value={message} />
                    </View>
                    <TouchableOpacity onPress={sendMessage}>
                        <ImageBackground source={require('../assets/send.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
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
    },
    userMessage: {
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 10,
        alignSelf: "flex-end",
        padding: 10,
        backgroundColor: "#8B2635",
    },
    beirutMessage: {
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 10,
        alignSelf: "flex-start",
        padding: 10,
        backgroundColor: "#508CA4",
    }
})
