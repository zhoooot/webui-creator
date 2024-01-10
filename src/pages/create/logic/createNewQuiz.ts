import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { decode } from "@/helper/decode_jwt";
import axios from "axios";
import router from "next/router";

export const createNewQuiz = async () => {
  console.log("createNewQuiz");
  // Save to draft
  if (typeof window === "undefined") return;
  if (localStorage.getItem(JWT_LOCAL_STORAGE_KEY) === null)
    throw Error("JWT not found");
  const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  const data = {
    auth_id: decode(jwt!).sub,
    title: "Untitled Quiz",
    is_public: false,
    questions: [
      {
        index: 0,
        question: "",
        answers: [
          {
            index: 0,
            answer: "",
            is_correct: false,
          },
          {
            index: 1,
            answer: "",
            is_correct: false,
          },
          {
            index: 2,
            answer: "",
            is_correct: false,
          },
          {
            index: 3,
            answer: "",
            is_correct: false,
          },
        ],
        time_limit: 5000,
        allow_powerups: false,
      },
    ],
  };
  
  const url = QUIZ_URL + "draft";
  console.log("Sending ", data, " to ", url);
  const response = await axios.put(url, data, {headers: {Authorization: `Bearer ${jwt}`}});
  const qid = response.data.quiz_id;
  console.log(qid);
  router.push("/create/" + qid + "?state=draft");
}