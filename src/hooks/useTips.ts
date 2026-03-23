import { useQuery } from '@tanstack/react-query';
import tipsData from '../data/tips.json';
import { TipsData, Category, Tip } from '../types';

// Simulate async fetch (makes it easy to swap to a remote API later)
const fetchTips = async (): Promise<TipsData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tipsData as TipsData), 100);
  });
};

export function useAllCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchTips,
    staleTime: Infinity, // Local data never goes stale
    gcTime: Infinity,
    select: (data) => data.categories,
  });
}

export function useCategory(categoryId: string) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchTips,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data) =>
      data.categories.find((c: Category) => c.id === categoryId) ?? null,
  });
}

export function useSearchTips(query: string) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchTips,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data) => {
      if (!query.trim()) return [];
      const lowerQuery = query.toLowerCase();
      const results: (Tip & { categoryTitle: string; categoryColor: string })[] = [];
      data.categories.forEach((category: Category) => {
        category.tips.forEach((tip: Tip) => {
          if (
            tip.title.toLowerCase().includes(lowerQuery) ||
            tip.content.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              ...tip,
              categoryTitle: category.title,
              categoryColor: category.color,
            });
          }
        });
      });
      return results;
    },
  });
}

export function useTipCount() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchTips,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data) =>
      data.categories.reduce(
        (acc: number, cat: Category) => acc + cat.tips.length,
        0
      ),
  });
}
