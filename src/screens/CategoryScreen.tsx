import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import { useCategory } from '../hooks/useTips';
import { useAppTheme } from '../theme';
import TipCard from '../components/TipCard';
import SwipeIndicator from '../components/SwipeIndicator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TipsStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type CategoryScreenProps = {
  navigation: NativeStackNavigationProp<TipsStackParamList, 'Category'>;
  route: RouteProp<TipsStackParamList, 'Category'>;
};

export default function CategoryScreen({ navigation, route }: CategoryScreenProps) {
  const { categoryId, categoryTitle, categoryColor } = route.params;
  const { theme } = useAppTheme();
  const { data: category } = useCategory(categoryId);
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

  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.textSecondary }]}>Category not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Ambient color glow from category */}
      <View style={[styles.categoryGlow, { backgroundColor: categoryColor + '12' }]} />

      <SafeAreaView style={styles.flex}>
        {/* Glass header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={[styles.backArrow, { color: theme.text }]}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {category.icon} {categoryTitle}
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textTertiary }]}>
              Swipe through {category.tips.length} tips
            </Text>
          </View>
        </View>

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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  categoryGlow: {
    position: 'absolute',
    top: -50,
    left: '20%',
    width: '60%',
    height: 200,
    borderRadius: 100,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  backArrow: { fontSize: 24, fontWeight: '600' },
  headerTextContainer: { marginLeft: 8, flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
  headerSubtitle: { fontSize: 13, fontWeight: '500', marginTop: 2 },
  listContent: { paddingVertical: 8 },
  errorText: { textAlign: 'center', marginTop: 100, fontSize: 16 },
});
