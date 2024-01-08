export class IQuizData {
  id: string;
  imageUrl: string;
  number: number;
  name: string;
  questionCount: number;

  constructor(id: string, imageUrl: string, number: number, name: string, questionCount: number) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.number = number;
    this.name = name;
    this.questionCount = questionCount;
  }
}

export default IQuizData;