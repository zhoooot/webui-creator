import {
  AUTH_URL,
  EMAIL_LOCAL_STORAGE_KEY,
  OTP_LOCAL_STORAGE_KEY,
} from "@/config";
import { passwordRanking } from "@/helper/password_ranking";
import axios, { AxiosError } from "axios";
import React from "react";

const ForgotPanelNewPassword = (props: { next: any }): JSX.Element => {
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [rePassword, setRePassword] = React.useState<string>("");
  const [isSimilar, setIsSimilar] = React.useState<boolean>(true);

  const handlingResetPassword = async () => {
    if (!password || !rePassword) {
      setError("Please enter your password");
      return;
    }
    if (!isSimilar) {
      setError("The revalidate password does not match");
      return;
    }
    if (passwordRanking(password) < 50) {
      setError("The password is too weak");
      return;
    }
    try {
      if (localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY) === null) {
        throw new Error("Email not found");
      }
      if (localStorage.getItem(OTP_LOCAL_STORAGE_KEY) === null) {
        throw new Error("OTP not found");
      }
      const url = AUTH_URL + "auth/change-password-with-otp";
      const data = {
        email: localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY),
        otp: localStorage.getItem(OTP_LOCAL_STORAGE_KEY),
        password: password,
      };
      console.log("Sending request with data: ", data);
      const response = await axios.post(url, data);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      localStorage.removeItem(EMAIL_LOCAL_STORAGE_KEY);
      localStorage.removeItem(OTP_LOCAL_STORAGE_KEY);
      alert("Reset password successfully");
      props.next("login");
    } catch (e: any) {
      alert(e.message)
      const error = e as AxiosError;
      switch (error.response?.status) {
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
    window.setTimeout(() => {
      window.location.href = "/auth";
    }, 5000);
  };

  return (
    <div className="w-96 bg-base-100 p-6 rounded-lg">
      <div className="font-bold text-purple-600 text-center text-2xl">
        NEW PASSWORD
      </div>
      <div className=" text-gray-500 mt-4 text-base text-left font-semibold">
        Password
      </div>
      <div className="mt-2 w-full">
        <input
          type="password"
          className="input input-bordered h-12 w-full max-w-full"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className=" text-gray-500 mt-4 text-base text-left font-semibold">
        Revalidate Password
      </div>
      <div className="mt-2 w-full">
        <input
          type="password"
          className="input input-bordered h-12 w-full max-w-full"
          onChange={(e) => {
            setRePassword(e.target.value);
            if (e.target.value != password) {
              setIsSimilar(false);
            } else {
              setIsSimilar(true);
            }
          }}
        ></input>
      </div>
      {!isSimilar && rePassword !== "" && password !== "" && (
        <p className="text-error">The revalidate password does not match</p>
      )}
      <button
        className="btn w-full capitalize btn-primary text-base bg-purple-600 mt-4"
        onClick={handlingResetPassword}
      >
        Submit
      </button>
    </div>
  );
};
export default ForgotPanelNewPassword;
