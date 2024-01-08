import { AUTH_URL, OTP_LOCAL_STORAGE_KEY } from "@/config";
import { otpValidation } from "@/helper/otp_validation";
import axios, { AxiosError } from "axios";
import React from "react";
import VerificationInput from "react-verification-input";

const ForgotPanelVerifyOtp = (props: { next: any }): JSX.Element => {
  const [otp, setOtp] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handleOnClick = async () => {
    if (!otp) {
      setError("Please enter your otp");
      return;
    }
    try {
      if (!otpValidation(otp)) throw new Error("Invalid otp");
      const url = AUTH_URL + "/auth/verify-otp";
      const data = {
        email: localStorage.getItem("email"),
        otp: otp,
      };
      console.log("Sending request with data: ", data);
      const response = await axios.post(url, data);
      console.log(response);
      localStorage.removeItem(OTP_LOCAL_STORAGE_KEY);
      localStorage.setItem(OTP_LOCAL_STORAGE_KEY, otp);
    } catch (e: any) {
      alert(e.message);
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
    props.next("resetpassword");
  };

  return (
    <div className="w-96 bg-base-100 p-6 rounded-lg">
      <div className="font-bold text-purple-600 text-center text-2xl">
        VERIFY OTP
      </div>
      <div className="mt-2 text-left  text-base  flex">Enter your otp</div>
      <div className="w-full flex flex-col items-center justify-center mt-4">
        <VerificationInput
          length={6}
          placeholder=""
          onChange={(e) => {
            console.log(e);
            setOtp(e);
          }}
        />
      </div>
      {error ? (
        <>
          <p className="text-error text-center mt-2">{error}</p>
        </>
      ) : null}
      <button
        className="btn w-full capitalize btn-primary text-base bg-purple-600 mt-4"
        onClick={handleOnClick}
      >
        Verification
      </button>
    </div>
  );
};
export default ForgotPanelVerifyOtp;
