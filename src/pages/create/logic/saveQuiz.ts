import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { decode } from "@/helper/decode_jwt";
import { TIME } from "../components/time-input";
import { Question } from "@/interface/IQuestion";
import swal from "sweetalert";
import axios from "axios";

export const handleSaveQuiz = async (
  handleMessageErrors: boolean,
  isDraft: boolean,
  quizTitle: string,
  description: string,
  visibility: string,
  questionData: Question[],
  quizImage: string,
  qid: string | undefined,
  router: any
) => {
  console.log("handleSaveQuizNew");
  if (!handleMessageErrors) {
    return;
  }
  console.log("handleSaveQuiz");
  if (false) {
    console.log("Nothing changed");
    return;
  }
  try {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(JWT_LOCAL_STORAGE_KEY) === null)
      throw Error("JWT not found");
    const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    let data = {
      auth_id: decode(jwt!).sub,
      title: quizTitle || "Untitled Quiz",
      description: description,
      quiz_id: qid,
      num_play_times: 0,
      is_public: visibility === "public",
      created_at: new Date().toISOString(),
      image: quizImage,
      questions: questionData.map(
        (
          question: {
            questionText: any;
            answerTexts: any[];
            correctAnswer: any;
            time: number;
            powerUps: any;
          },
          index: any
        ) => {
          return {
            index: index,
            question: question.questionText,
            answers: question.answerTexts.map((answer, index) => {
              return {
                index: index,
                answer: answer,
                is_correct: question.correctAnswer === index,
              };
            }),
            time_limit: TIME[question.time] * 1000,
            allow_powerups: question.powerUps,
          };
        }
      ),
    };
    const url = QUIZ_URL + "draft";
    
    console.log('Saved quiz with data ', data);

    const response = await axios.put(url, data);
    console.log('Save quiz response ', response);
    // router.push("/create/" + response.data.quiz_id);
    // SAVE QUIZ HEREEEEEEEEEEEEEEEEEEEEEEEEEE
    swal("Quiz saved!", "Your quiz has been saved.", "success").then(() => {
      router.push("/my-library", { scroll: false });
    });
  } catch (error) {
    console.log(error);
    window.alert("Error saving quiz!");
  }
};
