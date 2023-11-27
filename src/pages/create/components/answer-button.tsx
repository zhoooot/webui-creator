type AnswerProps = {
  key: number;
  onChange: (text: string) => void;
  svg_icon: string;
  color: string;
  value: string;
};

// bg-red-500 bg-green-500 bg-blue-500 bg-yellow-500 bg-red-500 bg-green-500 bg-blue-500 bg-yellow-500 ring-red-500 ring-green-500 ring-blue-500 ring-yellow-500 stroke-red-500 stroke-green-500 stroke-blue-500 stroke-yellow-500
// focus:bg-red-500 focus:bg-green-500 focus:bg-blue-500 focus:bg-yellow-500 focus:ring-red-500 focus:ring-green-500 focus:ring-blue-500 focus:ring-yellow-500 focus:stroke-red-500 focus:stroke-green-500 focus:stroke-blue-500 focus:stroke-yellow-500

const AnswerButton: React.FC<AnswerProps> = (props) =>{
  return (
  <div className={`col-span-1 bg-transparent`}>
    <div className={`relative flex rounded ring-8 bg-transparent ring-white w-full`}>
        <div className={`absolute left-px rounded inset-x-px h-full flex w-6 bg-${props.color}-500 flex-none justify-center items-center`}>
            <svg className="w-6 h-6 fill-white" viewBox="0 0 32 32">
              <path d={props.svg_icon} />
            </svg>
        </div>
        <textarea
          id="hs-textarea-ex-1"
          className={`inline-block align-center textarea p-2 pr-6 pl-8 focus:outline-0 rounded font-medium w-full text-xl focus:bg-${props.color}-500 focus:placeholder-white focus:text-white focus:ring-8 focus:ring-${props.color}-500 ${props.value != "" ? `text-white ring-8 ring-${props.color}-500 bg-${props.color}-500` : ''}`}
          placeholder="Add answer"
          rows={3}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          style={{ resize: "none" }}
        ></textarea>
        <div className={`absolute top-0 right-0 rounded flex w-6 flex-none`}>
          <input
            type="radio"
            name="hs-default-radio"
            className=" accent-white border-white border-4 checked:ring-4 checked:ring-transparent radio-accent radio shrink-0 mt-0.5 w-6 h-6 checked:border-white rounded-full"
          />
        </div>
    </div>
  </div>
);}

export default AnswerButton;
