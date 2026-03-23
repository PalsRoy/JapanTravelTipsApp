import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ViewToken,
} from 'react-native';
import { useCategory } from '../hooks/useTips';
import { useAppTheme } from '../theme';
import TipCard from '../components/TipCard';
import SwipeIndicator from '../components/SwipeIndicator';
import { getHeaderImage } from '../data/headerImages';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type CategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Category'>;
  route: RouteProp<RootStackParamList, 'Category'>;
};

export default function CategoryScreen({
  navigation,
  route,
}: CategoryScreenProps) {
  const { categoryId, categoryTitle, categoryColor } = route.params;
  const { theme } = useAppTheme();
  const { data: category } = useCategory(categoryId);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const headerImage = getHeaderImage(categoryId);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  if (!category) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.errorText, { color: theme.textSecondary }]}>
          Category not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Image Banner */}
      {headerImage && (
        <View style={styles.headerImageContainer}>
          <Image
            source={headerImage}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={[styles.headerOverlay, { backgroundColor: categoryColor + '99' }]} />
          <SafeAreaView style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButtonOnImage}
            >
              <Text style={styles.backArrowWhite}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTextOnImage}>
              <Text style={styles.headerTitleWhite}>
                {category.icon} {categoryTitle}
              </Text>
              <Text style={styles.headerSubtitleWhite}>
                {category.tips.length} tips
              </Text>
            </View>
          </SafeAreaView>
        </View>
      )}

      {!headerImage && (
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={[styles.backArrow, { color: theme.text }]}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: theme.text }]}>
                {category.icon} {categoryTitle}
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                Swipe through {category.tips.length} tips
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}

      {/* Swipeable Tips */}
      <FlatList
        ref={flatListRef}
        data={category.tips}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={{ width }}>
            <TipCard
              tip={item}
              theme={theme}
              categoryColor={categoryColor}
              index={index}
              total={category.tips.length}
            />
          </View>
        )}
      />

      <SwipeIndicator
        total={category.tips.length}
        current={activeIndex}
        color={categoryColor}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerImageContainer: { height: 180, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  headerOverlay: { ...StyleSheet.absoluteFillObject, opacity: 0.85 },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButtonOnImage: {
    position: 'absolute',
    top: 52,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowWhite: { fontSize: 20, fontWeight: '600', color: '#FFFFFF' },
  headerTextOnImage: { marginLeft: 4 },
  headerTitleWhite: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitleWhite: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  backArrow: { fontSize: 24, fontWeight: '600' },
  headerTextContainer: { marginLeft: 8, flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  headerSubtitle: { fontSize: 13, fontWeight: '500', marginTop: 2 },
  listContent: { paddingVertical: 8 },
  errorText: { textAlign: 'center', marginTop: 100, fontSize: 16 },
});
