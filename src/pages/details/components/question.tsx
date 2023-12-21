import { Icon } from "@iconify/react";
import { useState } from "react";


const Question = ({ question }: { question: any }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <h2 className="text-xl font-bold mb-2">{question.question}</h2>
      <ul className="grid grid-cols-2 gap-4">
        {question.options.map((option: any, index: number) => (
          <li key={index}>
            <label className="flex items-center">
              <input
                type="radio"
                name="question-option"
                value={option.text}
                checked={selectedOption === option.text}
                onChange={handleChange}
                className="mr-2"
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Question };