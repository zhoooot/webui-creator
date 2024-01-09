export const handleCorrectAnswerChange = (id: number, activeQuestion: any, setShowMissingCorrectAnswerPopover: (data: any) => void, setQuestionData: (data: any) => void) => {
  console.log("correct answer: " + id);
  setShowMissingCorrectAnswerPopover(false);
  setQuestionData((prev: any) => {
    const newQuestionData = [...prev];
    newQuestionData[activeQuestion].correctAnswer = id;
    return newQuestionData;
  });
};