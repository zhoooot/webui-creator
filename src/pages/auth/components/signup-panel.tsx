import { AUTH_URL } from "@/config";
import axios from "axios";
import React, { useEffect } from "react";

const SignUpPanel = (props: { next: any }): JSX.Element => {

  const [seclevel, setSecLevel] = React.useState<number>(0);

  const [email, setEmail] = React.useState<string>("");

  const [password, setPassword] = React.useState<string>("");
  const [rePassword, setRePassword] = React.useState<string>("");
  const [isSimilar, setIsSimilar] = React.useState<boolean>(true);

  const [passwordFocus, setPasswordFocus] = React.useState<boolean>(true);

  const RequestSignUp = async () => {
    const url = AUTH_URL + "/auth/register";
    const data = {
      email: email,
      password: password,
    };
    try {
      console.log("Try to sign up", data);
      await axios.post(url, data);
      console.log('Sign up');
    }
    catch (e) {
      console.log(e);
    }
  }

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

const SignUpPanel = (): JSX.Element => {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="grow">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="grow">
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <progress
          className="progress progress-secondary w-full"
          value={10}
          max="100"
        ></progress>

        <text>Weak</text>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Revalidate Password</span>
          </label>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your role</span>
          </label>
          <select className="select select-bordered">
            <option disabled selected>
              Pick one
            </option>
            <option>Students</option>
            <option>Educators</option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <p className="label-text">
              By creating your account, you agree to the{" "}
              <a className="link link-primary">Terms of Services</a> and{" "}
              <a className="link link-primary">Privacy Policy</a>
            </p>
          </label>
        </div>
        <button className="btn btn-primary" >Sign Up</button>
        <button className="btn btn-primary" onClick={RequestSignUp}>Sign Up</button>
      </div>
      <p>
        Already have an account? <a className="link link-primary" href="/auth/">Log in!</a>
      </p>
    </div>
  );
};

export default SignUpPanel;
