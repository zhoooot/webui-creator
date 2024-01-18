export interface IQuizDetail {
  id: string;
  image_url: string;
  title: string;
  description: string;
  num_played: number;
  updated_at: string;
  published: boolean;
  author: string;
  authorId: string;
  is_reported: boolean;
  favorite: boolean;
  has_draft: boolean;
  questions: {
    question: string;
    options: { id: number, text: string; correct: boolean }[];
    time: number;
    powerUps: boolean;
  }[];
}
