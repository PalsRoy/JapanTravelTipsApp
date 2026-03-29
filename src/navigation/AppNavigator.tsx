import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ItineraryListScreen from '../screens/ItineraryListScreen';
import ItineraryDetailScreen from '../screens/ItineraryDetailScreen';

import { TipsStackParamList, ItineraryStackParamList } from './types';

const TipsStack = createNativeStackNavigator<TipsStackParamList>();
const ItineraryStack = createNativeStackNavigator<ItineraryStackParamList>();
const Tab = createBottomTabNavigator();

function TipsNavigator() {
  return (
    <TipsStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <TipsStack.Screen name="Home" component={HomeScreen} />
      <TipsStack.Screen name="Category" component={CategoryScreen} />
    </TipsStack.Navigator>
  );
}

function ItineraryNavigator() {
  return (
    <ItineraryStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <ItineraryStack.Screen name="ItineraryList" component={ItineraryListScreen} />
      <ItineraryStack.Screen name="ItineraryDetail" component={ItineraryDetailScreen} />
    </ItineraryStack.Navigator>
  );
}

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={[
      styles.tabIconContainer,
      focused && styles.tabIconFocused,
      focused && Platform.OS === 'ios' && {
        shadowColor: '#FF2D78',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
    ]}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>{emoji}</Text>
    </View>
  );
}

export default function AppNavigator() {
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF2D78',
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 0.5,
          paddingTop: 8,
          height: 90,
          ...(Platform.OS === 'ios' ? {
            // Blur effect simulation
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
          } : {
            elevation: 16,
          }),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tab.Screen
        name="TipsTab"
        component={TipsNavigator}
        options={{
          tabBarLabel: 'Tips',
          tabBarIcon: ({ focused }) => <TabIcon emoji="💡" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ItineraryTab"
        component={ItineraryNavigator}
        options={{
          tabBarLabel: 'Itineraries',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗺️" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  tabIconFocused: {
    backgroundColor: 'rgba(255, 45, 120, 0.15)',
  },
  tabEmoji: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabEmojiActive: {
    opacity: 1,
  },
});
