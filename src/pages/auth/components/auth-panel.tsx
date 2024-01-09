import { useEffect, useState } from "react";
import LogInPanel from "./login-panel";
import SignUpPanel from "./signup-panel";
import ForgotPanelEmail from "./forget-panel-email";
import ForgotPanelCheckEmail from "./forget-panel-check-email";
import ForgotPanelVerifyOtp from "./forget-verify-otp";
import ForgotPanelNewPassword from "./forget-panel-newpassword";
import { JWT_LOCAL_STORAGE_KEY } from "@/config";
import { decode } from "@/helper/decode_jwt";
import router from "next/router";

const AuthPanel = () => {
  const [option, setOption] = useState<string>("login");

  const changeOption = (option: string) => {
    setOption(option);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (jwt) {
      const decoded = decode(jwt);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
      } else {
        router.replace("/");
      }
    }
  }, []);

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