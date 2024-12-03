import { Text, View, ImageBackground, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import React, { useCallback } from 'react';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [fontsLoaded, fontError] = useFonts({
        'Hanken Grotesk': require('../assets/fonts/HankenGrotesk-VariableFont_wght.ttf'),
        'Hanken Grotesk Italic': require('../assets/fonts/HankenGrotesk-Italic-VariableFont_wght.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar barStyle="light-content" />
                <View style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                    <Text style={styles.meetText}>Meet</Text>
                    <Text style={styles.beirutText}>Beirut!</Text>
                </View>
                <View style={styles.circle}>
                    <ImageBackground
                        source={require('../assets/beirut.png')}
                        style={styles.imageBackground}
                        resizeMode="cover"
                    >
                    </ImageBackground>
                </View>
                <Link href="/login" style={styles.continue}>Tap to Continue</Link>
                <ImageBackground
                    source={require('../assets/wave.png')}
                    style={styles.wave}
                    resizeMode="cover"
                ></ImageBackground>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    meetText: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 80,
        lineHeight: 91,
        color: "#fff",
        left: "5%",

    },
    imageBackground: {
        position: "relative",
        width: "100%",
        height: "100%",
        top: "17%",
        left: "5%",
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: "10%",
        top: "30%",
    },
    beirutText: {
        fontFamily: "Hanken Grotesk Italic",
        fontStyle: "italic",
        fontWeight: "700",
        fontSize: 80,
        lineHeight: 91,
        color: "#fff",
        left: "5%",
    },
    wave: {
        position: "absolute",
        bottom: "-4%",
        width: "100%",
        height: 100
    },
    continue: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 23,
        lineHeight: 23,
        color: "#fff",
        position: "absolute",
        bottom: "15%",
        left: "30%",
    }
});
