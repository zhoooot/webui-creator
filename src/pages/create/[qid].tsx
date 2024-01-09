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
import { useRouter } from "next/router";
import { CreateDumpData } from "@/data_dump/CreateDumpData";
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { decode } from "@/helper/decode_jwt";
import axios from "axios";
import { parseQuiz } from "@/helper/parse_quiz";
import { IQuizDetail } from "@/interface/IQuizDetail";
import * as logic from "./logic/logic";

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

const QuizPage: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [quizImage, setQuizImage] = useState("");
  const [showMissingCorrectAnswerPopover, setShowMissingCorrectAnswerPopover] =
    useState(false);
  const [showMissingQuestionPopover, setShowMissingQuestionPopover] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [questionData, setQuestionData] =
    useState<Array<Question>>(CreateDumpData);
  const [questionValue, setQuestionValue] = useState(
    questionData[0].questionText
  );
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const router = useRouter();
  const { qid } = router.query;

  console.log("Detail edit quiz ", qid);

  useEffect(() => {
    const action = async () => {
      try {
        if (!qid) throw Error("qid is null");
        const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
        if (!jwt) {
          router.replace("/auth");
          return;
        }
        const decoded = decode(jwt);
        if (decoded.role !== "user") {
          router.replace("/auth");
          return;
        }
        const url = QUIZ_URL + `quiz/${qid}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
        const result: IQuizDetail = await parseQuiz(response.data);
        console.log("Receive the quiz detail: ", result);
        const { questions } = result;
        const questionsData: Question[] = [];
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          const questionData: Question = {
            questionNumber: i,
            questionText: question.question,
            answerTexts: question.options.map((option) => option.text),
            correctAnswer: question.options.findIndex(
              (option) => option.correct
            ),
            time: question.time,
            powerUps: question.powerUps,
          };
          questionsData.push(questionData);
        }
        setQuizTitle(result.title);
        setDescription(result.description);
        setVisibility(result.published ? "public" : "private");
        setQuizImage(result.image_url);
        setQuestionData(questionsData);
        setQuestionValue(questionsData[0].questionText);
      } catch (e) {
        console.log(e);
      }
    };
    action();
  }, [qid, router]);

  // if (qid === null) {
  //   return (
  //     <div className="flex flex-col justify-center items-center h-full">
  //       <div className="text-3xl text-white font-bold">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-screen relative">
      {/* Update Modal */}
      {isUpdateModalVisible && (
        <Modal
          handleCloseModal={() => logic.handleCloseModal(setUpdateModalVisible)}
          title={quizTitle}
          description={description}
          visibility={visibility}
          imageUrl={quizImage}
          handleSaveModal={() =>
            logic.handleQuizDetailChange(
              quizTitle,
              description,
              visibility,
              quizImage,
              setQuizTitle,
              setDescription,
              setVisibility,
              setQuizImage
            )
          }
        />
      )}
      {/* Navbar */}
      <Navbar
        title={quizTitle}
        setQuizTitle={setQuizTitle}
        handleUpdateModal={() => logic.handleUpdateModal(setUpdateModalVisible)}
        handleSaveQuiz={() => logic.handleSaveQuiz(
          logic.handleMessageErrors(
            questionValue,
            questionData,
            activeQuestion,
            setShowMissingQuestionPopover,
            setShowMissingCorrectAnswerPopover
          ),
          false,
          quizTitle,
          description,
          visibility,
          questionData,
          quizImage,
          router
        )}
          
        handleExitQuiz={() =>
          logic.handleExitQuiz(
            quizTitle,
            description,
            visibility,
            quizImage,
            questionData,
            router
          )
        }
      />

      <div className="bg-white flex flex-row grow border-gray-200 dark:bg-gray-800 overflow-y-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white grow w-64 h-full border-gray-200 dark:bg-gray-500 overflow-y-auto">
            <div className="flex flex-col flex-1 ">
              {questionData.map((question, index) => (
                <Card
                  key={index}
                  onClick={(questionIndex) =>
                    logic.handleQuestionCardClick(
                      questionIndex,
                      questionData,
                      activeQuestion,
                      setActiveQuestion,
                      setQuestionValue,
                      logic.handleMessageErrors(
                        questionValue,
                        questionData,
                        activeQuestion,
                        setShowMissingQuestionPopover,
                        setShowMissingCorrectAnswerPopover
                      ),
                    )
                  }
                  index={index}
                  question={question.questionText}
                  answer={
                    question.correctAnswer === -1
                      ? "<missing>"
                      : question.answerTexts[question.correctAnswer]
                  }
                  time={TIME[question.time]}
                  powerUps={question.powerUps}
                  activeIndex={activeQuestion}
                  duplicate={() =>
                    logic.handeDuplicateQuestion(
                      questionData[activeQuestion].questionNumber,
                      questionData,
                      setQuestionData
                    )
                  }
                  delete={() =>
                    logic.handleDeleteQuestion(
                      questionData[activeQuestion].questionNumber,
                      activeQuestion,
                      questionData,
                      setActiveQuestion,
                      setQuestionData,
                      setQuestionValue
                    )
                  }
                  missingCorrectAnswer={question.correctAnswer === -1}
                />
              ))}
            </div>
          </div>
          <div className="justify-center items-center h-16">
            <button
              className="py-3 px-4 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() =>
                logic.handleCreateQuestion(
                  questionData,
                  setQuestionData,
                  setActiveQuestion,
                  setQuestionValue
                )
              }
            >
              Create Question
            </button>
          </div>
        </div>

        <div className="bg-gray-300 w-screen flex flex-col border-gray-200 dark:bg-gray-500 px-6 py-6 gap-x-5 items-center">
          <QuestionInput
            questionValue={questionValue}
            handleQuestionChange={(e) =>
              logic.handleQuestionChange(
                e,
                setQuestionValue,
                setQuestionData,
                activeQuestion
              )
            }
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
              <Toggle
                checked={questionData[activeQuestion].powerUps}
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
              {questionData[activeQuestion].answerTexts.map(
                (answer: string, answerId: number) => (
                  <AnswerButton
                    key={answerId}
                    answerId={answerId}
                    value={answer}
                    svg_icon={answerData[answerId].icon}
                    color={answerData[answerId].color}
                    onChange={(text) =>
                      logic.handleAnswerChange(
                        answerId,
                        text,
                        activeQuestion,
                        setQuestionData
                      )
                    }
                    onSelected={(key) =>
                      logic.handleCorrectAnswerChange(
                        key,
                        activeQuestion,
                        setShowMissingCorrectAnswerPopover,
                        setQuestionData
                      )
                    }
                    isSelected={
                      questionData[activeQuestion].correctAnswer === answerId
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
