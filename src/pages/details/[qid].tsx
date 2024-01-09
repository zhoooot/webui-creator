import { useEffect, useState } from "react";
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
import Layout from "../global_components/layout";
import axios from "axios";
import { IQuizDetail } from "@/interface/IQuizDetail";
import { useRouter } from 'next/router'
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { parseQuiz } from "@/helper/parse_quiz";

const QuizDetailPage = () => {
  const user = {
    id: "7070afde-f8b5-487e-a288-f2be9d162b0b",
    username: "John Doe",
  }

  const router = useRouter();
  const qid = router.query.qid;
  console.log(qid);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (qid == "") {
      router.replace("/404");
    }
    const fetchDetails = async () => {
      const url = QUIZ_URL + `/quiz/${qid}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem(JWT_LOCAL_STORAGE_KEY)}` } } );
      const result : IQuizDetail = parseQuiz(response.data);
      console.log(response.data);
      console.log("Receive the quiz detail: ", result);
      setQuiz(result);
    }
    fetchDetails();
  }, [qid, router]);

  const [quiz, setQuiz] = useState<IQuizDetail>({
    id: "c22fb2a5-ccb9-493a-9c16-68848ef76345",
    image_url: "https://picsum.photos/1000/1000",
    title: "What is the capital of France?",
    description: "Test your knowledge of the world with this quiz!",
    num_played: 100,
    updated_at: "1 hour ago",
    published: true,
    author: "John Doe",
    authorId: "7070afde-f8b5-487e-a288-f2be9d162b0b",
    is_reported: false,
    questions: [
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
      {
        question: "What is the capital of France?",
        options: [
          { id: 0, text: "Paris", correct: true },
          { id: 1, text: "London", correct: false },
          { id: 2, text: "New York", correct: false },
          { id: 3, text: "Dublin", correct: false },
        ],
        time: 10,
        powerUps: true,
      },
    ],
   
  });

  const handleAppeal = async () => {
    console.log("Handling appeal");
    // const url = "/api/appeal";
    // await axios.post(url, { id: quiz.id });
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url = "/api/quiz";
  //     const tag = "discover";
  //     const result : IQuizDetail = await axios.get(url);
  //     setQuiz(result);
  //   }
  //   fetchData();
  // }, [])

  return (
    <Layout>
      <div className="grid grid-cols-10 gap-4 p-4 bg-primary-500 rounded-2xl w-full h-full">
        <div className="col-span-4 bg-white rounded-lg overflow-clip w-full h-full ">
          <div className="flex flex-col justify-between h-full items-center">
            <QuizImage src={quiz.image_url} />
            <div className="h-full w-full p-6">
              <QuizTitle>{quiz.title}</QuizTitle>
              <div className="text-gray-500 mb-4">{quiz.description}</div>
              <div className="flex flex-row justify-between items-center h-10 mb-4">
                <div className="flex flex-col shrink-0">
                  <div className="text-gray-500">
                    {quiz.num_played} plays • Updated {quiz.updated_at}
                  </div>
                  <div className="flex flex-row gap-2">
                    <QuizPublishedIcon published={quiz.published} />
                    <QuizAuthor>{quiz.author}</QuizAuthor>
                  </div>
                </div>
                <Action
                  author={user.id === quiz.authorId}
                  favorite={false}
                  onClickDelete={() => {}}
                  onClickEdit={() => {router.replace(`/create/${qid}`)}}
                  onClickFavorite={() => {}}
                  onClickRename={() => {}}
                  onClickReport={() => {
                    console.log("report");
                    const userResponse = window.confirm("Are you sure you want to report this quiz?");
                    if (userResponse) {
                      alert("Quiz reported!");
                    }
                  }}
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
            {(quiz.is_reported) ? (
            <div className="w-full bg-red-500 flex flex-row items-center justify-center">
              <div className="font-bold text-white text-lg p-4 text-center "> Your quiz was reported!</div>
              <button className="btn btn-active"
                onClick={() => {
                  const userResponse = window.confirm("Are you sure you want to appeal this report?");
                  if (userResponse)
                    handleAppeal();
                }
                }
              >
                Appeal Now
              </button>
            </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-span-6 flex flex-col gap-2 overflow-y-auto h-full">
          {quiz?.questions?.map((question, index) => (
            <QuestionCard
              key={index}
              questionNumber={index + 1}
              questionText={question.question}
              answerText={question.options[0].text}
              time={question.time}
              powerUps={question.powerUps}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default QuizDetailPage;
