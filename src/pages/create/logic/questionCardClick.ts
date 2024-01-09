export const handleQuestionCardClick = (
  clickedQuestionIndex: number,
  questionData: any,
  activeQuestion: any,
  setActiveQuestion: (data: any) => void,
  setQuestionValue: (data: any) => void,
  handleMessageErrors: boolean
) => {
  if (clickedQuestionIndex !== activeQuestion) {
    if (!handleMessageErrors) {
      return;
    }
  }
  setActiveQuestion(clickedQuestionIndex);
  setQuestionValue(questionData[clickedQuestionIndex].questionText);
};
