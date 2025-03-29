// Example for ingredients.tsx
import React from 'react';
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Home</Text>
            <Button
                title="Start"
                onPress={() => router.push("/ingredients")}
            />
        </View>
    );
}