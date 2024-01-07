import axios from "axios";
import React from "react";
import { HiEllipsisVertical, HiOutlineStar, HiOutlineShare, HiOutlineDocumentDuplicate, HiOutlineMegaphone } from "react-icons/hi2";

interface QuizCardProps {
  imageUrl: string;
  number: number;
  name: string;
  questionCount: number;
  id: number;
}

// z-10 z-9 z-8 z-7 z-6 z-5 z-4 z-3 z-2 z-1

const handlingReport = async (id: number) => {
  console.log("Handling report", id);
  const url = "/api/report";
  await axios.post(url, { id: id });
}

const QuizCard: React.FC<QuizCardProps> = (props) => {
  const iconClass = "w-5 h-5 stroke-current stroke-10 mr-3";
  const optionClass = "dropdown-item text-black flex flex-row items-center text-base";

  return (
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
          <div className="dropdown h-full min-h-0">
            <label className="btn btn-neutral w-full min-h-0" tabIndex={0}> 
              <HiEllipsisVertical
                className="w-6 h-6"
              />
            </label>
            <div className="dropdown-menu dropdown-menu-bottom-left z-50"
                tabIndex={-1}>
              <a className={optionClass}>
              <HiOutlineStar
                className={`${iconClass} `}
              />
                Favorites
              </a>
              <a className={optionClass}>
              <HiOutlineShare
                className={iconClass}
              />
                Share
              </a>
              <a className={optionClass}>
              <HiOutlineDocumentDuplicate
                className={iconClass}
              />{/* //tabIndex={-1} */}
                Duplicate
              </a>
              <a className={optionClass}>
              <HiOutlineMegaphone
                className={iconClass}
              />{/* //tabIndex={-1} */}
                Report
              </a>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="card-title h-full w-full overflow-hidden mb-0 leading-3">{props.name}</h2>
          <p>{props.questionCount} Questions</p>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
