import { useQuery } from '@tanstack/react-query';
import coffeeData from '../data/coffee.json';
import { CoffeeData } from '../types/coffee';

const typedData = coffeeData as CoffeeData;

const fetchCoffee = async (): Promise<CoffeeData> => {
  return typedData;
};

export function useCoffeeGuide() {
  return useQuery({
    queryKey: ['coffee'],
    queryFn: fetchCoffee,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: typedData,
    select: (data) => data.coffeeGuide,
  });
}
