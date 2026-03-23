import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Category } from '../types';
import { Theme } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;

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
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.cardShadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: category.color + '18' }]}
      >
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {category.title}
      </Text>
      <Text style={[styles.count, { color: theme.textSecondary }]}>
        {category.tips.length} {category.tips.length === 1 ? 'tip' : 'tips'}
      </Text>
      <View style={[styles.colorBar, { backgroundColor: category.color }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 20,
  },
  count: {
    fontSize: 13,
    fontWeight: '500',
  },
  colorBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});
