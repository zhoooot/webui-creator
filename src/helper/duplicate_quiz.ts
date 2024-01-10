import { JWT_LOCAL_STORAGE_KEY, QUIZ_URL } from "@/config";
import swal from "sweetalert";
import axios from "axios";

export const duplicateQuiz = async (
  quiz_id: string,
) => {
  try {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(JWT_LOCAL_STORAGE_KEY) === null)
      throw Error("JWT not found");
    const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    const url = QUIZ_URL + quiz_id + "/clone";

    const response = await axios.post(url, {
      headers: {
        Authorization: "Bearer " + jwt,
      },

    });
    console.log('Save quiz response ', response);
    if (response.status === 200) {
      swal("Quiz saved!", "Your quiz has been saved.", "success");
    }

    // router.push("/create/" + response.data.quiz_id);
    // SAVE QUIZ HEREEEEEEEEEEEEEEEEEEEEEEEEEE
  } catch (error) {
    console.log(error);
    window.alert("Error duplicating quiz!");
  }
};
