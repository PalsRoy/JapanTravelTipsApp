import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ViewToken,
  Platform,
} from 'react-native';
import { useAppTheme } from '../theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    image: require('../../assets/onboarding/onboarding_1.png'),
    title: 'Welcome to Japan Tips',
    subtitle: 'Everything you need to know before, during, and after your trip to Japan',
  },
  {
    image: require('../../assets/onboarding/onboarding_2.png'),
    title: '60+ Curated Tips',
    subtitle: 'From packing and etiquette to hidden gems and money-saving hacks — organized in swipeable categories',
  },
  {
    image: require('../../assets/onboarding/onboarding_3.png'),
    title: 'Works Offline',
    subtitle: 'All tips are stored locally — no internet needed. Perfect for when you\'re on the go in Japan',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { theme } = useAppTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      onComplete();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background glows */}
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(_, i) => `slide-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {item.subtitle}
            </Text>
          </View>
        )}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === activeIndex ? '#FF2D78' : theme.border,
                  width: i === activeIndex ? 24 : 8,
                },
                i === activeIndex && Platform.OS === 'ios' && {
                  shadowColor: '#FF2D78',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 6,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, Platform.OS === 'ios' && {
            shadowColor: '#FF2D78',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
          }]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {activeIndex === SLIDES.length - 1 ? "Let's Go! 🇯🇵" : 'Next'}
          </Text>
        </TouchableOpacity>

        {activeIndex < SLIDES.length - 1 && (
          <TouchableOpacity onPress={onComplete} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: theme.textTertiary }]}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow1: {
    position: 'absolute',
    top: '10%',
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 45, 120, 0.08)',
  },
  glow2: {
    position: 'absolute',
    top: '40%',
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: height * 0.1,
  },
  image: {
    width: width * 0.55,
    height: width * 0.55,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 32,
  },
  dot: { height: 8, borderRadius: 4 },
  button: {
    backgroundColor: '#FF2D78',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  skipButton: { marginTop: 16, padding: 8 },
  skipText: { fontSize: 15 },
});
