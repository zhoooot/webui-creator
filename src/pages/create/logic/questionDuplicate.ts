import { Question } from "@/interface/IQuestion";

export const handeDuplicateQuestion = (questionNumber: number, questionData: any, setQuestionData: (data: any) => void) => {
  const newQuestion: Question = {
    questionNumber: questionData.length,
    questionText: questionData[questionNumber].questionText,
    answerTexts: questionData[questionNumber].answerTexts,
    correctAnswer: questionData[questionNumber].correctAnswer,
    time: questionData[questionNumber].time,
    powerUps: questionData[questionNumber].powerUps,
  };
  setQuestionData([...questionData, newQuestion]);
};