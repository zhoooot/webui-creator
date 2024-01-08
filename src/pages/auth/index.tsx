import React, { useEffect, useState } from "react";
import LogInPanel from "./components/login-panel";
import Advert from "./components/advert";
import SignUpPanel from "./components/signup-panel";
import AuthPanel from "./components/auth-panel";
import { EMAIL_LOCAL_STORAGE_KEY, INFO_LOCAL_STORAGE_KEY, JWT_LOCAL_STORAGE_KEY, OTP_LOCAL_STORAGE_KEY } from "@/config";

const AuthPage = (): JSX.Element => {

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(EMAIL_LOCAL_STORAGE_KEY);
    localStorage.removeItem(OTP_LOCAL_STORAGE_KEY);
    localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    localStorage.removeItem(INFO_LOCAL_STORAGE_KEY);
  }, [])

  return (
    <div className="h-full grid grid-cols-12 w-screen">
      <div className="col-span-9 self-center p-12">
        <Advert></Advert>
      </div>
      <div className="col-span-3 self-center flex justify-center">
        <AuthPanel></AuthPanel>
      </div>
    </div>
  );
};

export default AuthPage;
