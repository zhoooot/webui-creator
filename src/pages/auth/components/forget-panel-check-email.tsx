import React, { useEffect } from "react";

const ForgotPanelCheckEmail = (props: { next: any }): JSX.Element => {
  useEffect(() => {
    window.setTimeout(function () {
      props.next("otp");
    }, 5000);
  }, [props]);

  return (
    <div className="w-96 bg-base-100 p-6 rounded-lg">
      <div className="font-bold text-purple-600 text-center text-2xl">
        RESET PASSWORD
      </div>
      <div className="mt-2 text-center pr-8 pl-8 text-base  flex">
        We&apos;ve sent you an email about reseting your password. Please check.
      </div>
      <button
        className="btn w-full capitalize btn-primary text-base bg-purple-600 mt-4"
        onClick={() => props.next("login")}
      >
        Back to log in
      </button>
    </div>
  );
};
export default ForgotPanelCheckEmail;
