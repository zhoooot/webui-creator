import React, { useEffect, useState } from "react";
import UploadImage from "./components/upload-image";
import QuestionInput from "./components/question-input";
import Modal from "./components/modal";
import Card from "./components/card";
import AnswerButton from "./components/answer-button";
import Navbar from "./components/nav-bar";
import Toggle from "./components/toggle";
import TimeInput from "./components/time-input";
import { TIME } from "./components/time-input";
import { handleSaveQuiz } from "../tmp/redux/actions";
import { useRouter } from 'next/navigation'
import router, { Router } from "next/router";

interface Question {
  questionNumber: number;
  questionText: string;
  answerTexts: Array<string>;
  correctAnswer: number;
  time: number;
  powerUps: boolean;
}

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

const EmptyQuiz = {
  title: "",
  description: "",
  visibility: "private",
  quizImage: "",
  questions: [
    {
      questionNumber: 1,
      questionText: "",
      answerTexts: ["", "", "", ""],
      correctAnswer: -1,
      time: 5,
      powerUps: true,
    },
  ],
};

const QuizPage: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [quizImage, setQuizImage] = useState("");

  const [showMissingCorrectAnswerPopover, setShowMissingCorrectAnswerPopover] = useState(false);
  const [showMissingQuestionPopover, setShowMissingQuestionPopover] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const router = useRouter();

  const [isDraft, setIsDraft] = useState(false);

  const [activeQuestion, setActiveQuestion] = useState<number>(0);

  const [questionData, setQuestionData] = useState<Array<Question>>([{
    questionNumber: 0,
    questionText: "",
    answerTexts: ["", "", "", ""],
    correctAnswer: -1,
    time: 0,
    powerUps: true,
  }
  ]);

  
  const [questionValue, setQuestionValue] = useState(questionData[0].questionText);

  useEffect(() => {
    console.log("useEffect");
    if (quizTitle.trim() !== "") {
      setIsDraft(true);
      return;
    }
    if (description.trim() !== "") {
      setIsDraft(true);
      return;
    }
    if (quizImage.trim() !== "") {
      setIsDraft(true);
      return;
    }
    if (visibility.trim() !== "private") {
      setIsDraft(true);
      return;
    }
    if (questionData.length !== 1) {
      setIsDraft(true);
      return;
    } else {
      try {
        const only_question = questionData[0];
        if (only_question.questionText.trim() !== "") {
          setIsDraft(true);
          return;
        }
        for (let i = 0; i < only_question.answerTexts.length; i++) {
          if (only_question.answerTexts[i].trim() !== "") {
            setIsDraft(true);
            return;
          }
        }
        if (only_question.correctAnswer !== -1) {
          setIsDraft(true);
          return;
        }
        if (only_question.time !== 0) {
          setIsDraft(true);
          return;
        }
        if (only_question.powerUps !== true) {
          setIsDraft(true);
          return;
        }
      } catch (e: any) {
        console.log(e);
      }
    }
  }, [quizTitle, description, visibility, quizImage, questionData]);

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (!isDraft) return;
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [isDraft]);

  const handleQuizDetailChange = (
    title: string,
    description: string,
    visibility: string,
    quizImage: string
  ) => {
    console.log("handleQuizDetailChange");
    setQuizTitle(title);
    setDescription(description);
    setVisibility(visibility);
    setQuizImage(quizImage);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuestionValue = e.target.value;
    setQuestionValue(newQuestionValue);
    setQuestionData((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].questionText = newQuestionValue;
      return newQuestionData;
    });
  };

  const handleUpdateModal = () => {
    setUpdateModalVisible(true);
  };

  const handleCloseModal = () => {
    setUpdateModalVisible(false);
  };

  const handleCreateQuestion = () => {
    if (!handleMessageErrors()) {
      return;
    }
    const newQuestion: Question = {
      questionNumber: questionData?.length,
      questionText: "",
      answerTexts: ["", "", "", ""],
      correctAnswer: -1,
      time: 5,
      powerUps: true,
    };
    setQuestionData([...questionData, newQuestion]);
    setActiveQuestion(questionData?.length);
    setQuestionValue("");
  };

  const handeDuplicateQuestion = (questionNumber: number) => {
    const newQuestion: Question = {
      questionNumber: questionData?.length,
      questionText: questionData[questionNumber]?.questionText,
      answerTexts: questionData[questionNumber]?.answerTexts,
      correctAnswer: questionData[questionNumber]?.correctAnswer,
      time: questionData[questionNumber]?.time,
      powerUps: questionData[questionNumber]?.powerUps,
    };
    setQuestionData([...questionData, newQuestion]);
  };

  const handleDeleteQuestion = (questionNumber: number) => {
    if (questionData.length === 1) {
      window.alert("Your quiz must have at least a question.");
      return;
    }

    let check = true;
    if (activeQuestion != questionNumber) {
      check = false;
    }
    if (activeQuestion > questionNumber) {
      setActiveQuestion(activeQuestion - 1);
    } else if (
      questionNumber === questionData?.length - 1 &&
      activeQuestion === questionNumber
    ) {
      setActiveQuestion(activeQuestion - 1);
    }
    console.log("deleted question: " + questionNumber);
    console.log(activeQuestion);
    setQuestionData((prev) => {
      const newQuestionData = [...prev];
      newQuestionData.splice(questionNumber, 1);
      return newQuestionData;
    });

    if (check) {
      if (activeQuestion >= questionData?.length - 1) {
        setQuestionValue(questionData[activeQuestion - 1]?.questionText);
      } else {
        // if (activeQuestion)
        setQuestionValue(questionData[activeQuestion + 1]?.questionText);
      }
    }
  };

  const handleQuestionCardClick = (clickedQuestionIndex: number) => {
    if (clickedQuestionIndex !== activeQuestion) {
      if (!handleMessageErrors()) {
        return;
      }

    }
    setActiveQuestion(clickedQuestionIndex);
    setQuestionValue(questionData[clickedQuestionIndex].questionText);
  };

  const handleAnswerChange = (id: number, text: string) => {
    setQuestionData((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].answerTexts[id] = text;
      return newQuestionData;
    });
  };

  const handleCorrectAnswerChange = (id: number) => {
    console.log("correct answer: " + id);
    setShowMissingCorrectAnswerPopover(false);
    setQuestionData((prev) => {
      const newQuestionData = [...prev];
      newQuestionData[activeQuestion].correctAnswer = id;
      return newQuestionData;
    });
  };

  const handleSaveQuiz = () => {
    if (!handleMessageErrors()) {
      return;
    }
    // SAVE QUIZ HEREEEEEEEEEEEEEEEEEEEEEEEEEE
    router.push('/my-library', { scroll: false })
  }

  const handleExitQuiz = () => {
    if (!handleMessageErrors()) {
      return;
    }
    
    const response = window.confirm("You have unsaved changes. Do you want to save it to draft?");
    if (response) {
      // Save to draft
    }
    // Exit quiz, navigate to home
    router.push('/my-library', { scroll: false })
  }

  const handleMessageErrors = () => {
    if (handleMissingCorrectAnswer() || handleMissingQuestion()) {
      return false;
    }
    return true;
  };

  const handleMissingQuestion = () => {
    if (questionValue.trim() === "") {
      setShowMissingQuestionPopover(true);
      return true;
    } else {
      setShowMissingQuestionPopover(false);
      return false;
    }
  };

  const handleMissingCorrectAnswer = () => {
    if (questionData[activeQuestion].correctAnswer === -1) {
      setShowMissingCorrectAnswerPopover(true);
      return true;
    } else {
      setShowMissingCorrectAnswerPopover(false);
      return false;
    }
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* Update Modal */}
      {isUpdateModalVisible && (
        <Modal
          handleCloseModal={handleCloseModal}
          title={quizTitle}
          description={description}
          visibility={visibility}
          imageUrl={quizImage}
          handleSaveModal={handleQuizDetailChange}
        />
      )}
      {/* Navbar */}
      <Navbar
        title={quizTitle}
        setQuizTitle={setQuizTitle}
        handleUpdateModal={handleUpdateModal}
        handleSaveQuiz={handleSaveQuiz}
        handleExitQuiz={handleExitQuiz}
      />

      <div className="bg-white flex flex-row grow border-gray-200 dark:bg-gray-800 overflow-y-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white grow w-64 h-full border-gray-200 dark:bg-gray-500 overflow-y-auto">
            <div className="flex flex-col flex-1 ">
              {questionData?.map((question, index) => (
                <Card
                  key={index}
                  onClick={(questionIndex) =>
                    handleQuestionCardClick(questionIndex)
                  }
                  index={index}
                  question={question.questionText}
                  answer={question.correctAnswer === -1 ? "Correct answer" : question.answerTexts[question.correctAnswer]}
                  time={TIME[question.time]}
                  powerUps={question.powerUps}
                  activeIndex={activeQuestion}
                  duplicate={handeDuplicateQuestion}
                  delete={handleDeleteQuestion}
                  missingCorrectAnswer={question.correctAnswer === -1}
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
          
    <div className="relative w-full items-center">
          <QuestionInput
            questionValue={questionValue}
            handleQuestionChange={handleQuestionChange}
          />
          {showMissingQuestionPopover && (
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

          <div className="grid grid-cols-12 grow gap-5 justify-center items-center mb-10 mt-8 col-span-full">
            <div className="flex justify-center items-center col-span-3">
              <div className="w-24">
                <TimeInput
                  timeValue={questionData[activeQuestion]?.time}
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
              <Toggle
                checked={questionData[activeQuestion]?.powerUps}
                onChange={(value) => {
                  setQuestionData((prev) => {
                    const newQuestionData = [...prev];
                    newQuestionData[activeQuestion].powerUps =
                      value.target.checked;
                    return newQuestionData;
                  });
                }}
              />
            </div>
          </div>

          <div className="flex flex-row justify-center w-full relative">
            {showMissingCorrectAnswerPopover && (
              <div className="flex flex-col items-center w-full absolute -top-12">
                <div className="self-center items-center flex flex-col justify-center ">
                  <div className="popover bg-primary-500 px-2 py-1 rounded-md text-white">
                    <p>You haven&apos;t selected at least one right answer.</p>
                  </div>
                  <svg
                    className="rotate-180 self-center scale-105 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 2"
                  >
                    <path fill="currentColor" d="M1 21h22L12 2" />
                  </svg>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-8 col-span-full w-full">
              {questionData[activeQuestion]?.answerTexts.map(
                (answer: string, answerId: number) => (
                  <AnswerButton
                    key={answerId}
                    answerId={answerId}
                    value={answer}
                    svg_icon={answerData[answerId].icon}
                    color={answerData[answerId].color}
                    onChange={(text) => handleAnswerChange(answerId, text)}
                    onSelected={(key) => handleCorrectAnswerChange(key)}
                    isSelected={
                      questionData[activeQuestion]?.correctAnswer === answerId
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
