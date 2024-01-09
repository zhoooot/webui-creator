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
      const endpoint = QUIZ_URL + "/quiz/public?limit=9";
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
          imageUrl: quiz.image_url,
        };
        console.log("There is a quiz with data: ", quizData);
        quizzesData.push(quizData);
      }
      setData(result.data);
    };

    if (typeof window === "undefined") return;
    fetchData();
    
  }, []);

  const publicQuizzes = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 1,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 2,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 3,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 4,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 5,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 6,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 6,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 7,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 7,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 8,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 8,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 9,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 9,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 10,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 10,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 11,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 11,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 12,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 12,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 13,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 13,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 14,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 14,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 15,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 15,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 16,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 16,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 17,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 17,
      name: "Quiz Name",
      questionCount: 10,
    },
    {
      id: 18,
      imageUrl: "https://picsum.photos/1000/1000",
      number: 18,
      name: "Quiz Name",
      questionCount: 10,
    },
  ];
  // limit to 9 quizzes
  publicQuizzes.length = 6;
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
    </div>
  );
};

export default PublicQuizzes;
