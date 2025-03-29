// Example for ingredients.tsx
import React from 'react';
import {View, Text, Button, ImageBackground, StyleSheet} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <ImageBackground
            source = {require('./cooking-campin-home.PNG')}
            style = {styles.backgroundImage}
            resizeMode = "cover"
        >
            <View style = {styles.container}>
                <Text style = {styles.title}> Home</Text>
                <Button title="Start"
                        onPress = {() => router.push("/ingredients")}
                        />
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
    }
});