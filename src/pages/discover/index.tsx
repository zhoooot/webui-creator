import { useEffect, useState } from "react";
import Layout from "../global_components/layout";
import QuizCard from "./components/quiz_card";
import axios from "axios";

const Discover: React.FC = () => {

  const [data, setData] = useState<IQuizData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/quiz";
      const tag = "discover";
      const result = await axios.get(url);
      setData(result.data);
    }
    fetchData();
  }, [])

  const quizData = [
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
  return (
    <Layout>
    <div className="w-full h-full p-4">
      <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
        <h1 className="text-3xl font-bold pb-4">DISCOVER</h1>
        {/* <button className="btn btn-wide">See more...</button> */}
        <div className="grid grid-cols-3 gap-4 grow w-full overflow-y-auto">
          {quizData.map((quiz) => (
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
    </div>
    </Layout>
  );
};

export default Discover;
