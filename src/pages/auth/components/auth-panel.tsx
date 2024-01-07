import { useState } from "react";
import LogInPanel from "./login-panel";
import SignUpPanel from "./signup-panel";

const AuthPanel = () => {
  const [option, setOption] = useState<string>("login");

  const changeOption = (option: string) => {
    setOption(option);
  };

  return (
    <div>
      {option === "login" ? (
          <LogInPanel next={changeOption}></LogInPanel>
      ) : (
          <SignUpPanel next={changeOption}></SignUpPanel>
      )}
    </div>
  );
};

export default AuthPanel;