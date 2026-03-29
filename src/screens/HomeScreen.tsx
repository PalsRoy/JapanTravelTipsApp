import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useAllCategories, useTipCount } from '../hooks/useTips';
import { useAppTheme } from '../theme';
import CategoryCard from '../components/CategoryCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TipsStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<TipsStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useAppTheme();
  const { data: categories, isLoading, error } = useAllCategories();
  const { data: tipCount } = useTipCount();

  return (
    <View style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.background} />

      {/* Background ambient glows */}
      <View style={styles.ambientGlow1} />
      <View style={styles.ambientGlow2} />

      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingEmoji}>🇯🇵</Text>
            <ActivityIndicator size="small" color="#FF2D78" style={{ marginTop: 16 }} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              Loading tips...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingEmoji}>⚠️</Text>
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              Something went wrong. Please restart the app.
            </Text>
          </View>
        ) : (
          <FlatList
            data={categories ?? []}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.header}>
                {/* Decorative glow */}
                <View style={styles.headerGlow} />
                <Text style={styles.flag}>🇯🇵</Text>
                <Text style={[styles.title, { color: theme.text }]}>
                  Tips for Japan
                </Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  {tipCount ?? 0} essential tips for your trip
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                theme={theme}
                onPress={() =>
                  navigation.navigate('Category', {
                    categoryId: item.id,
                    categoryTitle: item.title,
                    categoryColor: item.color,
                  })
                }
              />
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  ambientGlow1: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 45, 120, 0.08)',
  },
  ambientGlow2: {
    position: 'absolute',
    top: 200,
    left: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: 16,
    paddingBottom: 28,
    position: 'relative',
  },
  headerGlow: {
    position: 'absolute',
    top: 10,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 45, 120, 0.12)',
  },
  flag: {
    fontSize: 44,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 12,
  },
});
