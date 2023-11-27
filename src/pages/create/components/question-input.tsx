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
      className="input input-bordered input-lg w-full text-2xl line-clamp-3 font-bold text-center px-4 py-4 "
      value={questionValue}
      onChange={handleQuestionChange}
      style={{ resize: "none" }}
    />
  );
};

export default questionInput;
