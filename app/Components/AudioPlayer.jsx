import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';


export default function AudioPlayer({ uri, decibelLevels }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [audioDuration, setAudioDuration] = useState(0);

    async function togglePlayback() {
        if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else {
            if (!sound) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri },
                    { shouldPlay: true }, // Start playback immediately
                    onPlaybackStatusUpdate
                );
                setSound(newSound);
            } else {
                await sound.playAsync();
            }
            setIsPlaying(true);
        }
    }

    const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            // If playback is done, reset to play button
            setIsPlaying(false);

            if (sound) {
                sound.setPositionAsync(0); // Restart sound to the beginning
            }
        }
    };

    useEffect(() => {
        // Load the audio and get the duration
        const loadAudio = async () => {
            const { sound: newSound, status } = await Audio.Sound.createAsync({ uri });
            setSound(newSound);
            setAudioDuration(status.durationMillis / 1000); // Convert to seconds
        };

        loadAudio();

        // Cleanup the sound on unmount
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [uri]);

    const calculateContainerWidth = () => {
        const baseWidth = 100;  // Set a base width (e.g., minimum container width)
        const decibelWidth = Math.min(decibelLevels.length * 5, 500); // Max width for decibel levels (adjust multiplier)
        return Math.max(baseWidth, audioDuration * 35, decibelWidth);
    };

    return (
        <View style={[styles.container, { width: calculateContainerWidth() }]}>
            <TouchableOpacity onPress={togglePlayback}>
                <ImageBackground
                    source={isPlaying ? require('../../assets/pause.png') : require('../../assets/play.png')}
                    style={styles.playIcon}
                />
            </TouchableOpacity>
            <View style={styles.waveform}>
                {decibelLevels.map((level, index) => (
                    <View
                        key={index}
                        style={{
                            height: Math.max(5, level + 60), // Increased minimum height for better visibility
                            width: 3,
                            backgroundColor: '#8B2635',
                            margin: 1,
                            borderRadius: 2,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#8B2635',
        borderRadius: 5,
        justifyContent: 'center',
        lineHeight: 24,
        marginBottom: 10,
        alignSelf: "flex-end",
    },
    playIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    waveform: {
        flexDirection: 'row',  // Ensure the bars align horizontally
        justifyContent: 'center',  // Align bars to the left
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        height: 50, 
    }
});
