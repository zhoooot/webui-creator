"use client;";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import quizzesReducer from "./my-library/components/quizzesReducer";

const rootReducer = combineReducers({
  quizzes: quizzesReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export default function App({ Component, pageProps }: AppProps) {
  "use client;";
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <Provider store={store}>
    <div className="h-screen w-screen">
      <Component {...pageProps} />
    </div></Provider>
  );
}
