export interface Activity {
  time: string;
  emoji: string;
  title: string;
  note?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  city: string;
  title: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
  cities: string[];
  days: ItineraryDay[];
}

export interface ItinerariesData {
  itineraries: Itinerary[];
}
