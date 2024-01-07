import { useState } from "react";

type CardProps = {
  onClick: (arg0: number) => void;
  index: number;
  question: string;
  answer: string;
  time: number;
  powerUps: boolean;
  activeIndex: number;
  duplicate: (arg0: number) => void;
  delete: (arg0: number) => void;
  missingCorrectAnswer: boolean;
};

const Card: React.FC<CardProps> = (props) => {
  const active = props.activeIndex == props.index;
  // console.log("rebuilding")
  // console.log(props.activeIndex);
  return (
    <div className={`flex pr-2 py-2 w-full cursor-pointer ${active ? 'bg-primary-100' : '' }`} >
      <div className="flex flex-col w-6 content-center items-center justify-between">
        <p className="font-medium">{props.index + 1}</p>
        <div className="justify-end">
          <button className="min-h-0 btn btn-circle w-5 h-5 rounded-btn bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => {props.duplicate(props.index);}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
            />
          </svg>
        </button>
        <button className="min-h-0 btn btn-circle w-5 h-5 rounded-btn bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => {props.delete(props.index);}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    <div className={`${active ? 'ring-primary-500 ring-4 bg-white' : 'bg-gray-100'} card rounded-md w-full` } onClick={() => {props.onClick(props.index);}}>
      <div className="card-body p-3 ">
        <p className="line-clamp-2">{props.question == "" ? "<Missing>" : props.question}</p>
        <div className="bg-white px-2 rounded">
          <p className={`line-clamp-1 ${props.missingCorrectAnswer ? "text-red-600" : ""}`}>{props.answer}</p>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="text-s text-gray-600 font-medium ml-2 dark:text-gray-400">
              {props.time}s
            </p>
          </div>
          {props.powerUps ?
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-primary-600">
          <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
        :        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>}
        </div>
      </div>
    </div>
  </div>
);
}

export default Card;
