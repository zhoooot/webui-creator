
import React, { useState } from "react";

interface QuestionInputProps {
  questionValue: string;
  handleQuestionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const QuestionInput = ({
  questionValue,
  handleQuestionChange,
}: QuestionInputProps) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleBlur = () => {
    if (questionValue.trim() === "") {
      setShowPopover(true);
    } else {
      setShowPopover(false);
    }
  };

  return (
    <div className="relative w-full items-center">
      <textarea
        placeholder="Type here"
        className="block w-full text-2xl line-clamp-3 font-bold text-center px-4 py-4 rounded-xl overflow-y-auto"
        value={questionValue}
        rows={2}
        onChange={(event) => {
          handleQuestionChange(event);
          handleBlur();
        }}
        onBlur={handleBlur}
        style={{ resize: "none" }}
      />
      {showPopover && (
        <div className="flex flex-col items-center w-full absolute -bottom-12">
          <div className="self-center items-center flex flex-col justify-center ">
            <svg className="self-center scale-105 text-primary-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 2"><path fill="currentColor" d="M1 21h22L12 2"/></svg>
            <div
              className="popover bg-primary-500 px-2 py-1 rounded-md text-white"
            >
              <p>You haven't added a question.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
