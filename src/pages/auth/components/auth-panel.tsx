import { useState } from "react";
import LogInPanel from "./login-panel";
import SignUpPanel from "./signup-panel";
import ForgotPanelEmail from "./forget-panel-email";
import ForgotPanelCheckEmail from "./forget-panel-check-email";
import ForgotPanelVerifyOtp from "./forget-verify-otp";
import ForgotPanelNewPassword from "./forget-panel-newpassword";

const AuthPanel = () => {
  const [option, setOption] = useState<string>("login");

  const changeOption = (option: string) => {
    setOption(option);
  };

  return (
    <div>
      {option === "login" ? (
          <LogInPanel next={changeOption}></LogInPanel>
      ) : option === "signup" ? (<SignUpPanel next={changeOption}></SignUpPanel>):
      option === "forget" ? (<ForgotPanelEmail next={changeOption}></ForgotPanelEmail>):
      option === "checkemail" ? (<ForgotPanelCheckEmail next={changeOption}></ForgotPanelCheckEmail>): 
      option === "otp" ? (<ForgotPanelVerifyOtp next={changeOption}></ForgotPanelVerifyOtp>): 
      option ==='resetpassword' ? (<ForgotPanelNewPassword next={changeOption}></ForgotPanelNewPassword>):null}
    </div>
  );
};

export default AuthPanel;