import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Category } from '../types';
import { Theme, glassCard } from '../theme';

interface CategoryCardProps {
  category: Category;
  theme: Theme;
  onPress: () => void;
}

export default function CategoryCard({
  category,
  theme,
  onPress,
}: CategoryCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        glassCard(theme),
        { borderRadius: 20, width: cardWidth },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Accent glow at top */}
      <View style={[styles.glowBar, { backgroundColor: category.color + '40' }]} />

      <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>

      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {category.title}
      </Text>
      <Text style={[styles.count, { color: theme.textTertiary }]}>
        {category.tips.length} {category.tips.length === 1 ? 'tip' : 'tips'}
      </Text>

      {/* Bottom accent line */}
      <View style={[styles.accentLine, { backgroundColor: category.color }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  glowBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    opacity: 0.5,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  count: {
    fontSize: 12,
    fontWeight: '500',
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    borderRadius: 1,
    opacity: 0.6,
  },
});
