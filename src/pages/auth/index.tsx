import React from "react";
import LogInPanel from "./components/login-panel";
import Advert from "./components/advert";

const AuthPage = (): JSX.Element => {
  return (
    <div className="h-full grid grid-cols-12 mr-12 ml-12">
      <div className="col-span-9 mr-12">
        <Advert></Advert>
      </div>
      <div className="mt-4 mb-12 self-center">
        <LogInPanel></LogInPanel>
      </div>
    </div>
  );
};

export default AuthPage;
