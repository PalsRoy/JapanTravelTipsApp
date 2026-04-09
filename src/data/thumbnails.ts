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
  'Shibuya Scramble': 'https://images.unsplash.com/photo-1573456373835-579c408de263?w=400&h=300&fit=crop',
  'Shibuya Parco': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  'Hakata Tempura Takao': 'https://images.unsplash.com/photo-1593357849627-cbbc9fda6b05?w=400&h=300&fit=crop',
  'Golden Gai': 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&h=300&fit=crop',

  // Day 2 - Tokyo
  'Tsumugi cafe in Tsukiji': 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
  'Onitsuka Tiger': 'https://images.unsplash.com/photo-1769265114498-44b36dbaff24?w=400&h=300&fit=crop',
  'Ginza': 'https://images.unsplash.com/photo-1603444190969-48bd472d919b?w=400&h=300&fit=crop',
  '銀座 篝 大手町店': require('../../assets/headers/ginza-kagaari.png'),
  'GINZA SIX': 'https://images.unsplash.com/photo-1734044833621-7bf9ee01285b?w=400&h=300&fit=crop',
  'BONGEN COFFEE': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'teamLab Borderless': 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=300&fit=crop',
  'Tokyo Tower': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=300&fit=crop',
  'Yakitori Kufuraku Ginzasohonten':  require('../../assets/headers/yakitori-kufuraku-ginzasohonten.png'),


  // Day 3 - Tokyo
  'kimono': 'https://images.unsplash.com/photo-1586434722766-b46308f072ed?w=400&h=300&fit=crop',
  'Fuglen Asakusa': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'Senso-ji Temple': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
  'Nakamise Street': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
  'Sushiro Asakusa': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
  'LE LABO KYOTO MACHIYA':  require('../../assets/headers/lelabo.png'),
  'Tokyo Solamachi': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  'Kappabashi Street': 'https://images.unsplash.com/photo-1609467334293-030ac6448fd8?w=400&h=300&fit=crop',
  'Mo Mo Paradise': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'Don Quijote': 'https://images.unsplash.com/photo-1763475775000-3a2ea3ca539f?w=400&h=300&fit=crop',

  // Day 4 - Kyoto
  'Kyoto Station': 'https://images.unsplash.com/photo-1581536763020-d2d7cfdd4df6?w=400&h=300&fit=crop',
  'Fushimi Inari Taisha': 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop',
  'Vermillion Cafe': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'Tofukuji Temple': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Gion': 'https://images.unsplash.com/photo-1593405844957-3854dae97a19?w=400&h=300&fit=crop',
  'Katsukura Sanjo': 'https://images.unsplash.com/photo-1496112774951-bf41010eed5e?w=400&h=300&fit=crop',
  'Yasaka Shrine': 'https://images.unsplash.com/photo-1658236996139-57b2211a92c0?w=400&h=300&fit=crop',
  'Starbucks Coffee': 'https://images.unsplash.com/photo-1550121713-e2012d7cea3a?w=400&h=300&fit=crop',
  'Okonomiyaki JUJU': require('../../assets/headers/okonomiyakiJUJU.png'),

  // Day 5 - Kyoto
  'Arashiyama Bamboo Grove': 'https://images.unsplash.com/photo-1761623418974-c1288110d084??w=400&h=300&fit=crop',
  'Togetsukyo Bridge': 'https://images.unsplash.com/photo-1767842927200-9a83d12fac39?w=400&h=300&fit=crop',
  '% ARABICA Arashiyama': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
  'Kinkaku-ji Temple': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop',
  "Ryoan-ji": 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  'Seigenin': 'https://images.unsplash.com/photo-1760228865341-675704c22a5b??w=400&h=300&fit=crop',
  "Philosopher's Path": 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop',
  'Nanzen-ji Temple': 'https://images.unsplash.com/photo-1590942395945-745e5e441db8?w=400&h=300&fit=crop',
  'Beatle momo record Bar': 'https://images.unsplash.com/photo-1760931657888-3a1305fe68c4?w=400&h=300&fit=crop',
};

/**
 * Find a thumbnail URL for an activity title by matching against known locations
 */
export function getThumbnailForActivity(title: string): string | number | null {
  let bestMatch : string | number | null = "";
  let bestMatchLength : number = 0;
  for (const [key, url] of Object.entries(activityThumbnails)) {
    if (title.includes(key) && key.length > bestMatchLength) {
      bestMatch = url;
      bestMatchLength = key.length;
    }
  }
  return bestMatch;
}

// City hero images for itinerary headers
export const cityHeroImages: Record<string, string> = {
  'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
  'Kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop',
  'Osaka': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=400&fit=crop',
};
