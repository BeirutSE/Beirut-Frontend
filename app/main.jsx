import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const user = "Beirut";

export default function Main() {
    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", padding: "20px", justifyContent: "flex-start" }}>
                    <View style={styles.icon}>
                    </View>
                    <Text style={styles.helloText}>Hello {user}!</Text>
                </View>
                <View style={styles.bellContainer}>
                    <ImageBackground source={require('../assets/bell.png')} style={{ width: 20, height: 20 }} />
                </View>
            </View>
            <View style={{ display: "flex", width: "500px", alignSelf: "center" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ display: "flex", flexDirection: "column", padding: "20px", borderRadius: 20, borderColor: 'white', borderWidth: 1 }}>
                        <View style={styles.chat}>
                            <ImageBackground source={require('../assets/chat.png')} style={{ width: "40px", height: "40px" }} />
                        </View>
                        <Text style={{ color: "#fff", paddingTop: "15px" }}>Chat with Beirut</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column", padding: "20px", borderRadius: 20, borderColor: 'white', borderWidth: 1 }}>
                        <View style={styles.chat}>
                            <ImageBackground source={require('../assets/voice.png')} style={{ width: "40px", height: "40px" }} />
                        </View>
                        <Text style={styles.iconText}>Talk to Beirut</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column", padding: "20px", borderRadius: 20, borderColor: 'white', borderWidth: 1, top: "20%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                        <Text style={{ color: "#fff", fontWeight: 500, fontSize: "20px" }}>Restaurants</Text>
                        <Text style={{ color: "#fff" }}>View All</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column", padding: "15px" }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/pizza.png')} style={{ width: "75px", height: "75px" }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: "15px" }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/pizza.png')} style={{ width: "75px", height: "75px" }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: "15px" }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/pizza.png')} style={{ width: "75px", height: "75px" }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column", padding: "15px" }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/pizza.png')} style={{ width: "75px", height: "75px" }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: "15px" }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/pizza.png')} style={{ width: "75px", height: "75px" }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: "15px" }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/pizza.png')} style={{ width: "75px", height: "75px" }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    helloText: {
        fontFamily: "Hanken Grotesk",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 24,
        color: "#fff",
        paddingTop: "15px",
        paddingLeft: "20px",
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bellContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    chat: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    iconText: {
        color: "#fff",
        paddingTop: "15px",
        alignSelf: "center"
    }
});