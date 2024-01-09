export const handleQuizDetailChange = (title: string, description: string, visibility: string, quizImage: string, setQuizTitle: (data: any) => void, setDescription: (data: any) => void, setVisibility: (data: any) => void, setQuizImage: (data: any) => void) => {
  console.log("handleQuizDetailChange");
  setQuizTitle(title);
  setDescription(description);
  setVisibility(visibility);
  setQuizImage(quizImage);
}