import { createAction } from "@reduxjs/toolkit";

export const setQuizTitle = createAction<string>("SET_QUIZ_TITLE");
export const setActiveQuestion = createAction<number>("SET_ACTIVE_QUESTION");
export const setQuestionData = createAction<any>("SET_QUESTION_DATA");
export const setQuestionValue = createAction<any>("SET_QUESTION_VALUE");
export const setUpdateModalVisible = createAction<boolean>("SET_UPDATE_MODAL_VISIBLE");
export const handleExitQuiz = createAction<void>("HANDLE_EXIT_QUIZ");
export const handleSaveQuiz = createAction<void>("HANDLE_SAVE_QUIZ");
export const handleCreateQuestion = createAction<void>("HANDLE_CREATE_QUESTION");
export const handleDuplicateQuestion = createAction<number>("HANDLE_DUPLICATE_QUESTION");
export const handleDeleteQuestion = createAction<number>("HANDLE_DELETE_QUESTION");
export const handleQuestionCardClick = createAction<number>("HANDLE_QUESTION_CARD_CLICK");
export const handleAnswerChange = createAction<any>("HANDLE_ANSWER_CHANGE");
