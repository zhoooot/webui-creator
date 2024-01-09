export const handleAnswerChange = (id: number, text: string, activeQuestion: any, setQuestionData: (data: any) => void) => {
  setQuestionData((prev: any) => {
    const newQuestionData = [...prev];
    newQuestionData[activeQuestion].answerTexts[id] = text;
    return newQuestionData;
  });
};