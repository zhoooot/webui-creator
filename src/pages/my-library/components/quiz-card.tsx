import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Action from "./actions";
import {
  QuizImage,
  QuizTitle,
  QuizAuthor,
  QuizPublishedIcon,
} from "./quizinfo";
import Link from 'next/link'; 

type CardProps = {
  id: string;
  index: number;
  title: string;
  image_url: string;
  updated_at: string;
  published: boolean;
  author: string;
  favorite: boolean;
  is_draft: boolean;
  onClickFavorite: (arg0: number) => void;
  onClickDelete: (arg0: number) => void;
  onClickShare: (arg0: number) => void;
  onClickRename: (arg0: number) => void;
  onClickDuplicate: (arg0: number) => void;
};

const QuizCard: React.FC<CardProps> = (quiz) => {
  return (
      <div className=" bg-white shadow-xl rounded-lg w-full h-40 flex flex-row ">
        <div className="min-w-0.5 overflow-clip">
          <QuizImage src={quiz.image_url} />
        </div>
        <div className="h-50 w-full p-6 flex flex-col grow">
          <div className="w-full flex flex-row justify-between items-center h-10 flex-none">
            <QuizTitle>{quiz.title}</QuizTitle>
            <Action
              author={true}
              qid={quiz.id}
              favorite={quiz.favorite}
              is_draft={quiz.is_draft}
              onClickDelete={() => {
                quiz.onClickDelete(quiz.index);
              }}
              onClickFavorite={() => {
                quiz.onClickFavorite(quiz.index);
              }}
              onClickRename={() => {
                quiz.onClickRename(quiz.index);
              }}
              onClickDuplicate={() => {
                quiz.onClickDuplicate(quiz.index);
              }}
              onClickShare={() => {
                quiz.onClickShare(quiz.index);
              }}
            />
          </div>
          <div className="grow"></div>
          <div className="flex flex-row justify-between items-center h-10 flex-none">
            <div className="flex flex-col shrink-0">
              <div className="text-gray-500">Updated {quiz.updated_at}</div>
              <div className="flex flex-row gap-2">
                <QuizPublishedIcon published={quiz.published} />
                <QuizAuthor>{quiz.author}</QuizAuthor>
              </div>
            </div>

            <button
              type="button"
              className={`${quiz.is_draft ? "btn-disabled" : "btn-primary" } px-6 py-3.5 btn disabled:pointer-events-none`}
            >
              <Link href={`/details/${quiz.id}`}>Play</Link>
            </button>
          </div>
        </div>
      </div>
  );
};

export default QuizCard;
