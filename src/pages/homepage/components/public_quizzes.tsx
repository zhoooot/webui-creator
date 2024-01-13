import { useEffect, useState } from "react";
import Layout from "../../global_components/layout";
import QuizCard from "./quiz_card";
import axios from "axios";
import IQuizData from "@/interface/IQuizData";
import Link from "next/link";
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import router from "next/router";

const PublicQuizzes: React.FC = () => {
  const [data, setData] = useState<IQuizData[] | null>(null);

  useEffect(() => {
    console.log("Fetching data for discover quiz");
    const fetchData = async () => {
      if (typeof window === "undefined") return;
      const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) {
        router.replace("/auth");
      }
      const endpoint = QUIZ_URL + "quiz/public?limit=9";
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
    };

    if (typeof window === "undefined") return;
    fetchData();
    
  }, []);

  if (data && data.length > 6) {
    data.splice(6, data.length - 6);
  }

  return (
    <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
      <div className="flex flex-row justify-between items-center w-full pb-4">
        <h1 className="text-xl font-bold">TOP ZHOOTS</h1>
        <button
          type="button"
          className="py-3 px-4 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Link href="/discover">Discover more</Link>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 grow w-full">
        {data && data.map((quiz, index) => (
          <QuizCard
            key={index}
            imageUrl={quiz.imageUrl}
            number={quiz.number}
            name={quiz.name}
            questionCount={quiz.questionCount}
            id={quiz.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicQuizzes;
