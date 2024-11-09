import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, Platform, StatusBar, Pressable, ScrollView, Keyboard, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from "react"
import { Link } from 'expo-router'
import { Audio } from 'expo-av'

export default function Chat() {
    const ScrollViewRef = useRef(null);
    const [chatTag, setChatTag] = useState('');
    const [message, setMessage] = useState('');
    const [aiMessage, setAiMessage] = useState('');
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);
    const [messagesSent, setMessagesSent] = useState([]);
    const [recording, setRecording] = useState(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const micSize = useRef(new Animated.Value(40)).current; // Default size of mic button

    // Function to animate mic button growth
    const animateMicPressIn = () => {
        Animated.spring(micSize, {
            toValue: 60,  // Increase size when long-pressed
            useNativeDriver: false,
        }).start();
    };

    const animateMicPressOut = () => {
        Animated.spring(micSize, {
            toValue: 40,  // Reset size when released
            useNativeDriver: false,
        }).start();
    };

    // Start recording when long press starts
    const startRecording = async () => {
        try {
            if (permissionResponse?.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    // Stop recording when long press ends
    const stopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(null);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    };

    const onChangeTextMessage = (text) => {
        setMessage(text);

        if (text.length > 0) {
            setHasTyped(true);
            setIsMessageSent(false); // Ensure the prompt only hides if a message is truly sent
        } else {
            // Reset states when text is deleted
            setHasTyped(false);
            setIsMessageSent(false);
        }
    };

    const handleSendOrRecord = () => {
        if (message) {
            sendMessage();
        } else {
            if (recording) {
                stopRecording();
            } else {
                startRecording();
            }
        }
    };

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
                setMessagesSent([...messagesSent, { text: message, type: 'user' }, { text: receivedMessage, type: 'ai' }]);
                setMessage('');
                setIsMessageSent(true);
                setHasTyped(false); // Reset hasTyped on message send
                Keyboard.dismiss();
            } else {
                console.error('Failed to send message:', message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: "#000", flex: 1 }} >
            <StatusBar barStyle="light-content" />
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <Link href="/main">
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.Beirut}>Beirut</Text>
                    </View>
                </Link>
                {(!isMessageSent && !hasTyped) && (
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.circle}></View>
                            <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
                        </View>
                        <Text style={styles.TodayText}>What do you feel like today?</Text>
                    </View>
                )}
                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20, bottom: "10%", height: 650 }}>
                    <ScrollView ref={ref => { this.scrollView = ref }} onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
                        {messagesSent.map((msg, index) => (
                            msg && msg.text && msg.type ? (
                                <Text key={index} style={msg.type === 'user' ? styles.userMessage : styles.beirutMessage}>{msg.text}</Text>
                            ) : null
                        ))}
                    </ScrollView>
                </View>
                <View style={{ position: 'absolute', bottom: 10, left: 40, right: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderRadius: 20, borderColor: '#8B2635', borderWidth: 3, width: '80%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={onChangeTextMessage}
                            placeholderTextColor="#fff"
                            placeholder='Message Beirut...'
                            value={message}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleSendOrRecord}
                        onLongPress={message ? null : startRecording} // Disable long press if there is text
                        onPressOut={message ? null : stopRecording} // Disable long press out if there is text
                    >
                        <Animated.View style={{
                            width: micSize,
                            height: micSize,
                            borderRadius: micSize,
                            backgroundColor: '#8B2635',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={message ? require('../assets/send.png') : require('../assets/microphone.png')}
                                style={{
                                    width: message ? 20 : 13,
                                    height: 20,
                                    left: message ? -1 : 0,
                                }}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        fontSize: 20,
        lineHeight: 24,
    },
    userMessage: {
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 24,
        alignSelf: "flex-end",
        marginBottom: 10,
    },
    beirutMessage: {
        color: "#fff",
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 10,
    },
});
