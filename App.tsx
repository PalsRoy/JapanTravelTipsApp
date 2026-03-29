import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
    },
  },
});

const ONBOARDING_KEY = '@japan_tips_onboarding_complete';

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#05050F',
    card: '#05050F',
    text: '#F2F0FF',
    border: 'rgba(255, 255, 255, 0.08)',
    primary: '#FF2D78',
    notification: '#FF2D78',
  },
};

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (value === null) {
          setShowOnboarding(true);
        }
      } catch (e) {
        console.warn('AsyncStorage error:', e);
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="small" color="#FF2D78" />
      </View>
    );
  }

  if (showOnboarding) {
    const completeOnboarding = async () => {
      setShowOnboarding(false);
      try {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      } catch {}
    };
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={AppDarkTheme}>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: '#05050F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
