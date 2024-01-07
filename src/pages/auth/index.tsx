import React, { useState } from "react";
import LogInPanel from "./components/login-panel";
import Advert from "./components/advert";
import SignUpPanel from "./components/signup-panel";
import AuthPanel from "./components/auth-panel";

const AuthPage = (): JSX.Element => {
  return (
    <div className="h-full grid grid-cols-12 mr-12 ml-12">
      <div className="col-span-9 mr-12 self-center">
        <Advert></Advert>
      </div>
      <div className="mt-4 mb-12 self-center">
        <AuthPanel></AuthPanel>
      </div>
    </div>
  );
};

export default AuthPage;
