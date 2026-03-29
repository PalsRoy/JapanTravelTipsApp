import { useQuery } from '@tanstack/react-query';
import itinerariesData from '../data/itineraries.json';
import { ItinerariesData, Itinerary } from '../types/itinerary';

const typedData = itinerariesData as ItinerariesData;

const fetchItineraries = async (): Promise<ItinerariesData> => {
  return typedData;
};

export function useAllItineraries() {
  return useQuery({
    queryKey: ['itineraries'],
    queryFn: fetchItineraries,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: typedData,
    select: (data) => data.itineraries,
  });
}

export function useItinerary(itineraryId: string) {
  return useQuery({
    queryKey: ['itineraries'],
    queryFn: fetchItineraries,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: typedData,
    select: (data) =>
      data.itineraries.find((i: Itinerary) => i.id === itineraryId) ?? null,
  });
}
