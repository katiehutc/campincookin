// App.tsx for Expo Router
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

export default function App() {
    // Prevent the splash screen from auto-hiding
    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, []);

    return null;
}