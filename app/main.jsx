import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router'

const user = "Beirut";

export default function Main() {
    return (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", paddingBottom: 20, paddingRight: 20, justifyContent: "flex-start" }}>
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
                    <Link href="/chat">
                        <View style={{ display: "flex", flexDirection: "column", padding: 20, borderRadius: 20, borderColor: 'white', borderWidth: 1 }}>
                            <View style={styles.chat}>
                                <ImageBackground source={require('../assets/chat.png')} style={{ width: 40, height: 40 }} />
                            </View>
                            <Text style={{ color: "#fff", paddingTop: 15 }}>Chat with Beirut</Text>
                        </View>
                    </Link>
                    <View style={{ display: "flex", flexDirection: "column", padding: 20, borderRadius: 20, borderColor: 'white', borderWidth: 1 }}>
                        <View style={styles.chat}>
                            <ImageBackground source={require('../assets/voice.png')} style={{ width: 40, height: 40 }} />
                        </View>
                        <Text style={{ color: "#fff", paddingTop: 15, paddingLeft: 5 }}>Talk to Beirut</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column", padding: 20, borderRadius: 20, borderColor: 'white', borderWidth: 1, top: "10%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                        <Text style={{ color: "#fff", fontWeight: 500, fontSize: 20, paddingBottom: 10 }}>Restaurants</Text>
                        <Text style={{ color: "#fff", paddingBottom: 5 }}>View All</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column", padding: 5 }}>
                            <View style={styles.restaurantIcon}>
                                <ImageBackground source={require('../assets/icons/pizza.png')} style={{ width: 75, height: 75 }} />
                            </View>
                            <Text style={styles.iconText}>Italian</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <View style={styles.restaurantIcon}>
                                <ImageBackground source={require('../assets/icons/noodles.png')} style={{ width: 60, height: 60 }} />
                            </View>
                            <Text style={styles.iconText}>Asian</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: 5 }}>
                            <View style={styles.restaurantIcon}>
                                <ImageBackground source={require('../assets/icons/mexican-hat.png')} style={{ width: 60, height: 60 }} />
                            </View>
                            <Text style={styles.iconText}>Mexican</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column", padding: 5 }}>
                            <View style={styles.restaurantIcon}>
                                <ImageBackground source={require('../assets/icons/lebanese 1.png')} style={{ width: 60, height: 60 }} />
                            </View>
                            <Text style={styles.iconText}>Lebanese</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: 5 }}>
                            <View style={styles.restaurantIcon}>
                                <ImageBackground source={require('../assets/icons/burger 1.png')} style={{ width: 50, height: 50 }} />
                            </View>
                            <Text style={styles.iconText}>American</Text>
                        </View>
                        <View style={{ flexDirection: "column", padding: 5 }}>
                            <View style={styles.restaurantIcon}>
                                <ImageBackground source={require('../assets/icons/cupcake 1.png')} style={{ width: 60, height: 60 }} />
                            </View>
                            <Text style={styles.iconText}>Dessert</Text>
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
        paddingTop: 15,
        paddingLeft: 20,
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
        borderColor: 'white',
        bottom: 10
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
    restaurantIcon: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
    },
    iconText: {
        color: "#fff",
        paddingTop: 10,
        alignSelf: "center"
    }
});