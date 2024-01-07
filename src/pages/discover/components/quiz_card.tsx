import React from "react";
import { HiEllipsisVertical, HiOutlineStar, HiOutlineShare, HiOutlineDocumentDuplicate, HiOutlineMegaphone } from "react-icons/hi2";
import Link from "next/link"

interface QuizCardProps {
  imageUrl: string;
  number: number;
  name: string;
  questionCount: number;
  id: number;
}

// z-10 z-9 z-8 z-7 z-6 z-5 z-4 z-3 z-2 z-1


const QuizCard: React.FC<QuizCardProps> = (props) => {
  const iconClass = "w-5 h-5 stroke-current stroke-10 mr-3";
  const optionClass = "dropdown-item text-black flex flex-row items-center text-base";

  return (
    <Link href={`/details`}>
    <div className={`card shadow-xl image-full h-48 w-full object-full`}>
      <figure className="w-full h-48">
        <img
          src="https://picsum.photos/1000/1000"
          alt="Shoes"
          className="object-cover w-full h-48"
        />
      </figure>
      <div className="card-body justify-between h-full w-full">
        <div className="card-actions justify-between h-10">
          <div className="badge badge-accent h-full rounded-xl">
            {props.number} PLAYS
          </div>
        </div>
        <div className="mb-4">
          <h2 className="card-title h-full w-full overflow-hidden mb-0 leading-3">{props.name}</h2>
          <p>{props.questionCount} Questions</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default QuizCard;
