import React, { useEffect } from "react";

const SignUpPanel = (props: { next: any }): JSX.Element => {
  const [seclevel, setSecLevel] = React.useState<number>(0);

  const [password, setPassword] = React.useState<string>("");
  const [rePassword, setRePassword] = React.useState<string>("");
  const [isSimilar, setIsSimilar] = React.useState<boolean>(true);

  const [passwordFocus, setPasswordFocus] = React.useState<boolean>(false);

  useEffect(() => {
    let level = 0;
    if (password.length >= 8) {
      level += 20;
    }
    if (password.match(/[a-z]/)) {
      level += 20;
    }
    if (password.match(/[A-Z]/)) {
      level += 20;
    }
    if (password.match(/[0-9]/)) {
      level += 20;
    }
    if (password.match(/[$@#&!]/)) {
      level += 20;
    }
    setSecLevel(level);
  }, [password]);

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="form-control w-full">
          <label className="label w-3/12">
            <span className="label-text">Email</span>
          </label>
          <div className="grow">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label w-3/12">
            <span className="label-text">Password</span>
          </label>
          <div className="grow">
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setPasswordFocus(true)}
              onBlur={(e) => setPasswordFocus(false)}
            />
          </div>
        </div>

        <div className={`${seclevel && passwordFocus ? "visible" : "hidden"}`}>
          <progress
            className="progress progress-secondary w-full"
            value={seclevel}
            max="100"
          ></progress>

          <text>
            {seclevel <= 20
              ? "Super weak"
              : seclevel <= 40
              ? "Weak"
              : seclevel <= 60
              ? "Medium"
              : seclevel <= 80
              ? "Strong"
              : seclevel <= 100
              ? "Excellent"
              : ""}
          </text>
        </div>

        <div className="form-control w-full">
          <label className="label w-3/12">
            <span className="label-text">Revalidate Password</span>
          </label>
          <div className="grow">
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => {setRePassword(e.target.value)
                if (e.target.value !== password) {
                  setIsSimilar(false);
                }
              else {setIsSimilar(true)}}}
            />

          </div>
        </div>
        {(!isSimilar && rePassword !== "" && password !== "") && <p className="text-error">The revalidate password does not match</p>}
        <div className="form-control w-full">
          <label className="label w-3/12">
            <span className="label-text">Your role</span>
          </label>
          <div className="grow">
            <select className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option>Students</option>
              <option>Educators</option>
              <option>Others</option>
            </select>
          </div>
        </div>

        <div className="form-control w-full flex self-center">
          <label className="label cursor-pointer">
            <div className="w-3/12">
              <input type="checkbox" className="checkbox checkbox-primary" />
            </div>
            <div className="grow items-center">
              <p className="label-text">
                By creating your account, you agree to the{" "}
                <a className="link link-primary">Terms of Services</a> and{" "}
                <a className="link link-primary">Privacy Policy</a>
              </p>
            </div>
          </label>
        </div>
        <button className="btn btn-primary" >Sign Up</button>
      </div>
      <p className="self-center" onClick={() => props.next("login")}>
        Already have an account? <a className="link link-primary">Log in!</a>
      </p>
    </div>
  );
};

export default SignUpPanel;
