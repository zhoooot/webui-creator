import React from 'react';
import VerificationInput from 'react-verification-input';

const ForgotPanelVerifyOtp = (props: { next: any }): JSX.Element => {
  

  const [otp, setOtp] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const handleOnClick = () => {
    if (!otp)
    {
     setError("Please enter your otp"); 
     return
    } else setError("");
    props.next('resetpassword');

  }
  return (
    <div className='w-96 bg-base-100 p-6'>
      <div className='font-bold text-purple-600 text-center text-2xl'>VERIFY OTP</div>
      <div className='mt-2 text-left  text-base  flex'>Enter your otp</div>
     <div className='w-full flex flex-col items-center justify-center mt-4'><VerificationInput length={6} placeholder=""
     onChange={(e) => setOtp(e)} /></div>
      {(error) ? (<>
        <p className="text-error text-center mt-2">{error}</p></>):null}
     <button className='btn w-full capitalize btn-primary text-base bg-purple-600 mt-4' onClick={handleOnClick}>Verification</button>
    </div>
  );
}
export default ForgotPanelVerifyOtp;