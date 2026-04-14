import React, { useCallback, useEffect, useState } from 'react';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import * as SplashScreen from 'expo-splash-screen';
import { LogBox, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { initDB } from './src/services/database';
import RootNavigation from './src/routes/RootNavigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useCustomFonts();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function setupDb() {
      await initDB();
      setDbReady(true);
    }
    setupDb();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && dbReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, dbReady]);

  if (!fontsLoaded || !dbReady) {
    return null;
  }
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <View
          style={styles.container}
          onLayout={onLayoutRootView}
        >
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </View>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1
    },
  }
);
