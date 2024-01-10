import React, { useEffect, useState } from "react";
import QuizCard from "./components/quiz-card";
import Layout from "../global_components/layout";
import Link from "next/link";
import axios from "axios";
import { ILibraryQuiz } from "@/interface/ILibraryQuiz";
import { Icon } from "@iconify/react/dist/iconify.js";
import { QUIZ_URL } from "@/config";
import { IQuizDetail } from "@/interface/IQuizDetail";
import { parseQuiz } from "@/helper/parse_quiz";
import { createNewQuiz } from "@/pages/create/logic/createNewQuiz";

const MyLibrary = ({ creatorId }: { creatorId: any }) => {
  const [activeTab, setActiveTab] = useState("recent");

  const [recentQuizzes, setRecentQuizzes] = useState<Array<IQuizDetail>>([]);
  const [draftQuizzes, setDraftQuizzes] = useState<Array<IQuizDetail>>([]);
  const [favoriteQuizzes, setFavoriteQuizzes] = useState<Array<IQuizDetail>>(
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

  const [quizzes, setQuizzes] = useState<Array<IQuizDetail>>([]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      console.log("fetching quizzes");
      try {
        const response = await axios.get(QUIZ_URL + `quiz`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        const tmpRecentQuizzes: Array<IQuizDetail> = [];
        const tmpDraftQuizzes: Array<IQuizDetail> = [];
        console.log("Recent data ", response.data);

        let i;
        for (i = 0; i < response.data.length; i++) {
          const result: IQuizDetail = await parseQuiz(response.data[i]);
          console.log("Quiz ", result);
          tmpRecentQuizzes.push(result);
          console.log("Recent quizzes length ", tmpRecentQuizzes.length);
        }

        setRecentQuizzes(tmpRecentQuizzes);

        
        const responseDraft = await axios.get(
          QUIZ_URL + `draft`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        console.log("Fetch draft from", QUIZ_URL + `draft`);
        console.log("Draft data ", responseDraft.data);

        for (i = 0; i < responseDraft.data.length; i++) {
          const result: IQuizDetail = await parseQuiz(responseDraft.data[i]);
          console.log("Quiz ", result);
          tmpDraftQuizzes.push(result);
          console.log("Recent quizzes length ", tmpDraftQuizzes.length);
        }

        setDraftQuizzes(tmpDraftQuizzes);

        console.log("out of loop");
      } catch (e) {
        console.log(e);
      }
    };

    fetchQuizzes();
  }, [creatorId]);

  const addQuizToFavorite = (quizId: number) => {
    const quiz = quizzes[quizId];
    const updatedQuiz = { ...quiz, favorite: !quiz.favorite };
    const newQuizzes = [...quizzes];
    newQuizzes[quizId] = updatedQuiz;
    setQuizzes(newQuizzes);
    return updatedQuiz;
  };

  const onFavoriteClick = (quizId: number) => {
    const updatedQuiz = addQuizToFavorite(quizId);
    setFavoriteQuizzes([...favoriteQuizzes, updatedQuiz]);
  };

  const onDeleteClick = (index: number) => {
    console.log("deleting quiz");
    const newQuizes = [...quizzes];
    newQuizes.splice(index, 1);
    setQuizzes(newQuizes);
  };

  const onClickRename = (index: number) => {};

  const onClickShare = (index: number) => {};

  const onClickDuplicate = (index: number) => {
    const newQuizes = [...quizzes];
    const duplicatedQuiz = { ...newQuizes[index] };
    newQuizes.splice(index + 1, 0, duplicatedQuiz);
    setQuizzes(newQuizes);
  };

  console.log("rebuilding dsdf");

  const activeClass = "text-primary-500 border-b-primary-500 text-base";
  const inactiveClass =
    "text-gray-500 hover:text-gray-600 text-base hover:border-gray-300 dark:hover:text-gray-300";
  const tabClass = "p-4 rounded-lg w-full ";
  const quiz = quizzes[0];
  return (
    <Layout>
      <div className="w-full h-full p-4">
        <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700 flex flex-row justify-between items-center">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              // role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "recent" ? activeClass : inactiveClass
                  }`}
                  id="recent-tab"
                  data-tabs-target="#recent"
                  type="button"
                  role="tab"
                  aria-controls="recent"
                  aria-selected={activeTab === "recent"}
                  onClick={() => handleTabClick("recent")}
                >
                  Recent
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "draft" ? activeClass : inactiveClass
                  }`}
                  id="draft-tab"
                  data-tabs-target="#draft"
                  type="button"
                  role="tab"
                  aria-controls="draft"
                  aria-selected={activeTab === "draft"}
                  onClick={() => handleTabClick("draft")}
                >
                  Draft
                </button>
              </li>
              {/* <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "favorites" ? activeClass : inactiveClass
                  }`}
                  id="favorites-tab"
                  data-tabs-target="#favorites"
                  type="button"
                  role="tab"
                  aria-controls="favorites"
                  aria-selected={activeTab === "favorites"}
                  onClick={() => handleTabClick("favorites")}
                >
                  Favorites
                </button>
              </li> */}
            </ul>
              <button
                type="button"
                className="py-3 px-4 text-sm font-semibold text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={createNewQuiz}
              >
                <Icon icon="akar-icons:plus" className="w-4 h-4 mr-1" />
                Create
              </button>
          </div>
          <div id="default-tab-content" className="grow overflow-y-auto">
            <div
              className={`${tabClass} ${
                activeTab === "recent" ? "" : "hidden"
              } ${recentQuizzes.length > 0 ? "" : "h-full"}`}
              id="recent"
              role="tabpanel"
              aria-labelledby="recent-tab"
            >
              {recentQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 w-full h-full overflow-hidden">
                  {recentQuizzes.map((quiz, index) => (
                    <QuizCard
                      key={index}
                      index={index}
                      id={quiz.id}
                      title={quiz.title}
                      image_url={quiz.image_url}
                      updated_at={quiz.updated_at}
                      published={quiz.published}
                      author={quiz.author}
                      is_draft={false}
                      favorite={quiz.favorite}
                      onClickFavorite={onFavoriteClick}
                      onClickDelete={onDeleteClick}
                      onClickRename={onClickRename}
                      onClickShare={onClickShare}
                      onClickDuplicate={onClickDuplicate}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full gap-1">
                  <div className="text-3xl font-bold">No Quizzes</div>
                  <div className="text-gray-500">
                    You have no quizzes.
                    <Link href="/create">
                      <button className="text-primary-500 font-body font-bold text-right hover:underline cursor-pointer ml-1">
                        Create one now!
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${tabClass} ${
                activeTab === "draft" ? "" : "hidden"
              } ${draftQuizzes.length > 0 ? "" : "h-full"}`}
              id="draft"
              role="tabpanel"
              aria-labelledby="draft-tab"
            >
              {draftQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 w-full h-full overflow-hidden">
                  {draftQuizzes.map((quiz, index) => (
                    <QuizCard
                      key={index}
                      index={index}
                      id={quiz.id}
                      title={quiz.title}
                      image_url={quiz.image_url}
                      updated_at={quiz.updated_at}
                      published={quiz.published}
                      author={quiz.author}
                      is_draft={true}
                      favorite={quiz.favorite}
                      onClickFavorite={onFavoriteClick}
                      onClickDelete={onDeleteClick}
                      onClickRename={onClickRename}
                      onClickShare={onClickShare}
                      onClickDuplicate={onClickDuplicate}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full gap-1">
                  <div className="text-3xl font-bold">No Drafts</div>
                  <div className="text-gray-500">
                    You have no draft quizzes.
                    <Link href="/create">
                      <button className="text-primary-500 font-body font-bold text-right hover:underline cursor-pointer ml-1">
                        Create one now!
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${tabClass} ${
                activeTab === "favorites" ? "" : "hidden"
              } ${favoriteQuizzes.length > 0 ? "" : "h-full"}`}
              id="favorites"
              role="tabpanel"
              aria-labelledby="favorites-tab"
            >
              {favoriteQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {favoriteQuizzes.map((quiz, index) => (
                    <QuizCard
                      key={index}
                      index={index}
                      id={quiz.id}
                      title={quiz.title}
                      image_url={quiz.image_url}
                      updated_at={quiz.updated_at}
                      published={quiz.published}
                      is_draft={true}
                      author={quiz.author}
                      favorite={quiz.favorite}
                      onClickFavorite={onFavoriteClick}
                      onClickDelete={onDeleteClick}
                      onClickRename={onClickRename}
                      onClickShare={onClickShare}
                      onClickDuplicate={onClickDuplicate}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full gap-1">
                  <div className="text-3xl font-bold">No Favorites</div>
                  <div className="text-gray-500">
                    You have no favorite quizzes
                  </div>
                  <Link href="/discover">
                    <button
                      type="button"
                      className="mt-2 py-3 px-4 text-sm font-semibold text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Discover Quizzes
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyLibrary;
