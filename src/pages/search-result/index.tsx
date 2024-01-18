import { useEffect, useState } from "react";
import Layout from "../global_components/layout";
import QuizCard from "./components/quiz-card";
import axios from "axios";
import IQuizData from "@/interface/IQuizData";
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import router from "next/router";
import { useSearchParams } from 'next/navigation';

const SearchPage : React.FC = ()  => {
  const [data, setData] = useState<IQuizData[] | null>(null);

  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');

  console.log("Keyword is: ", keyword)

  useEffect(() => {
    console.log("Fetching data for discover quiz");
    const fetchData = async () => {
      if (typeof window === "undefined") return;
      const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) {
        router.replace("/auth");
      }
      const endpoint = QUIZ_URL + "quiz/public?limit=100";
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

      const filtered_quizzes = quizzesData.filter((quiz) => {
        if (keyword && quiz.name.toLowerCase().includes(keyword.toLowerCase())) {
          return true;
        }
      });

      setData(filtered_quizzes);
      // setData(result.data);
    };

    if (typeof window === "undefined") return;
    fetchData();
    
  }, [keyword]);

  return (
    <Layout show_search={true}>
      <div className="w-full h-full p-4">
        <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
          <h1 className="text-3xl font-bold pb-4">
            Found {data && data.length} quizzes
          </h1>
          {/* <button className="btn btn-wide">See more...</button> */}
          <div className="grid grid-cols-1 gap-4 w-full overflow-y-auto">
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

export default SearchPage;