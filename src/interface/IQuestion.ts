export interface IQuestion {

  id: number;
  content: string;
  options: Array<string>;
  correct: number;
  time: number;
  powerUps: boolean;

  IQuestion(questionNumber: number, questionText: string, answerTexts: Array<string>, correctAnswer: number, time: number, powerUps: boolean): void;
}

export interface Question {
  questionNumber: number;
  questionText: string;
  answerTexts: Array<string>;
  correctAnswer: number;
  time: number;
  powerUps: boolean;
}

