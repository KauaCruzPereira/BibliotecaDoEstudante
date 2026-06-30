export type Alternative = {
  letter: string;
  text: string;
};

export type Question = {
  index: number;
  context: string;
  language: string;
  alternativesIntroduction: string;
  correctAlternative: string;
  alternatives: Alternative[];
};