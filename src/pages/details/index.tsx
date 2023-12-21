import { useState } from "react";
import {
  QuizImage,
  QuizTitle,
  QuizAuthor,
  QuizCreatedDate,
  QuizPublishedIcon,
} from "./components/quizinfo";
import QuestionCard from "./components/question-card";
import { Icon } from "@iconify/react";
import Action from "./components/actions";

const QuizDetailPage = () => {
  const [quiz, setQuiz] = useState({
    image_url: "https://picsum.photos/200/300",
    title: "What is the capital of France?",
    description: "Test your knowledge of the world with this quiz!",
    num_played: 100,
    updated_at: "1 hour ago",
    published: true,
    author: "John Doe",
    questions: [
      {
        question: "What is the capital of France?",
        options: [
          { text: "Paris", correct: true },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: false },
        ],
      },
      {
        question: "What is the capital of Ireland?",
        options: [
          { text: "Paris", correct: false },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: true },
        ],
      },
      {
        question: "What is the capital of Ireland?",
        options: [
          { text: "Paris", correct: false },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: true },
        ],
      },
      {
        question: "What is the capital of Ireland?",
        options: [
          { text: "Paris", correct: false },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: true },
        ],
      },
      {
        question: "What is the capital of Ireland?",
        options: [
          { text: "Paris", correct: false },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: true },
        ],
      },
      {
        question: "What is the capital of Ireland?",
        options: [
          { text: "Paris", correct: false },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: true },
        ],
      },
      {
        question: "What is the capital of Ireland?",
        options: [
          { text: "Paris", correct: false },
          { text: "London", correct: false },
          { text: "New York", correct: false },
          { text: "Dublin", correct: true },
        ],
      },
    ],
  });

  return (
    <div className="grid grid-cols-10 gap-4 p-8 bg-slate-100 rounded-2xl w-full h-screen">
      <div className="col-span-4 bg-white rounded-lg overflow-clip w-full h-full ">
        <QuizImage src={quiz.image_url} />
        <div className="h-full w-full p-6">
          <QuizTitle>{quiz.title}</QuizTitle>
          <div className="text-gray-500 mb-4">
            {quiz.description}
          </div>
          <div className="flex flex-row justify-between items-center h-10 mb-4">
            <div className="flex flex-col shrink-0">
              <div className="text-gray-500">{quiz.num_played} plays • Updated {quiz.updated_at}</div>
              <div className="flex flex-row gap-2">
                <QuizPublishedIcon published={quiz.published} />
                <QuizAuthor>{quiz.author}</QuizAuthor>
              </div>
            </div>
            <Action
              author={true}
              favorite={false}
              onClickDelete={() => {}}
              onClickEdit={() => {}}
              onClickFavorite={() => {}}
              onClickRename={() => {}}
              onClickReport={() => {}}
              onClickShare={() => {}}
            />
          </div>
          <button
            type="button"
            className="px-6 py-3.5 w-full text-base font-medium text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Start
          </button>
          <div className="flex flex-row justify-between items-center h-10"></div>
        </div>
      </div>
      <div className="col-span-6 flex flex-col gap-2 h-full overflow-y-auto">
        {quiz.questions.map((question, index) => (
          <QuestionCard
            key={index}
            questionNumber={index + 1}
            questionText={question.question}
            answerText={question.options[0].text}
            time={20}
            powerUps={true}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizDetailPage;
