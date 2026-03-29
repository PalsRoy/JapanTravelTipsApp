import { useColorScheme, Platform } from 'react-native';

// ─── Dark Glassmorphism Palette ───
// Inspired by Japanese nights: deep indigo, neon sakura, frosted glass

export const darkTheme = {
  // Backgrounds — deep layered darks
  background: '#05050F',
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceElevated: 'rgba(255, 255, 255, 0.07)',
  glassBg: 'rgba(255, 255, 255, 0.06)',
  glassStroke: 'rgba(255, 255, 255, 0.10)',
  glassHighlight: 'rgba(255, 255, 255, 0.15)',

  // Text
  text: '#F2F0FF',
  textSecondary: 'rgba(242, 240, 255, 0.6)',
  textTertiary: 'rgba(242, 240, 255, 0.35)',

  // Accent — neon sakura pink
  accent: '#FF2D78',
  accentSoft: 'rgba(255, 45, 120, 0.15)',
  accentGlow: 'rgba(255, 45, 120, 0.30)',

  // Secondary accent — electric cyan
  accentSecondary: '#00E5FF',
  accentSecondarySoft: 'rgba(0, 229, 255, 0.12)',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.12)',

  // Functional
  cardShadow: '#000000',
  statusBar: 'light-content' as const,
  tabBar: 'rgba(8, 8, 20, 0.92)',
  tabBarBorder: 'rgba(255, 255, 255, 0.06)',

  // Chips / pills
  chipBackground: 'rgba(255, 255, 255, 0.06)',
  chipActiveBackground: '#FF2D78',
  chipText: 'rgba(242, 240, 255, 0.6)',
  chipActiveText: '#FFFFFF',

  // Search
  searchBackground: 'rgba(255, 255, 255, 0.06)',

  // Overlays
  overlayDark: 'rgba(5, 5, 15, 0.7)',
  overlayGlass: 'rgba(20, 20, 40, 0.85)',
};

export const lightTheme = {
  // Even the "light" mode is dark-leaning for this app
  // A twilight/dusk feel rather than bright white
  background: '#0A0A1A',
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceElevated: 'rgba(255, 255, 255, 0.08)',
  glassBg: 'rgba(255, 255, 255, 0.07)',
  glassStroke: 'rgba(255, 255, 255, 0.12)',
  glassHighlight: 'rgba(255, 255, 255, 0.18)',

  text: '#F2F0FF',
  textSecondary: 'rgba(242, 240, 255, 0.65)',
  textTertiary: 'rgba(242, 240, 255, 0.38)',

  accent: '#FF2D78',
  accentSoft: 'rgba(255, 45, 120, 0.15)',
  accentGlow: 'rgba(255, 45, 120, 0.30)',

  accentSecondary: '#00E5FF',
  accentSecondarySoft: 'rgba(0, 229, 255, 0.12)',

  border: 'rgba(255, 255, 255, 0.10)',
  borderLight: 'rgba(255, 255, 255, 0.14)',

  cardShadow: '#000000',
  statusBar: 'light-content' as const,
  tabBar: 'rgba(10, 10, 26, 0.94)',
  tabBarBorder: 'rgba(255, 255, 255, 0.08)',

  chipBackground: 'rgba(255, 255, 255, 0.07)',
  chipActiveBackground: '#FF2D78',
  chipText: 'rgba(242, 240, 255, 0.65)',
  chipActiveText: '#FFFFFF',

  searchBackground: 'rgba(255, 255, 255, 0.07)',

  overlayDark: 'rgba(5, 5, 15, 0.7)',
  overlayGlass: 'rgba(20, 20, 40, 0.85)',
};

export type Theme = typeof darkTheme;

// Glass card style helper
export function glassCard(theme: Theme) {
  return {
    backgroundColor: theme.glassBg,
    borderWidth: 1,
    borderColor: theme.glassStroke,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  };
}

// Glow accent helper
export function accentGlow(theme: Theme) {
  return Platform.select({
    ios: {
      shadowColor: theme.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
    },
    android: {},
  });
}

export function useAppTheme(): { theme: Theme; isDark: boolean } {
  // Always dark for this app's aesthetic
  return {
    theme: darkTheme,
    isDark: true,
  };
}
