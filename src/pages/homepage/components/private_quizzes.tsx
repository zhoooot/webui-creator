import { Icon } from "@iconify/react/dist/iconify.js";
import Layout from "../../global_components/layout";
import QuizCard from "./quiz_card";
import { useEffect, useState } from "react";
import axios from "axios";
import IQuizData from "@/interface/IQuizData";
import Link from "next/link";
import router from "next/router";
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { createNewQuiz } from "@/pages/create/logic/createNewQuiz";

const PrivateQuizzes: React.FC = () => {

  const [data, setData] = useState<IQuizData[] | null>(null);

  useEffect(() => {
    console.log("Fetching data for discover quiz");
    const fetchData = async () => {
      if (typeof window === "undefined") return;
      const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) {
        router.replace("/auth");
      }
      const endpoint = QUIZ_URL + "quiz?limit=9";
      console.log(endpoint);
      const result = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${jwt}`}});
      console.log(result.data);
      const quizzesData: IQuizData[] = [];
      for (let i = 0; i < result.data.length; i++) {
        const quiz = result.data[i];
        const quizData: IQuizData = {
          id: quiz.quiz_id,
          number: quiz.num_play_times,
          name: quiz.title,
          questionCount: quiz.num_questions,
          imageUrl: quiz.image,
        };
        console.log("There is a quiz with data: ", quizData);
        quizzesData.push(quizData);
      }
      setData(quizzesData);
      console.log("All the private quizzes are: ", quizzesData);
    };

    if (typeof window === "undefined") return;
    fetchData();
    
  }, []);

  return (
    <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
      <div className="flex flex-row justify-between items-center w-full pb-4">
        <h1 className="text-xl font-bold">MY ZHOOTS</h1>
        <Link href={'/'}>
          <button
            type="button"
            className="py-3 px-4 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={createNewQuiz}
          >
            <Icon icon="akar-icons:plus" className="w-4 h-4 mr-1" />
            Create
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 grow w-full">
        {data && data.map((quiz) => (
          <QuizCard
            key={quiz.id}
            imageUrl={quiz.imageUrl}
            number={quiz.number}
            name={quiz.name}
            questionCount={quiz.questionCount}
            id={quiz.id}
          />
        ))}
      </div>
      <button
        type="button"
        className="w-fit self-end py-3 px-4 mt-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-2xl border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <Link href="/my-library">See all</Link>
      </button>
    </div>
  );
};

export default PrivateQuizzes;
