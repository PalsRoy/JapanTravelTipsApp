# 🇯🇵 Tips for Japan

A React Native (Expo) app with essential travel tips for Japan, featuring swipeable category cards, dark mode, and offline support.

## Tech Stack

- **Expo SDK 52** — managed workflow for easy App Store / Play Store builds
- **React Native 0.76** — cross-platform iOS & Android
- **TanStack Query v5** — data layer (local JSON now, swap to API later)
- **React Navigation v7** — native stack navigation
- **TypeScript** — full type safety

## Project Structure

```
japan-tips-app/
├── App.tsx                       # Entry point
├── app.json                      # Expo config
├── eas.json                      # EAS Build & Submit config
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   ├── CategoryCard.tsx       # Grid card on home screen
    │   ├── TipCard.tsx            # Swipeable tip detail card
    │   └── SwipeIndicator.tsx     # Dot pagination
    ├── data/
    │   └── tips.json              # All tips data (edit this to add content!)
    ├── hooks/
    │   └── useTips.ts             # TanStack Query hooks
    ├── navigation/
    │   ├── AppNavigator.tsx       # Stack navigator
    │   └── types.ts               # Navigation param types
    ├── screens/
    │   ├── HomeScreen.tsx         # Category grid
    │   └── CategoryScreen.tsx     # Swipeable tips within a category
    ├── theme/
    │   └── index.ts               # Light/Dark theme system
    └── types/
        └── index.ts               # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Expo account: https://expo.dev/signup

### Install & Run

```bash
cd japan-tips-app
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

## Adding New Tips

Edit `src/data/tips.json`. Each category follows this structure:

```json
{
  "id": "unique-slug",
  "title": "Category Name",
  "icon": "🎌",
  "color": "#HEX",
  "tips": [
    {
      "id": "tip-slug",
      "title": "Tip Title",
      "emoji": "💡",
      "content": "Tip description text..."
    }
  ]
}
```

That's it — no code changes needed when adding tips!

## Building for App Store & Play Store

### 1. Configure your identifiers

In `app.json`, update:
- `ios.bundleIdentifier` → your reverse domain (e.g., `com.yourcompany.japantips`)
- `android.package` → same format

In `eas.json`, update:
- `submit.production.ios` → your Apple ID, ASC App ID, Team ID
- `submit.production.android` → path to your Google Play service account JSON

### 2. Build

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

### 3. Submit

```bash
# iOS → App Store Connect
eas submit --platform ios

# Android → Google Play Console
eas submit --platform android
```

## Features

- ✅ **17 categories** with 60+ tips extracted from real travel content
- ✅ **Swipeable cards** — horizontal paging within each category
- ✅ **Dark mode** — automatic, follows system preference
- ✅ **Offline-first** — all data bundled locally, works without internet
- ✅ **TanStack Query** — ready to swap to a remote API when needed
- ✅ **Type-safe** — full TypeScript throughout
- ✅ **App Store ready** — EAS Build configured for both platforms

## Future Enhancements

- [ ] Search & filter tips
- [ ] Bookmarks / favorites (AsyncStorage)
- [ ] Push notifications for trip reminders
- [ ] Remote API for content updates without app releases
- [ ] Image support for tips
- [ ] Share individual tips
- [ ] Multi-language support
