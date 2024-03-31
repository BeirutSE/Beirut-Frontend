import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
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
            <Link href="/main" style={styles.continue}>Tap to Continue</Link>
            <ImageBackground
                source={require('../assets/wave.png')}
                style={styles.wave}
                resizeMode="cover"
            ></ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    meetText: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 80,
        lineHeight: 91,
        color: "#fff",
        left: "20%",
    },
    imageBackground: {
        position: "relative",
        width: "215px",
        height: "303.67px",
        top: "17%",
        left: "5%"
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: "20%",
        top: "30%",
    },
    beirutText: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "italic",
        fontWeight: "700",
        fontSize: 80,
        lineHeight: 91,
        color: "#fff",
        left: "20%",
    },
    wave: {
        width: "100%",
        height: "150px",
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    continue: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 23,
        lineHeight: 23,
        color: "#fff",
        position: "absolute",
        bottom: "25%",
        left: "42%",
    }
});
