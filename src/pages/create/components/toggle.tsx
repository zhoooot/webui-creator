const Toggle: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <div className="items-center space-x-2">
    <label className="cursor-pointer label flex-col items-center justify-center">
      <span className="label-text text-base font-bold text-center">Allow Power-ups</span> 
      <input type="checkbox" className="toggle toggle-primary" checked />
    </label>
  </div>
  );

export default Toggle;