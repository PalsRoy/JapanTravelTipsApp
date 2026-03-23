import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tip } from '../types';
import { Theme } from '../theme';

interface TipCardProps {
  tip: Tip;
  theme: Theme;
  categoryColor: string;
  index: number;
  total: number;
}

export default function TipCard({
  tip,
  theme,
  categoryColor,
  index,
  total,
}: TipCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.cardShadow,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[styles.emojiContainer, { backgroundColor: categoryColor + '18' }]}
        >
          <Text style={styles.emoji}>{tip.emoji}</Text>
        </View>
        <Text style={[styles.counter, { color: theme.textTertiary }]}>
          {index + 1} / {total}
        </Text>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{tip.title}</Text>
      <View style={[styles.divider, { backgroundColor: categoryColor + '30' }]} />
      <Text style={[styles.content, { color: theme.textSecondary }]}>
        {tip.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  counter: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    lineHeight: 26,
  },
  divider: {
    height: 2,
    borderRadius: 1,
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
  },
});
