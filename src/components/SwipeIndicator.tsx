import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../theme';

interface SwipeIndicatorProps {
  total: number;
  current: number;
  color: string;
  theme: Theme;
}

export default function SwipeIndicator({
  total,
  current,
  color,
  theme,
}: SwipeIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i === current ? color : theme.border,
              width: i === current ? 24 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
