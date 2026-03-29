export type TipsStackParamList = {
  Home: undefined;
  Category: {
    categoryId: string;
    categoryTitle: string;
    categoryColor: string;
  };
};

export type ItineraryStackParamList = {
  ItineraryList: undefined;
  ItineraryDetail: {
    itineraryId: string;
    itineraryTitle: string;
  };
};

// Keep backward compat alias
export type RootStackParamList = TipsStackParamList;
