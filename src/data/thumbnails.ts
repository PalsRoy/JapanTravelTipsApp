// Thumbnail URLs for itinerary activities
// Uses Unsplash source for free, high-quality location images
// Format: small thumbnails (400x300) for cards, loaded via URI

const UNSPLASH = 'https://source.unsplash.com';

// Pre-mapped location thumbnails for offline-friendly caching
// These use specific Unsplash photo IDs for consistent results
export const activityThumbnails: Record<string, string> = {
  // Day 1 - Tokyo
  'Haneda/Narita Airport': 'https://images.unsplash.com/photo-1674725690428-948af1d7f5a1?w=400&h=300&fit=crop',
  'Meiji Jingu Shrine': 'https://images.unsplash.com/photo-1706441806701-c195f59728be?w=400&h=300&fit=crop',
  'Takeshita Street': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',
  'Cat Street': 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&h=300&fit=crop',
  'Menchirashi': 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop',
  'The Matcha Tokyo': 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop',
  'Shibuya Scramble': 'https://images.unsplash.com/photo-1542931287-023b922fa89b?w=400&h=300&fit=crop',
  'Shibuya Parco': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  'Hakata Tempura Takao': 'https://images.unsplash.com/photo-1593357849627-cbbc9fda6b05?w=400&h=300&fit=crop',
  'Golden Gai': 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&h=300&fit=crop',

  // Day 2 - Tokyo
  'Tsumugi cafe in Tsukiji': 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
  'Onitsuka Tiger Ginza RED': 'https://images.unsplash.com/photo-1769265114498-44b36dbaff24?w=400&h=300&fit=crop',
  'Ginza': 'https://images.unsplash.com/photo-1603444190969-48bd472d919b?w=400&h=300&fit=crop',
  '銀座 篝 大手町店': require('../../assets/headers/ginza-kagaari.png'),
  'GINZA SIX': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=300&fit=crop',
  'BONGEN COFFEE': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'teamLab Borderless': 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=300&fit=crop',
  'Tokyo Tower': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=300&fit=crop',
  'Yakitori Kufuraku Ginzasohonten':  require('../../assets/headers/yakitori-kufuraku-ginzasohonten.png'),
  'Don Quijote': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',

  // Day 3 - Tokyo
  'Misojyu Asakusa': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
  'Fuglen Asakusa': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'Senso-ji Temple': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
  'Nakamise Street': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
  'Sumida Park': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop',
  'Sushiro Asakusa': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
  'Tokyo Sky Tree': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  'Tokyo Solamachi': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  'Kappabashi Street': 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&h=300&fit=crop',
  'Mo Mo Paradise': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',

  // Day 4 - Kyoto
  'Kyoto Station': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Fushimi Inari Taisha': 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop',
  'Vermillion Cafe': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'Tofukuji Temple': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Gion': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop',
  'Gion Duck Noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
  'Yasaka Shrine': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Kiyomizu-dera': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Pontocho Fujita': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop',

  // Day 5 - Kyoto
  'Arashiyama Bamboo Grove': 'https://images.unsplash.com/photo-1528164344885-47b1492d5903?w=400&h=300&fit=crop',
  'Togetsukyo Bridge': 'https://images.unsplash.com/photo-1528164344885-47b1492d5903?w=400&h=300&fit=crop',
  '% ARABICA Arashiyama': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'Kinkaku-ji Temple': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop',
  "Ryoan-ji": 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Seigenin': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  "Philosopher's Path": 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Nanzen-ji Temple': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Kyoto tower': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Fish and 7 Totosebun': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
};

/**
 * Find a thumbnail URL for an activity title by matching against known locations
 */
export function getThumbnailForActivity(title: string): string | number | null {
  // Try exact key match first
  for (const [key, url] of Object.entries(activityThumbnails)) {
    if (title.includes(key)) {
      return url;
    }
  }
  return null;
}

// City hero images for itinerary headers
export const cityHeroImages: Record<string, string> = {
  'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
  'Kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop',
  'Osaka': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=400&fit=crop',
};
