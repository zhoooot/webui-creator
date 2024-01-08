export const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setQuestionValue: (data: any) => void, setQuestionData: (data: any) => void, activeQuestion: any) => {
  const newQuestionValue = e.target.value;
  setQuestionValue(newQuestionValue);
  setQuestionData((prev: any) => {
    const newQuestionData = [...prev];
    newQuestionData[activeQuestion].questionText = newQuestionValue;
    return newQuestionData;
  });
};