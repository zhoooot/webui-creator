import { AUTH_URL, JWT_LOCAL_STORAGE_KEY } from "@/config";
import { decode } from "@/helper/decode_jwt";
import axios from "axios";
import React, { useEffect } from "react";
import  { AxiosError } from 'axios';
import router from "next/router";

const LogInPanel = (props: { next: any }): JSX.Element => {
  const [state, setState] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleOnClick = () => {
    console.log(!email || !password);
    if (!email || !password) {
      if (!email && !password) setError("Please enter your email and password");
      else if (!email) setError("Please enter your email");
      else setError("Please enter your password");
    } else setError("");
    console.log(error);
  };

  const requestLogIn = async () => {
    console.log("Log in");
    const url = AUTH_URL + "/auth/login";
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(url, data);
      const jwt = response.data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem(JWT_LOCAL_STORAGE_KEY, jwt);
      }
      router.replace("/");
    } catch (e: any) {
      console.log(e);
      const error = e as AxiosError;
      switch(error.response?.status) {
        case 401:
          setError("Email or password is incorrect");
          break;
        case 404:
          setError("User not found");
          break;
        default:
          setError("Something went wrong");
      }
    }
  };

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl p-4">
      <div className="grid grid-cols-1">
        <button className="btn text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2">
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fill-rule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clip-rule="evenodd"
            />
          </svg>
          Sign in with Google
        </button>
        <button className="btn text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mb-2">
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 8 19"
          >
            <path
              fill-rule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clip-rule="evenodd"
            />
          </svg>
          Sign in with Facebook
        </button>

        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
          Or
        </div>

        <div className="form-control w-full">
          <label className="label w-3/12">
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
        <div className="form-control w-full mt-4">
          <label className="label w-3/12">
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
        <a
          className="link link-primary flex justify-center p-4"
          onClick={() => props.next("forget")}
        >
          Forgot password?
        </a>
        <button className="btn btn-primary" onClick={() => {
          handleOnClick();
          requestLogIn();
        }}>
          Log In
        </button>
        {error ? <p className="text-error text-center">{error}</p> : null}
        <p
          className="flex justify-center pt-4"
          onClick={() => props.next("signup")}
        >
          Haven&apos;t got an account?&nbsp;
          <a className="link link-primary">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LogInPanel;
