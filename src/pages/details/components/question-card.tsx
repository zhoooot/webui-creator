// import TIME from time-input
import {TIME} from '../../create/components/time-input';

type CardProps = {
    questionNumber: number;
    questionText: string;
    answerText: string;
    time: number;
    powerUps: boolean;
  };

const QuestionCard : React.FC<CardProps> = (props) => {
    return (
        <div className="bg-white rounded-lg p-6 max-h-fit">
            <div className="flex items-center mb-1">
                <span className="text-gray-500">{props.questionNumber} - </span>
                <h2 className="text-xl font-bold ml-1">{props.questionText}</h2>
            </div>
            <p className="text-gray-600 mb-4">{props.answerText}</p>
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
              {TIME[props.time]}s
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
    );
};

export default QuestionCard;