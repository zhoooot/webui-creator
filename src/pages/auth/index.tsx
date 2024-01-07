import React from "react";
import LogInPanel from "./components/login-panel";
import Advert from "./components/advert";

const AuthPage = (): JSX.Element => {
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
