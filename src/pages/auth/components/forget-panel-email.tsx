import { AUTH_URL, EMAIL_LOCAL_STORAGE_KEY } from '@/config';
import { EmailValidation } from '@/helper/test_email';
import axios, { AxiosError } from 'axios';
import React from 'react';

const ForgotPanelEmail = (props: { next: any }): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handleOnClick = async () => {
    if (!email)
    {
      setError("Please enter your email")
      return;
    }
    try {
      if (!EmailValidation(email)) throw new Error("Invalid email");
      const url = AUTH_URL + "auth/forgot-password";
      const data = {
        email: email,
      };
      console.log("Sending request with data: ", data);
      const response = await axios.post(url, data);
      console.log(response);
      if (typeof window !== "undefined") {
        localStorage.removeItem(EMAIL_LOCAL_STORAGE_KEY);
        localStorage.setItem(EMAIL_LOCAL_STORAGE_KEY, email);
      }
    } 
    catch (e: any) {
      const error = e as AxiosError;
      switch(error.response?.status) {
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
    props.next('checkemail');
    
    // add validation the email in here, here is the logic  
    // setError("We counldn't find your account with that email")
  }



  return (
    <div className='w-96 bg-base-100 p-6 rounded-lg'>
      <div className='font-bold text-purple-600 text-center text-2xl'>RESET PASSWORD</div>
      <div className=' text-gray-500 mt-4 text-base text-left font-semibold'>Enter your email</div>
      <div className='mt-2 w-full'>
        <input type='text' placeholder='Email' className='input input-bordered h-12 w-full max-w-full'
          onChange={(e) => setEmail(e.target.value)}></input>

      </div>
      {(error) ? (<>
        <p className="text-error text-center">{error}</p>
      
      </>):null}
      <button className='btn w-full capitalize btn-primary text-base bg-purple-600 mt-4' onClick={handleOnClick}>Send</button>
      <div className='text-purple-600 underline font-semibold text-base capitalize text-center mt-2' 
      onClick={()=>props.next('login')}>Back to log in</div>
    </div>
  );
}
export default ForgotPanelEmail;