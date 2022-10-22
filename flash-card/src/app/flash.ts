export interface Flash {
  question: string;
  answer: string;
  show: boolean;
  id: number;
  remembered?: 'correct' | 'incorrect';
}
