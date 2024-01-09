export const handleQuestionCardClick = (clickedQuestionIndex: number, questionData: any, activeQuestion: any, setShowMissingCorrectAnswerPopover: (data: any) => void, setActiveQuestion: (data: any) => void, setQuestionValue: (data: any) => void) => {
  if (questionData[activeQuestion].correctAnswer === -1) {
    setShowMissingCorrectAnswerPopover(true);
  } else {
    if (questionData[activeQuestion].questionText.trim() === "") {
      return;
    }
    setActiveQuestion(clickedQuestionIndex);
    setQuestionValue(questionData[clickedQuestionIndex].questionText);
  }
};