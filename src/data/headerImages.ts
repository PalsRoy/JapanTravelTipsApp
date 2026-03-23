// Static require mapping for category header images
// React Native requires static imports for bundled images

const headerImages: Record<string, any> = {
  'before-you-travel': require('../../assets/headers/before-you-travel.png'),
  'prepare-beforehand': require('../../assets/headers/prepare-beforehand.png'),
  'key-apps': require('../../assets/headers/key-apps.png'),
  'accommodation': require('../../assets/headers/accommodation.png'),
  'planning-your-trip': require('../../assets/headers/planning-your-trip.png'),
  'transportation': require('../../assets/headers/transportation.png'),
  'travel-smart': require('../../assets/headers/travel-smart.png'),
  'packing-tips': require('../../assets/headers/packing-tips.png'),
  'luggage-hacks': require('../../assets/headers/luggage-hacks.png'),
  'etiquette': require('../../assets/headers/etiquette.png'),
  'money-payment': require('../../assets/headers/money-payment.png'),
  'shopping': require('../../assets/headers/shopping.png'),
  'souvenirs': require('../../assets/headers/souvenirs.png'),
  'konbini': require('../../assets/headers/konbini.png'),
  'food-tips': require('../../assets/headers/food-tips.png'),
  'smart-living': require('../../assets/headers/smart-living.png'),
  'during-your-trip': require('../../assets/headers/during-your-trip.png'),
};

export function getHeaderImage(categoryId: string) {
  return headerImages[categoryId] ?? null;
}
