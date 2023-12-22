import React, { useState } from "react";
import UploadImage from "./components/upload-image";
import QuestionInput from "./components/question-input";
import Modal from "./components/modal";
import Card from "./components/card";
import AnswerButton from "./components/answer-button";
import Navbar from "./components/nav-bar";
import Toggle from "./components/toggle";
import TimeInput from "./components/time-input";
import { TIME } from "./components/time-input";

interface Question {
  questionNumber: number;
  questionText: string;
  answerTexts: Array<string>;
  correctAnswer: number;
  time: number;
  powerUps: boolean;
}

const QuizPage: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState<string>("Your Quiz Title");
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [questionData, setQuestionData] = useState<Array<Question>>([
    {
      questionNumber: 0,
      questionText: "What is the capital of France?",
      answerTexts: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    },
    {
      questionNumber: 1,
      questionText: "What is the capital of Frane?",
      answerTexts: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    },
    {
      questionNumber: 2,
      questionText: "What is the capital of Franc?",
      answerTexts: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    },
    {
      questionNumber: 3,
      questionText: "What is the capital of Frnce?",
      answerTexts: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    },
    {
      questionNumber: 4,
      questionText: "What is the capital of Fance?",
      answerTexts: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    },
    {
      questionNumber: 5,
      questionText: "What is the capital of Fance?",
      answerTexts: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    },
  ]);

  const [questionValue, setQuestionValue] = useState(
    questionData[0].questionText
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuestionValue = e.target.value;
    setQuestionValue(newQuestionValue);
    setQuestionData((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].questionText = newQuestionValue;
      return newQuestionData;
    });
  };

  const [isUpdateModalVisible, setUpdateModalVisible] =
    useState<boolean>(false);

  const handleUpdateModal = () => {
    setUpdateModalVisible(true);
  };

  const handleCloseModal = () => {
    setUpdateModalVisible(false);
  };

  const handleExitQuiz = () => {
    // Exit quiz
  };

  const handleSaveQuiz = () => {
    // Save quiz
  };

  const handleCreateQuestion = () => {
    const newQuestion: Question = {
      questionNumber: questionData.length,
      questionText: "",
      answerTexts: ["", "", "", ""],
      correctAnswer: 1,
      time: 0,
      powerUps: true,
    };
    setQuestionData((prev) => [...prev, newQuestion]);
    setActiveQuestion(questionData.length);
    setQuestionValue("");
  };

  const handleQuestionCardClick = (clickedQuestion: Question) => {
    setActiveQuestion(clickedQuestion.questionNumber);
    setQuestionValue(clickedQuestion.questionText);
    console.log(clickedQuestion);
  };
  const answerData = [
    {
      icon: "M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z",
      color: "red",
    },
    {
      icon: "M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z",
      color: "blue",
    },
    {
      icon: "M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z",
      color: "yellow",
    },
    {
      icon: "M7,7 L25,7 L25,25 L7,25 L7,7 Z",
      color: "green",
    },
  ];

  const handleAnswerChange = (id: number, text: string) => {
    setQuestionData((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].answerTexts[id] = text;
      return newQuestionData;
    });
  };

  return (
    <div className="flex flex-col h-screen relative">

    {/* Update Modal */}
    {isUpdateModalVisible && (
      <Modal />
    )}
      {/* Navbar */}
      <Navbar
        setQuizTitle={setQuizTitle}
        handleUpdateModal={handleUpdateModal}
      />
     
      <div className="bg-white flex flex-row grow border-gray-200 dark:bg-gray-800 overflow-y-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white grow w-64 h-full border-gray-200 dark:bg-gray-500 overflow-y-auto">
            <div className="flex flex-col flex-1 ">
              {questionData.map((question) => (
                <Card
                  key={question.questionNumber}
                  onClick={() => handleQuestionCardClick(question)}
                  index={question.questionNumber}
                  question={question.questionText}
                  answer={question.answerTexts[question.correctAnswer - 1]}
                  time={TIME[question.time]}
                  powerUps={question.powerUps}
                  activeIndex={activeQuestion}
                />
              ))}
            </div>
          </div>
          <div className="justify-center items-center h-16">
            <button
              className="py-3 px-4 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleCreateQuestion}
            >
              Create Question
            </button>
          </div>
        </div>
        
        <div className="bg-gray-300 w-screen flex flex-col border-gray-200 dark:bg-gray-500 px-6 py-6 gap-x-5 items-center">
         
          <QuestionInput
            questionValue={questionValue}
            handleQuestionChange={handleQuestionChange}
          />
          <div className="grid grid-cols-12 grow gap-5 justify-center items-center mb-10 mt-8 col-span-full">
            <div className="flex justify-center items-center col-span-3">
              <div className="w-24">
                <TimeInput
                  timeValue={questionData[activeQuestion].time}
                  handleTimeChange={(
                    event: React.ChangeEvent<HTMLSelectElement>
                  ) => {
                    const selectedTime = parseInt(event.target.value);
                    setQuestionData((prev) => {
                      const newQuestionData = [...prev];
                      newQuestionData[activeQuestion].time = selectedTime;
                      return newQuestionData;
                    });
                  }}
                />
              </div>
            </div>
            <div className="col-start-4 col-end-10 h-full">
              <UploadImage />
            </div>
            <div className="col-start-11 col-end-12">
              <Toggle />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 col-span-full w-full">
            {questionData[activeQuestion].answerTexts.map(
              (answer, answerId) => (
                <AnswerButton
                  key={answerId}
                  value={answer}
                  svg_icon={answerData[answerId].icon}
                  color={answerData[answerId].color}
                  onChange={(text) => handleAnswerChange(answerId, text)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
