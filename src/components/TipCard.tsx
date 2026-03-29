import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Tip } from '../types';
import { Theme, glassCard } from '../theme';

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
        glassCard(theme),
        { borderRadius: 24 },
      ]}
    >
      {/* Top glow */}
      <View style={[styles.topGlow, { backgroundColor: categoryColor + '15' }]} />

      <View style={styles.header}>
        <View
          style={[styles.emojiContainer, { backgroundColor: categoryColor + '20' }]}
        >
          <Text style={styles.emoji}>{tip.emoji}</Text>
        </View>
        <View style={[styles.counterPill, { backgroundColor: theme.chipBackground }]}>
          <Text style={[styles.counter, { color: theme.textTertiary }]}>
            {index + 1}/{total}
          </Text>
        </View>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>{tip.title}</Text>

      <View style={[styles.divider, { backgroundColor: categoryColor + '25' }]} />

      <Text style={[styles.content, { color: theme.textSecondary }]}>
        {tip.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  counterPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  counter: {
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
  },
});
