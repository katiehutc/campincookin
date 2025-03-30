// app/_layout.tsx - Tab-based layout

import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const bgColor = colorScheme === 'dark' ? '#121212' : '#fff';
    const fgColor = colorScheme === 'dark' ? '#fff' : '#000';

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: 'none' }, // This hides the entire tab bar
                headerShown: false, // This hides the header
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="ingredients" />
            <Tabs.Screen name="recipelist" />
            <Tabs.Screen name="preference" />
        </Tabs>
    );
}