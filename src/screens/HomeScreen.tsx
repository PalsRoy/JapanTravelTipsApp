import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useAllCategories, useTipCount } from '../hooks/useTips';
import { useAppTheme } from '../theme';
import CategoryCard from '../components/CategoryCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme, isDark } = useAppTheme();
  const { data: categories, isLoading } = useAllCategories();
  const { data: tipCount } = useTipCount();

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.flag}>🇯🇵</Text>
      <Text style={[styles.title, { color: theme.text }]}>
        Tips for Japan
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {tipCount ?? 0} essential tips for your trip
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <StatusBar barStyle={theme.statusBar} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>🗾</Text>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading tips...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={theme.statusBar} />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: 16,
    paddingBottom: 24,
  },
  flag: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
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
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
