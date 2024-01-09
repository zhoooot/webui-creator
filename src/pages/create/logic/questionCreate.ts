import { Question } from "@/interface/IQuestion";

export const handleCreateQuestion = (questionData: any, setQuestionData: (data: any) => void, setActiveQuestion: (data: any) => void, setQuestionValue: (data: any) => void) => {
  const newQuestion: Question = {
    questionNumber: questionData.length,
    questionText: "",
    answerTexts: ["", "", "", ""],
    correctAnswer: -1,
    time: 0,
    powerUps: true,
  };
  setQuestionData([...questionData, newQuestion]);
  setActiveQuestion(questionData.length);
  setQuestionValue("");
};