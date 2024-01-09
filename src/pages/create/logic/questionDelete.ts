export const handleDeleteQuestion = (questionNumber: number, activeQuestion: any, questionData: any, setActiveQuestion: (data: any) => void, setQuestionData: (data: any) => void, setQuestionValue: (data: any) => void) => {
  let check = true;
  if (activeQuestion != questionNumber) {
    check = false;
  }
  if (activeQuestion > questionNumber) {
    setActiveQuestion(activeQuestion - 1);
  } else if ((questionNumber === questionData.length - 1) && (activeQuestion === questionNumber)) {
    setActiveQuestion(activeQuestion - 1);
  }
  console.log("deleted question: " + questionNumber);
  console.log(activeQuestion);
  setQuestionData((prev: any) => {
    const newQuestionData = [...prev];
    newQuestionData.splice(questionNumber, 1);
    return newQuestionData;
  });
  if (check) {
    if (activeQuestion >= questionData.length - 1) {
      setQuestionValue(questionData[activeQuestion - 1].questionText);
    } else {
      // if (activeQuestion)
      setQuestionValue(questionData[activeQuestion + 1].questionText);
    }
  }
};