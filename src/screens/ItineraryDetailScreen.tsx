import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { useItinerary } from '../hooks/useItineraries';
import { useAppTheme, glassCard } from '../theme';
import { getThumbnailForActivity } from '../data/thumbnails';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ItineraryStackParamList } from '../navigation/types';
import { ItineraryDay, Activity } from '../types/itinerary';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<ItineraryStackParamList, 'ItineraryDetail'>;
  route: RouteProp<ItineraryStackParamList, 'ItineraryDetail'>;
};

function ActivityItem({
  activity,
  isLast,
  color,
  theme,
}: {
  activity: Activity;
  isLast: boolean;
  color: string;
  theme: any;
}) {
  const thumbnailUrl = getThumbnailForActivity(activity.title);

  return (
    <View style={styles.activityRow}>
      {/* Timeline */}
      <View style={styles.timelineCol}>
        <View style={[styles.timelineDot, { backgroundColor: color },
          Platform.OS === 'ios' && {
            shadowColor: color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 4,
          }
        ]} />
        {!isLast && (
          <View style={[styles.timelineLine, { backgroundColor: theme.border }]} />
        )}
      </View>

      {/* Content card */}
      <View style={[
        styles.activityCard,
        glassCard(theme),
        { borderRadius: 16 },
        !isLast && { marginBottom: 12 },
      ]}>
        {/* Thumbnail */}
        {thumbnailUrl && (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}

        <View style={styles.activityContent}>
          <Text style={[styles.activityTime, { color }]}>{activity.time}</Text>
          <Text style={[styles.activityTitle, { color: theme.text }]}>
            {activity.emoji} {activity.title}
          </Text>
          {activity.note && (
            <Text style={[styles.activityNote, { color: theme.textTertiary }]}>
              {activity.note}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function ItineraryDetailScreen({ navigation, route }: Props) {
  const { itineraryId } = route.params;
  const { theme } = useAppTheme();
  const { data: itinerary } = useItinerary(itineraryId);
  const [selectedDay, setSelectedDay] = useState(0);

  if (!itinerary) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.textSecondary }]}>
          Itinerary not found
        </Text>
      </SafeAreaView>
    );
  }

  const currentDay: ItineraryDay = itinerary.days[selectedDay];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Ambient glow */}
      <View style={[styles.ambientGlow, { backgroundColor: itinerary.color + '10' }]} />

      <SafeAreaView style={styles.flex}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={[styles.backArrow, { color: theme.text }]}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>{itinerary.title}</Text>
            <Text style={[styles.headerSubtitle, { color: theme.textTertiary }]}>
              {itinerary.duration}
            </Text>
          </View>
        </View>

        {/* Day selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayTabsContainer}
          style={styles.dayTabsScroll}
        >
          {itinerary.days.map((day, index) => {
            const isActive = index === selectedDay;
            return (
              <TouchableOpacity
                key={day.dayNumber}
                style={[
                  styles.dayTab,
                  glassCard(theme),
                  { borderRadius: 14 },
                  isActive && {
                    backgroundColor: itinerary.color + '25',
                    borderColor: itinerary.color + '50',
                  },
                ]}
                onPress={() => setSelectedDay(index)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayTabNumber,
                    { color: isActive ? itinerary.color : theme.textSecondary },
                  ]}
                >
                  Day {day.dayNumber}
                </Text>
                <Text
                  style={[
                    styles.dayTabCity,
                    { color: isActive ? itinerary.color + 'AA' : theme.textTertiary },
                  ]}
                >
                  {day.city}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Day header */}
        <View style={styles.dayHeader}>
          <View style={[styles.dayBadge, { backgroundColor: itinerary.color + '20' }]}>
            <Text style={[styles.dayBadgeText, { color: itinerary.color }]}>
              Day {currentDay.dayNumber}
            </Text>
          </View>
          <Text style={[styles.dayTitle, { color: theme.text }]}>{currentDay.title}</Text>
          <Text style={[styles.dayCity, { color: theme.textSecondary }]}>
            📍 {currentDay.city} · {currentDay.activities.length} stops
          </Text>
        </View>

        {/* Timeline */}
        <ScrollView
          style={styles.timelineScroll}
          contentContainerStyle={styles.timelineContent}
          showsVerticalScrollIndicator={false}
        >
          {currentDay.activities.map((activity, index) => (
            <ActivityItem
              key={`${currentDay.dayNumber}-${index}`}
              activity={activity}
              isLast={index === currentDay.activities.length - 1}
              color={itinerary.color}
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
  ambientGlow: {
    position: 'absolute',
    top: -80,
    left: '10%',
    width: '80%',
    height: 250,
    borderRadius: 125,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  backArrow: { fontSize: 24, fontWeight: '600' },
  headerTextContainer: { marginLeft: 8, flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
  headerSubtitle: { fontSize: 13, fontWeight: '500', marginTop: 1 },
  dayTabsScroll: { maxHeight: 72 },
  dayTabsContainer: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  dayTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  dayTabNumber: { fontSize: 14, fontWeight: '700' },
  dayTabCity: { fontSize: 11, fontWeight: '500', marginTop: 2 },
  dayHeader: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 6 },
  dayBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  dayBadgeText: { fontSize: 12, fontWeight: '700' },
  dayTitle: { fontSize: 26, fontWeight: '800', marginBottom: 4, letterSpacing: -0.5 },
  dayCity: { fontSize: 14, fontWeight: '500' },
  timelineScroll: { flex: 1 },
  timelineContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  activityRow: { flexDirection: 'row' },
  timelineCol: { width: 20, alignItems: 'center', paddingTop: 14 },
  timelineDot: { width: 10, height: 10, borderRadius: 5 },
  timelineLine: { width: 1.5, flex: 1, marginTop: 4 },
  activityCard: {
    flex: 1,
    marginLeft: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  activityContent: {
    padding: 14,
  },
  activityTime: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  activityTitle: { fontSize: 15, fontWeight: '600', lineHeight: 21 },
  activityNote: { fontSize: 12, fontWeight: '400', marginTop: 3, fontStyle: 'italic' },
  errorText: { textAlign: 'center', marginTop: 100, fontSize: 16 },
});
