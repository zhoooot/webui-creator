import { Action } from "redux";

interface FetchQuizzesAction extends Action {
  payload: any; // Replace 'any' with the actual type of 'payload'
}

const initialState = {
  recent: [],
  drafts: [],
  favorites: [],
};

const quizzesReducer = (state = initialState, action: FetchQuizzesAction) => {
  switch (action.type) {
    case "FETCH_QUIZZES":
      return {
        ...state,
        recent: action.payload,
      };
    case "ADD_FAVORITE_QUIZ":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

export default quizzesReducer;