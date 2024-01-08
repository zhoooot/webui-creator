export const handleExitQuiz = (questionData: any, activeQuestion: any, setShowMissingCorrectAnswerPopover: (data: any) => void) => {
  console.log("handleExitQuiz");

  const handleBlur = () => {
    if (questionData[activeQuestion].correctAnswer === -1) {
      setShowMissingCorrectAnswerPopover(true);
    } else {
      setShowMissingCorrectAnswerPopover(false);
    }
  };
};