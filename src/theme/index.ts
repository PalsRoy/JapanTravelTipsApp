import { useColorScheme } from 'react-native';

export const lightTheme = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  accent: '#E84393',
  cardShadow: '#000000',
  statusBar: 'dark-content' as const,
  tabBar: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  searchBackground: '#F3F4F6',
  chipBackground: '#F3F4F6',
  chipActiveBackground: '#E84393',
  chipText: '#374151',
  chipActiveText: '#FFFFFF',
};

export const darkTheme = {
  background: '#0D1117',
  surface: '#161B22',
  surfaceElevated: '#1C2333',
  text: '#F0F6FC',
  textSecondary: '#8B949E',
  textTertiary: '#6E7681',
  border: '#30363D',
  accent: '#E84393',
  cardShadow: '#000000',
  statusBar: 'light-content' as const,
  tabBar: '#161B22',
  tabBarBorder: '#30363D',
  searchBackground: '#1C2333',
  chipBackground: '#1C2333',
  chipActiveBackground: '#E84393',
  chipText: '#8B949E',
  chipActiveText: '#FFFFFF',
};

export type Theme = typeof lightTheme;

export function useAppTheme(): { theme: Theme; isDark: boolean } {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
  };
}
