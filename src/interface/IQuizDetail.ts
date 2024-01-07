export interface IQuizDetail {
  image_url: string;
  title: string;
  description: string;
  num_played: number;
  updated_at: string;
  published: boolean;
  author: string;
  questions: {
    question: string;
    options: { text: string; correct: boolean }[];
  }[];
}
