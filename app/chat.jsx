import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
  Keyboard,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "expo-router";
import { Audio } from "expo-av";
import AudioPlayer from "./Components/AudioPlayer.jsx";
import NavBar from "./Components/NavBar";

export default function Chat() {
  const ScrollViewRef = useRef(null);
  const [chatTag, setChatTag] = useState("");
  const [message, setMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [messagesSent, setMessagesSent] = useState([]);
  const [recording, setRecording] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const micSize = useRef(new Animated.Value(40)).current; // Default size of mic button
  const [audioUri, setAudioUri] = useState(null);
  const [decibelLevels, setDecibelLevels] = useState([]);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const toggleNavBar = () => {
    console.log("Toggling nav bar");
    setIsNavBarOpen(!isNavBarOpen);
  };

  useEffect(() => {
    const loadPreviousMessages = async () => {
      try {
        setChatTag(3); // Set the chat tag to 3 for testing purposes
        const response = await fetch(
          `https://yourbeirut.tech:3002/api/chat/getUserMessages?chatTag=${chatTag}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log("Data:", data);

        // Process the data
        const processedMessages = data.map((msg) => ({
          text: msg.message,
          type:
            msg.senderType === "user" ? "user" : "BEIRUT_POD" || "BEIRUT_LLM",
          messageType: msg.messageType,
          uri: msg.messageType === "IMAGE" ? msg.message : null,
        }));

        if (processedMessages.length > 0) {
          setIsMessageSent(true);
        }

        setMessagesSent(processedMessages);
      } catch (error) {
        console.error("Error loading previous messages:", error);
      }
    };

    // Initial load
    loadPreviousMessages();

    // Polling every 10 seconds
    const intervalId = setInterval(loadPreviousMessages, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [chatTag]);

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

  // Function to animate mic button growth
  const animateMicPressIn = () => {
    Animated.spring(micSize, {
      toValue: 60, // Increase size when long-pressed
      useNativeDriver: false,
    }).start();
  };

  const animateMicPressOut = () => {
    Animated.spring(micSize, {
      toValue: 40, // Reset size when released
      useNativeDriver: false,
    }).start();
  };

  async function startRecording() {
    try {
      // Request permissions and set up recording
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      // Start collecting decibel levels
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.metering && !isNaN(status.metering)) {
          // Ensure it's a valid number
          setDecibelLevels((prev) => {
            const newLevels = [...prev.slice(-20), status.metering];
            return newLevels;
          });
        }
      });

      animateMicPressIn();

      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri); // Save the URI
      setRecording(null);
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      animateMicPressOut();
      sendVoiceNote(uri); // Call sendVoiceNote to send the voice message
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

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
      const response = await fetch("https://yourbeirut.tech:3002/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatTag: chatTag,
          message: message,
        }),
      });
      const data = await response.json();
      // simulate the behavior of a fetch call
      //   const data = {
      //     response: "Message received successfully!",
      //   };

      // if (response.ok) {
      const receivedMessage = data.response;
      setAiMessage(receivedMessage);
      setMessagesSent([
        ...messagesSent,
        { text: message, type: "user" },
        { text: receivedMessage, type: "ai" },
      ]);
      setMessage("");
      setIsMessageSent(true);
      setHasTyped(false); // Reset hasTyped on message send
      Keyboard.dismiss();
      // } else {
      //     console.error('Failed to send message:', message);
      // }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to send the voice note message
  const sendVoiceNote = async (uri) => {
    try {
      // Save the current decibel levels before resetting
      const savedDecibelLevels = [...decibelLevels];

      // Simulate server response for testing purposes
      const simulatedResponse = {
        response: "Voice note received successfully!",
      };

      // Display the simulated response in your app's chat
      const receivedMessage = simulatedResponse.response;
      setAiMessage(receivedMessage);
      setIsMessageSent(true);

      // Add the voice note message with URI instead of text
      setMessagesSent([
        ...messagesSent,
        {
          uri: uri,
          type: "user",
          isVoiceNote: true,
          decibelLevels: [...decibelLevels],
        }, // Voice note message with URI
        { text: receivedMessage, type: "ai" },
      ]);

      setAudioUri(null);
      setDecibelLevels([]); // Reset decibel levels
    } catch (error) {
      console.error("Error handling voice note:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "#000", flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.Beirut}>Beirut</Text>
        </View>
        <TouchableOpacity
          style={styles.hamburgerContainer}
          onPress={toggleNavBar}
        >
          <View style={styles.redCircle}>
            <Text style={styles.hamburgerIcon}>☰</Text>
          </View>
        </TouchableOpacity>

        {isNavBarOpen && (
          <NavBar
            isOpen={isNavBarOpen}
            onClose={() => setIsNavBarOpen(false)}
          />
        )}
        {!isMessageSent && !hasTyped && (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.circle}></View>
              <ImageBackground
                source={require("../assets/beirut.png")}
                style={styles.imageBackground}
              />
            </View>
            <Text style={styles.TodayText}>What do you feel like today?</Text>
          </View>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 20,
            bottom: "10%",
            height: 650,
          }}
        >
          <ScrollView
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({ animated: true })
            }
          >
            {messagesSent.map((msg, index) => {
              if (msg.uri) {
                return (
                  <Image
                    key={index}
                    source={{ uri: msg.uri }}
                    style={{ width: 200, height: 200 }}
                  />
                );
              } else {
                return (
                  <Text
                    key={index}
                    style={
                      msg.type === "user"
                        ? styles.userMessage
                        : styles.beirutMessage
                    }
                  >
                    {msg.text}
                  </Text>
                );
              }
            })}
          </ScrollView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 40,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
            borderRadius: 20,
            borderColor: "#8B2635",
            borderWidth: 3,
            width: "80%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeTextMessage}
              placeholderTextColor="#fff"
              placeholder="Message Beirut..."
              value={message}
            />
          </View>
          <TouchableOpacity
            onPress={handleSendOrRecord}
            onLongPress={message ? null : startRecording}
            onPressOut={message ? null : stopRecording}
          >
            <Animated.View
              style={{
                width: micSize,
                height: micSize,
                borderRadius: micSize,
                backgroundColor: "#8B2635",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={
                  message
                    ? require("../assets/send.png")
                    : require("../assets/microphone.png")
                }
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
    paddingLeft: 15,
  },
  hamburgerContainer: {
    position: "absolute",
    top: 5,
    right: 20,
  },
  redCircle: {
    backgroundColor: "#8B2635",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  hamburgerIcon: {
    color: "#fff",
    fontSize: 24,
    top: 1,
    left: 1,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  imageBackground: {
    position: "relative",
    width: 150,
    height: 150,
    top: "15%",
    left: "2%",
  },
  TodayText: {
    fontFamily: "Hanken Grotesk Italic",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
    top: "20%",
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
  },
});
