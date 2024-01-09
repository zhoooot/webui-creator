const handleMissingQuestion = (questionValue: string, setShowMissingQuestionPopover: any) => {
  if (questionValue.trim() === "") {
    setShowMissingQuestionPopover(true);
    return true;
  } else {
    setShowMissingQuestionPopover(false);
    return false;
  }
};

const handleMissingCorrectAnswer = (questionData: any, activeQuestion: number, setShowMissingCorrectAnswerPopover: any) => {
  if (questionData[activeQuestion].correctAnswer === -1) {
    setShowMissingCorrectAnswerPopover(true);
    return true;
  } else {
    setShowMissingCorrectAnswerPopover(false);
    return false;
  }
};

export const handleMessageErrors = (questionValue: string, questionData: any, activeQuestion: number, setShowMissingQuestionPopover: any, setShowMissingCorrectAnswerPopover: any) => {
  if (handleMissingCorrectAnswer(questionData, activeQuestion, setShowMissingCorrectAnswerPopover) || handleMissingQuestion(questionValue, setShowMissingQuestionPopover)) {
    return false;
  }
  return true;
};