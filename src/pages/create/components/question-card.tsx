
const QuestionCard = ({ questionNumber, questionText, answerText, time, stateButton }: {
    questionNumber: number,
    questionText: string,
    answerText: string,
    time: string,
    stateButton: string
}) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">Question {questionNumber}</span>
                <span className="text-gray-500">{time}</span>
            </div>
            <h2 className="text-xl font-bold mb-4">{questionText}</h2>
            <p className="text-gray-600 mb-4">{answerText}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {stateButton}
            </button>
        </div>
    );
};

export default QuestionCard;