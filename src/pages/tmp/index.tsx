import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "./components/upload-image";
import QuestionInput from "./components/question-input";
import Modal from "./components/modal";
import Card from "./components/card";
import AnswerButton from "./components/answer-button";
import Navbar from "./components/nav-bar";
import Toggle from "./components/toggle";
import TimeInput from "./components/time-input";
import { TIME } from "./components/time-input";
import {
  setQuizTitle,
  setActiveQuestion,
  setQuestionData,
  setQuestionValue,
  setUpdateModalVisible,
  handleExitQuiz,
  handleSaveQuiz,
  handleCreateQuestion,
  handleDuplicateQuestion,
  handleDeleteQuestion,
  handleQuestionCardClick,
  handleAnswerChange,
} from "./redux/actions";
import { RootState } from "./redux/store";

interface Question {
  questionNumber: number;
  questionText: string;
  answerTexts: Array<string>;
  correctAnswer: number;
  time: number;
  powerUps: boolean;
}

const QuizPage: React.FC = () => {
  const dispatch = useDispatch();
  const quizTitle = useSelector((state: RootState) => state.quizTitle);
  const activeQuestion = useSelector((state: RootState) => state.activeQuestion);
  const questionData = useSelector((state: RootState) => state.questionData);
  const questionValue = useSelector((state: RootState) => state.questionValue);
  const isUpdateModalVisible = useSelector((state: RootState) => state.isUpdateModalVisible);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuestionValue = e.target.value;
    dispatch(setQuestionValue(newQuestionValue));
    dispatch((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].questionText = newQuestionValue;
      return setQuestionData(newQuestionData);
    });
  };

  const handleUpdateModal = () => {
    dispatch(setUpdateModalVisible(true));
  };

  const handleCloseModal = () => {
    dispatch(setUpdateModalVisible(false));
  };

  const handleExitQuiz = () => {
    dispatch(handleExitQuiz());
  };

  const handleSaveQuiz = () => {
    dispatch(handleSaveQuiz());
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
    dispatch(setQuestionData([...questionData, newQuestion]));
    dispatch(setActiveQuestion(questionData.length));
    dispatch(setQuestionValue(""));
  };

  const handeDuplicateQuestion = (questionNumber: number) => {
    const newQuestion: Question = {
      questionNumber: questionData.length,
      questionText: questionData[questionNumber].questionText,
      answerTexts: questionData[questionNumber].answerTexts,
      correctAnswer: questionData[questionNumber].correctAnswer,
      time: questionData[questionNumber].time,
      powerUps: questionData[questionNumber].powerUps,
    };
    dispatch(setQuestionData([...questionData, newQuestion]));
  };

  const handleDeleteQuestion = (questionNumber: number) => {
    let check = true;
    if (activeQuestion > questionNumber) {
      dispatch(setActiveQuestion(activeQuestion - 1));
      check = false;
    } else if (questionNumber === questionData.length - 1) {
      dispatch(setActiveQuestion(activeQuestion - 1));
      check = false;
    }
    console.log("deleted question: " + questionNumber);
    console.log(activeQuestion);
    dispatch((prev) => {
      const newQuestionData = [...prev];
      newQuestionData.splice(questionNumber, 1);
      return setQuestionData(newQuestionData);
    });
    if (check) {
      dispatch(setActiveQuestion(activeQuestion));
      if (activeQuestion >= questionData.length - 3) {
        dispatch(setQuestionValue(questionData[activeQuestion - 1].questionText));
      } else dispatch(setQuestionValue(questionData[activeQuestion + 1].questionText));
    }
  };

  const handleQuestionCardClick = (clickedQuestionIndex: number) => {
    dispatch(setActiveQuestion(clickedQuestionIndex));
    dispatch(setQuestionValue(questionData[clickedQuestionIndex].questionText));
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
    dispatch((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].answerTexts[id] = text;
      return setQuestionData(newQuestionData);
    });
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* Update Modal */}
      {isUpdateModalVisible && <Modal />}
      {/* Navbar */}
      <Navbar
        setQuizTitle={setQuizTitle}
        handleUpdateModal={handleUpdateModal}
      />

      <div className="bg-white flex flex-row grow border-gray-200 dark:bg-gray-800 overflow-y-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white grow w-64 h-full border-gray-200 dark:bg-gray-500 overflow-y-auto">
            <div className="flex flex-col flex-1 ">
              {questionData.map((question, index) => (
                <Card
                  onClick={(questionIndex) =>
                    handleQuestionCardClick(questionIndex)
                  }
                  index={index}
                  question={question.questionText}
                  answer={question.answerTexts[question.correctAnswer - 1]}
                  time={TIME[question.time]}
                  powerUps={question.powerUps}
                  activeIndex={activeQuestion}
                  duplicate={handeDuplicateQuestion}
                  delete={handleDeleteQuestion}
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
                    dispatch((prev) => {
                      const newQuestionData = [...prev];
                      newQuestionData[activeQuestion].time = selectedTime;
                      return setQuestionData(newQuestionData);
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
