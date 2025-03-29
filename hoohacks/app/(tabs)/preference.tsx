// app/pages/ingredients.tsx
import React from 'react';
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Import the type from App.tsx

type Props = NativeStackScreenProps<RootStackParamList, 'Ingredients'>;

export default function PreferenceScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Ingredients Screen</Text>
            <Button
                title="Go to Preferences"
                onPress={() => navigation.navigate('Preference')}
            />
        </View>
    );
}