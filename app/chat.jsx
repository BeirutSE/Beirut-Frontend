import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native';
import React from "react"
import { Link } from 'expo-router'

export default function Chat() {
    const [text, onChangeText] = React.useState(' ')
    const [isInputFocused, setIsInputFocused] = React.useState(false)

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };
    
    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            <Link href="/main">
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <ImageBackground source={require('../assets/arrow.png')} style={{ width: 20, height: 20, top: "9%", left: "2%" }} />
                    <Text style={styles.Beirut}>Beirut</Text>
                </View>
            </Link>
            {!isInputFocused && (
                <View style={{ display: "flex", flex: "column", top: "20%" }}>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.circle}></View>
                        <ImageBackground source={require('../assets/beirut.png')} style={styles.imageBackground} />
                    </View>
                    <Text style={styles.TodayText}>What do you feel like today?</Text>
                </View>
            )}
            <View style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: isInputFocused ? "45%" : "5%", left: "10%", borderRadius: 20, borderColor: 'white', borderWidth: 1, padding: 20, justifyContent: "space-between", width: 300 }}>
                <View style={{ display: "flex" }}>
                    <TextInput style={styles.inputText} onChangeText={onChangeText} onFocus={handleFocus} onBlur={handleBlur}  placeholderTextColor="white" placeholder='Message Beirut...' > 
                    </TextInput>
                </View>
                <View style={{ display: "flex" }}>
                    <ImageBackground source={require('../assets/send.png')} style={{ width: 20, height: 20 }} />
                </View>
            </View>
        </View>
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