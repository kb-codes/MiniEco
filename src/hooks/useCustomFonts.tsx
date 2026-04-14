import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export function useCustomFonts() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Bold': require('../assets/fonts/ArialNova-Bold.ttf'),
                'Light': require('../assets/fonts/ArialNova-Light.ttf'),
                'Regular': require('../assets/fonts/ArialNova.ttf'),
            });

            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    return fontsLoaded;
}