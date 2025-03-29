// Example for ingredients.tsx
import React from 'react';
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function IngredientsScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Ingredients Screen</Text>
            <Button
                title="Go to Preferences"
                onPress={() => router.push("/preference")}
            />
        </View>
    );
}