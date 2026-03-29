export interface CoffeeSpot {
  id: string;
  name: string;
  neighborhood: string;
  description: string;
  mustTry: string;
  image: string;
}

export interface CoffeeCity {
  city: string;
  spots: CoffeeSpot[];
}

export interface CoffeeGuide {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  cities: CoffeeCity[];
}

export interface CoffeeData {
  coffeeGuide: CoffeeGuide;
}
