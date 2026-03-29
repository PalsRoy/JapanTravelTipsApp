import { useQuery } from '@tanstack/react-query';
import phrasesData from '../data/phrases.json';
import { PhrasebookData } from '../types/phrases';

const typedData = phrasesData as PhrasebookData;

export function usePhrasebook() {
  return useQuery({
    queryKey: ['phrases'],
    queryFn: async () => typedData,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: typedData,
    select: (data) => data.phrasebook,
  });
}
