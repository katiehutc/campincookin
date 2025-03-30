// Example for ingredients.tsx
import React, { useEffect, useState } from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Index() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (params.reset === "true") {
            console.log("App was reset - clearing state");
            setRefreshKey(prevKey => prevKey + 1); // Change key to force re-render
            router.setParams({}); // Clear params
        }
    }, [params.reset]);

    return (
        <ImageBackground
            source = {require('../../images/home/home.png')}
            style = {styles.backgroundImage}
            resizeMode = "cover"
            key={refreshKey}
        >
            <View style = {styles.container}>
                <TouchableOpacity onPress={() => router.push("/ingredients")} style={styles.button}>
                    <Image source={require('../../images/home/start.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    button: {
        marginTop: 20,
    },
    buttonImage: {
        width: 256,
        height: 256,
        resizeMode: "contain",
    },
});