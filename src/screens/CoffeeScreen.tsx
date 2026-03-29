import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useCoffeeGuide } from '../hooks/useCoffee';
import { useAppTheme, glassCard } from '../theme';
import { CoffeeSpot } from '../types/coffee';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

function CoffeeCard({ spot, theme }: { spot: CoffeeSpot; theme: any }) {
  return (
    <View
      style={[
        styles.card,
        glassCard(theme),
        { borderRadius: 20 },
      ]}
    >
      {/* Image */}
      <Image
        source={{ uri: spot.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      {/* Gradient overlay on image */}
      <View style={styles.imageOverlay} />

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={[styles.cardName, { color: theme.text }]}>{spot.name}</Text>
        <View style={styles.neighborhoodRow}>
          <Text style={styles.pin}>📍</Text>
          <Text style={[styles.neighborhood, { color: theme.textSecondary }]}>
            {spot.neighborhood}
          </Text>
        </View>

        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {spot.description}
        </Text>

        {/* Must try pill */}
        <View style={styles.mustTryContainer}>
          <View style={[styles.mustTryPill, { backgroundColor: 'rgba(255, 45, 120, 0.12)' }]}>
            <Text style={styles.mustTryLabel}>Must try</Text>
            <Text style={styles.mustTryValue}>{spot.mustTry}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function CoffeeScreen() {
  const { theme } = useAppTheme();
  const { data: coffeeGuide } = useCoffeeGuide();
  const [selectedCity, setSelectedCity] = useState(0);

  if (!coffeeGuide) return null;

  const cities = coffeeGuide.cities;
  const currentCity = cities[selectedCity];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Ambient glows */}
      <View style={styles.ambientGlow1} />
      <View style={styles.ambientGlow2} />

      <SafeAreaView style={styles.flex}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>☕</Text>
          <Text style={[styles.title, { color: theme.text }]}>Coffee Guide</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Best cafés in Tokyo & Kyoto
          </Text>
        </View>

        {/* City tabs */}
        <View style={styles.cityTabsRow}>
          {cities.map((cityData, index) => {
            const isActive = index === selectedCity;
            return (
              <TouchableOpacity
                key={cityData.city}
                style={[
                  styles.cityTab,
                  glassCard(theme),
                  { borderRadius: 14 },
                  isActive && {
                    backgroundColor: 'rgba(255, 45, 120, 0.15)',
                    borderColor: 'rgba(255, 45, 120, 0.35)',
                  },
                ]}
                onPress={() => setSelectedCity(index)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.cityTabText,
                  { color: isActive ? '#FF2D78' : theme.textSecondary },
                ]}>
                  📍 {cityData.city}
                </Text>
                <Text style={[
                  styles.cityTabCount,
                  { color: isActive ? 'rgba(255, 45, 120, 0.7)' : theme.textTertiary },
                ]}>
                  {cityData.spots.length} spots
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Coffee spots */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentCity.spots.map((spot) => (
            <CoffeeCard key={spot.id} spot={spot} theme={theme} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  ambientGlow1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139, 90, 43, 0.08)',
  },
  ambientGlow2: {
    position: 'absolute',
    top: 400,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 45, 120, 0.05)',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerEmoji: { fontSize: 44, marginBottom: 10 },
  title: { fontSize: 34, fontWeight: '800', letterSpacing: -1, marginBottom: 6 },
  subtitle: { fontSize: 15, fontWeight: '500' },
  cityTabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 8,
  },
  cityTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cityTabText: { fontSize: 15, fontWeight: '700' },
  cityTabCount: { fontSize: 11, fontWeight: '500', marginTop: 2 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40 },
  card: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(5, 5, 15, 0.15)',
  },
  cardContent: {
    padding: 20,
  },
  cardName: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  neighborhoodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  pin: { fontSize: 13 },
  neighborhood: { fontSize: 13, fontWeight: '600' },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  mustTryContainer: {
    flexDirection: 'row',
  },
  mustTryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  mustTryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF2D78',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mustTryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 45, 120, 0.8)',
  },
});
