import React from 'react';

const ForgotPanelEmail = (props: { next: any }): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handleOnClick = () => {
    if (!email)
    {
      setError("Please enter your email")
      return;
    } else setError("");
    props.next('checkemail');
    
    // add validation the email in here, here is the logic  
    // setError("We counldn't find your account with that email")
    
  }
  return (
    <div className='w-96 bg-base-100 p-6'>
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