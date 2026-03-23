export interface Tip {
  id: string;
  title: string;
  emoji: string;
  content: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  tips: Tip[];
}

export interface TipsData {
  categories: Category[];
}
