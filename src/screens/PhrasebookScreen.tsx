import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { usePhrasebook } from '../hooks/usePhrases';
import { useAppTheme, glassCard } from '../theme';
import { Phrase, PhraseCategory } from '../types/phrases';

function PhraseCard({
  phrase,
  color,
  theme,
}: {
  phrase: Phrase;
  color: string;
  theme: any;
}) {
  return (
    <View
      style={[
        styles.phraseCard,
        glassCard(theme),
        { borderRadius: 16 },
      ]}
    >
      {/* Japanese — big and prominent */}
      <Text style={[styles.japanese, { color: theme.text }]}>
        {phrase.japanese}
      </Text>

      {/* Romaji */}
      <Text style={[styles.romaji, { color }]}>
        {phrase.romaji}
      </Text>

      {/* English */}
      <Text style={[styles.english, { color: theme.textSecondary }]}>
        {phrase.english}
      </Text>

      {/* Note */}
      {phrase.note !== '' && (
        <View style={[styles.noteBubble, { backgroundColor: color + '12' }]}>
          <Text style={[styles.noteText, { color: color + 'CC' }]}>
            💡 {phrase.note}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function PhrasebookScreen() {
  const { theme } = useAppTheme();
  const { data: phrasebook } = usePhrasebook();
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (!phrasebook) return null;

  const categories = phrasebook.categories;
  const currentCategory = categories[selectedCategory];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Ambient glows */}
      <View style={[styles.ambientGlow1, { backgroundColor: currentCategory.color + '0A' }]} />
      <View style={styles.ambientGlow2} />

      <SafeAreaView style={styles.flex}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🗣️</Text>
          <Text style={[styles.title, { color: theme.text }]}>Japanese Phrases</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Essential words for your trip
          </Text>
        </View>

        {/* Cultural note */}
        <View style={[styles.culturalNote, glassCard(theme), { borderRadius: 14 }]}>
          <Text style={[styles.culturalNoteText, { color: theme.textSecondary }]}>
            🎌 {phrasebook.culturalNote}
          </Text>
        </View>

        {/* Category chips — horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
          style={styles.chipsScroll}
        >
          {categories.map((cat, index) => {
            const isActive = index === selectedCategory;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? cat.color + '25' : theme.chipBackground,
                    borderColor: isActive ? cat.color + '50' : theme.border,
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setSelectedCategory(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.chipEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? cat.color : theme.textSecondary },
                  ]}
                >
                  {cat.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Category header */}
        <View style={styles.categoryHeader}>
          <Text style={[styles.categoryTitle, { color: theme.text }]}>
            {currentCategory.emoji} {currentCategory.title}
          </Text>
          <Text style={[styles.categoryCount, { color: theme.textTertiary }]}>
            {currentCategory.phrases.length} phrases
          </Text>
        </View>

        {/* Phrases list */}
        <ScrollView
          style={styles.phrasesList}
          contentContainerStyle={styles.phrasesContent}
          showsVerticalScrollIndicator={false}
        >
          {currentCategory.phrases.map((phrase, index) => (
            <PhraseCard
              key={`${currentCategory.id}-${index}`}
              phrase={phrase}
              color={currentCategory.color}
              theme={theme}
            />
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
    top: -60,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  ambientGlow2: {
    position: 'absolute',
    top: 350,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 229, 255, 0.04)',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerEmoji: { fontSize: 44, marginBottom: 10 },
  title: { fontSize: 34, fontWeight: '800', letterSpacing: -1, marginBottom: 6 },
  subtitle: { fontSize: 15, fontWeight: '500' },
  culturalNote: {
    marginHorizontal: 20,
    padding: 14,
    marginBottom: 12,
  },
  culturalNoteText: {
    fontSize: 13,
    lineHeight: 20,
  },
  chipsScroll: { maxHeight: 50 },
  chipsContainer: {
    paddingHorizontal: 20,
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipEmoji: { fontSize: 16 },
  chipText: { fontSize: 13, fontWeight: '600' },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
  },
  categoryTitle: { fontSize: 20, fontWeight: '700' },
  categoryCount: { fontSize: 13, fontWeight: '500' },
  phrasesList: { flex: 1 },
  phrasesContent: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 40 },
  phraseCard: {
    padding: 18,
    marginBottom: 12,
    overflow: 'hidden',
  },
  japanese: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 36,
  },
  romaji: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  english: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  noteBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
});
