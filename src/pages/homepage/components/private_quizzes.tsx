import { Icon } from "@iconify/react/dist/iconify.js";
import Layout from "../../global_components/layout";
import QuizCard from "./quiz_card";
import { useEffect, useState } from "react";
import axios from "axios";
import IQuizData from "@/interface/IQuizData";
import Link from "next/link";

const PrivateQuizzes: React.FC = () => {

  const [data, setData] = useState<IQuizData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/quiz";
        const tag = "discover";
        const result = await axios.get(url);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const privateQuizzes = [
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
  privateQuizzes.length = 6;
  return (
    <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
      <div className="flex flex-row justify-between items-center w-full pb-4">
        <h1 className="text-xl font-bold">MY ZHOOTS</h1>
        <Link href="/create">
          <button
            type="button"
            className="py-3 px-4 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Icon icon="akar-icons:plus" className="w-4 h-4 mr-1" />
            Create
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 grow w-full">
        {privateQuizzes.map((quiz) => (
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
