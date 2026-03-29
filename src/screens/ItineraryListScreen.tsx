import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { useAllItineraries } from '../hooks/useItineraries';
import { useAppTheme, glassCard } from '../theme';
import { cityHeroImages } from '../data/thumbnails';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ItineraryStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<ItineraryStackParamList, 'ItineraryList'>;
};

export default function ItineraryListScreen({ navigation }: Props) {
  const { theme } = useAppTheme();
  const { data: itineraries, isLoading } = useAllItineraries();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Ambient glows */}
      <View style={styles.ambientGlow1} />
      <View style={styles.ambientGlow2} />

      <FlatList
        data={itineraries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>🗾</Text>
            <Text style={[styles.title, { color: theme.text }]}>Itineraries</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Day-by-day travel plans
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, glassCard(theme), { borderRadius: 20 }]}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ItineraryDetail', {
                itineraryId: item.id,
                itineraryTitle: item.title,
              })
            }
          >
            {/* Hero image strip */}
            <View style={styles.heroStrip}>
              {item.cities.map((city) => (
                <Image
                  key={city}
                  source={{ uri: cityHeroImages[city] }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
              ))}
              <View style={styles.heroOverlay} />
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{item.duration}</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
                {item.subtitle}
              </Text>

              {/* City pills */}
              <View style={styles.cityRow}>
                {item.cities.map((city) => (
                  <View
                    key={city}
                    style={[styles.cityPill, { backgroundColor: theme.chipBackground }]}
                  >
                    <Text style={[styles.cityText, { color: theme.textSecondary }]}>
                      📍 {city}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Day dots */}
              <View style={styles.dayPreviewRow}>
                {item.days.map((day) => (
                  <View
                    key={day.dayNumber}
                    style={[styles.dayDot, { backgroundColor: item.color + '20' }]}
                  >
                    <Text style={[styles.dayDotText, { color: item.color }]}>
                      D{day.dayNumber}
                    </Text>
                  </View>
                ))}
                <View
                  style={[
                    styles.dayDot,
                    {
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderStyle: 'dashed',
                    },
                  ]}
                >
                  <Text style={[styles.dayDotText, { color: theme.textTertiary }]}>+</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          isLoading ? (
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Loading...</Text>
          ) : (
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No itineraries yet
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  ambientGlow1: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 229, 255, 0.06)',
  },
  ambientGlow2: {
    position: 'absolute',
    top: 300,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 45, 120, 0.06)',
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 32 },
  header: { paddingTop: 16, paddingBottom: 24 },
  headerEmoji: { fontSize: 44, marginBottom: 10 },
  title: { fontSize: 34, fontWeight: '800', marginBottom: 6, letterSpacing: -1 },
  subtitle: { fontSize: 15, fontWeight: '500' },
  card: { marginBottom: 20, overflow: 'hidden' },
  heroStrip: {
    height: 140,
    flexDirection: 'row',
    position: 'relative',
  },
  heroImage: { flex: 1, height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 5, 15, 0.35)',
  },
  heroBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 45, 120, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  heroBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  cardContent: { padding: 18 },
  cardTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  cardSubtitle: { fontSize: 14, fontWeight: '500', marginTop: 3, marginBottom: 14 },
  cityRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  cityPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  cityText: { fontSize: 13, fontWeight: '500' },
  dayPreviewRow: { flexDirection: 'row', gap: 8 },
  dayDot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayDotText: { fontSize: 13, fontWeight: '700' },
  emptyText: { textAlign: 'center', marginTop: 60, fontSize: 15 },
});
