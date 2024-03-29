import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import { decode } from "@/helper/decode_jwt";
import router from "next/router";
import { TIME } from "../components/time-input";
import swal from 'sweetalert';
import axios from "axios";

export const handleExitQuiz = (
  quizTitle: string,
  description: string,
  visibility: string,
  quizImage: string,
  questionData: any,
  qid: string | undefined,
  router: any
) => {
  console.log("handleExitQuiz");
  swal({
    title: "Unsaved changes",
    text: "Do you want to save to a draft?",
    icon: "warning",
    buttons: ["No", "Yes"],
    dangerMode: true,
  }).then(async (response) => {
    if (response) {
        // Save to draft
        if (typeof window === "undefined") return;
        if (localStorage.getItem(JWT_LOCAL_STORAGE_KEY) === null)
          throw Error("JWT not found");
        const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
        const data = {
          quiz_id: qid,
          auth_id: decode(jwt!).sub,
          title: quizTitle || "Untitled Quiz",
          description: description || "",
          num_play_times: 0,
          is_public: visibility === "public",
          image: quizImage || "",
          questions: questionData.map((question: { questionText: any; answerTexts: any[]; correctAnswer: any; time: number; powerUps: any; }, index: any) => {
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
          }),
        };
    
        const url = QUIZ_URL + "draft";
        console.log("Sending ", data, " to ", url);
        const response = await axios.put(url, data, {headers: {Authorization: `Bearer ${jwt}`}});
        console.log(response);
        // router.push("/create/" + response.data.quiz_id);
        swal("Saved!", "Your quiz has been saved to a draft.", "success").then(() => {
          router.push("/my-library", { scroll: false });
        }
        );
      }
    else {
      swal(
        {
          title: "Are you sure?",
          text: "You will lose all your changes!",
          icon: "warning",
          buttons: ["Back to edit", "Just take me back"],
          dangerMode: true,

        }
      ).then((response) => {
        if (response) {
          router.push("/my-library", { scroll: false });
        }
      }
      );
    }
  }
  );
};
