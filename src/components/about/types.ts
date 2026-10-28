export interface TimelineChapter {
  id: string;
  title: string;
  age?: string;
  story: string[];
  description?: string;
  icon?: string;
  color?: string;
}

export interface Interest {
  label: string;
}

export interface InterestingFact {
  id: string;
  text: string;
}
