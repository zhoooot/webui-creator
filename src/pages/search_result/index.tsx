import { useEffect, useState } from "react";
import Layout from "../global_components/layout";
import QuizCard from "./components/quiz-card";
import axios from "axios";
import IQuizData from "@/interface/IQuizData";
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import router from "next/router";

const Discover: React.FC = () => {
  const [data, setData] = useState<IQuizData[] | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    console.log("Fetching data for discover quiz");
    const fetchData = async () => {
      if (typeof window === "undefined") return;
      const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) {
        router.replace("/auth");
      }
      const endpoint = QUIZ_URL + `/quiz/public?limit=100`;
      console.log(endpoint);
      const result = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
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

      const filtered_quizzes = quizzesData.filter((quiz) => {
        const keys = keyword.split(" ");
        for (let i = 0; i < keys.length; i++) {
          if (quiz.name.toLowerCase().includes(keys[i].toLowerCase())) {
            return true;
          }
        }
      });

      setData(filtered_quizzes);
      // setData(result.data);
    };

    if (typeof window === "undefined") return;
    const localData = localStorage.getItem("discover");
    if (localData) {
      const parsed = JSON.parse(localData);
      if (parsed.expire < Date.now()) {
        fetchData();
      } else {
        setData(parsed.data);
      }
    } else {
      fetchData();
    }
    
  }, [keyword]);

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
    <Layout show_search={true}>
      <div className="w-full h-full p-4">
        <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
          <h1 className="text-3xl font-bold pb-4">
            Found {quizData.length} quizzes
          </h1>
          {/* <button className="btn btn-wide">See more...</button> */}
          <div className="grid grid-cols-1 gap-4 grow w-full overflow-y-auto">
            {data && data.map((quiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.name}
                image_url={quiz.imageUrl}
                updated_at={"1 day ago"}
                published={true}
                author={"Author"}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
