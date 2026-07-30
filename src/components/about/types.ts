export interface TimelineChapter {
  id: string;
  title: string;
  age?: string;
  story: string[];
}

export interface Interest {
  label: string;
}

export interface InterestingFact {
  id: string;
  text: string;
}
