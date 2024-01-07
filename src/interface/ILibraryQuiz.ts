export interface ILibraryQuiz {
  id: number;
  image_url: string;
  title: string;
  description: string;
  num_played: number;
  updated_at: string;
  published: boolean;
  author: string;
  favorite: boolean;
  status: string;
}
