export interface Phrase {
  japanese: string;
  romaji: string;
  english: string;
  note: string;
}

export interface PhraseCategory {
  id: string;
  title: string;
  emoji: string;
  color: string;
  phrases: Phrase[];
}

export interface Phrasebook {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  culturalNote: string;
  categories: PhraseCategory[];
}

export interface PhrasebookData {
  phrasebook: Phrasebook;
}
