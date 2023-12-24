import React, { useEffect, useState } from "react";
import QuizCard from "./components/quiz-card";
import Layout from "../global_components/layout";

interface Quiz {
  id: number;
  image_url: string;
  title: string;
  description: string;
  num_played: number;
  updated_at: string;
  published: boolean;
  author: string;
  favorite: boolean;
  status: string;
}

const MyLibrary = ({ creatorId }: { creatorId: any }) => {
  const [activeTab, setActiveTab] = useState("recent");
  
  const [recentQuizzes, setRecentQuizzes] = useState<Array<Quiz>>([]);
  const [draftQuizzes, setDraftQuizzes] = useState<Array<Quiz>>([]);
  const [favoriteQuizzes, setFavoriteQuizzes] = useState<Array<Quiz>>([]);

  const [quizzes, setQuizzes] = useState<Array<Quiz>>([
    {
      id: 0,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "published",
    },
    {
      id: 1,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of Vietnam?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "published",
    },
    {
      id: 2,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: true,
      status: "draft",
    },
    {
      id: 3,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: true,
      status: "draft",
    },
    {
      id: 4,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "draft",
    },
    {
      id: 5,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "published",
    },
    {
      id: 6,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "published",
    },
    {
      id: 7,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "published",
    },
    {
      id: 8,
      image_url: "https://picsum.photos/1000/1000",
      title: "What is the capital of France?",
      description: "Test your knowledge of the world with this quiz!",
      num_played: 100,
      updated_at: "1 hour ago",
      published: true,
      author: "John Doe",
      favorite: false,
      status: "published",
    },
  ]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      console.log("fetching quizzes");
      const quizzes = recentQuizzes.concat(draftQuizzes, favoriteQuizzes);
      const recentQuizzesUpdated = quizzes.filter((quiz: Quiz) => quiz.published);
      const draftQuizzesUpdated = quizzes.filter((quiz: Quiz) => quiz.status === "draft");
      const favoriteQuizzesUpdated = quizzes.filter((quiz: Quiz) => quiz.favorite);
      setRecentQuizzes(recentQuizzes);
      setDraftQuizzes(draftQuizzes);
      setFavoriteQuizzes(favoriteQuizzes);
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

  const activeClass = "text-primary-500 border-b-primary-500 text-base";
  const inactiveClass =
    "text-gray-500 hover:text-gray-600 text-base hover:border-gray-300 dark:hover:text-gray-300";
  const quiz = quizzes[0];
  return (
    <Layout>
      <div className="w-full h-full p-4">
        <div className="h-full bg-base-100 px-12 py-6 w-full rounded-2xl flex flex-col">
          <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
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
                <li className="me-2" role="presentation">
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
                </li>
              </ul>
            </div>
            <div
              id="default-tab-content"
              className="h-full w-full overflow-y-auto"
            >
              <div
                className={` p-4 rounded-lg ${
                  activeTab === "recent" ? "" : "hidden"
                }`}
                id="recent"
                role="tabpanel"
                aria-labelledby="recent-tab"
              >
                <div className="grid grid-cols-1 gap-4">
                  {quizzes
                    .filter((quiz) => !quiz.favorite)
                    .map((quiz, index) => (
                      <QuizCard
                        key={index}
                        id={quiz.id}
                        title={quiz.title}
                        image_url={quiz.image_url}
                        updated_at={quiz.updated_at}
                        published={quiz.published}
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
              </div>
              <div
                className={` p-4 rounded-lg ${
                  activeTab === "draft" ? "" : "hidden"
                }`}
                id="draft"
                role="tabpanel"
                aria-labelledby="draft-tab"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This is some placeholder content the{" "}
                  <strong className="font-medium text-gray-800 dark:text-white">
                    Draft tab's associated content
                  </strong>
                  . Clicking another tab will toggle the visibility of this one
                  for the next. The tab JavaScript swaps classes to control the
                  content visibility and styling.
                </p>
              </div>
              <div
                className={` p-4 rounded-lg ${
                  activeTab === "favorites" ? "" : "hidden"
                }`}
                id="favorites"
                role="tabpanel"
                aria-labelledby="favorites-tab"
              >
                <div className="grid grid-cols-1 gap-4">
                  {quizzes
                    .filter((quiz) => quiz.favorite)
                    .map((quiz, index) => (
                      <QuizCard
                        key={index}
                        id={quiz.id}
                        title={quiz.title}
                        image_url={quiz.image_url}
                        updated_at={quiz.updated_at}
                        published={quiz.published}
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
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default MyLibrary;