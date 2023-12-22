interface QuestionInputProps {
  questionValue: string;
  handleQuestionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const questionInput = ({
  questionValue,
  handleQuestionChange,
}: QuestionInputProps) => {
  return (
    <textarea
      placeholder="Type here"
      className="block w-full text-2xl line-clamp-3 font-bold text-center px-4 py-4 rounded-xl overflow-y-auto"
      value={questionValue}
      rows={2}
      onChange={handleQuestionChange}
      style={{ resize: "none" }}
    />
  );
};

export default questionInput;
