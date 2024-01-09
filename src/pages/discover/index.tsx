import { useEffect, useState } from "react";
import Layout from "../global_components/layout";
import QuizCard from "./components/quiz_card";
import axios from "axios";
import IQuizData from "@/interface/IQuizData";
import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { decode } from "@/helper/decode_jwt";
import router from "next/router";

const Discover: React.FC = () => {
  const [data, setData] = useState<IQuizData[] | null>(null);

  useEffect(() => {
    console.log("Fetching data for discover quiz");
    const fetchData = async () => {
      if (typeof window === "undefined") return;
      const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
      if (!jwt) {
        router.replace("/auth");
      }
      const endpoint = QUIZ_URL + `quiz/public`;
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
      const data_with_expire = {
        data: quizzesData,
        expire: Date.now() + 1000 * 60 * 10,
      };
      if (typeof window !== "undefined") {
        localStorage.removeItem("discover");
        localStorage.setItem("discover", JSON.stringify(data_with_expire));
      }
      setData(quizzesData);
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
    
  }, []);

  return (
    <Layout show_search={true}>
      <div className="w-full h-full p-4">
        <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
          <h1 className="text-3xl font-bold pb-4">DISCOVER</h1>
          {/* <button className="btn btn-wide">See more...</button> */}
          <div className="grid grid-cols-3 gap-4 w-full overflow-y-auto">
            {data &&
              data.map((quiz) => (
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
