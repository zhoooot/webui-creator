import React from "react";

const SignUpPanel = (): JSX.Element => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-4">
      <div className="grid grid-cols-1">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
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
        <button className="btn btn-primary">Sign Up</button>
      </div>
      <p>
        Already have an account? <a className="link link-primary" href="/auth/">Log in!</a>
      </p>
    </div>
  );
};

export default SignUpPanel;
