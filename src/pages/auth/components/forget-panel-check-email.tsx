import React from 'react';

const ForgotPanelCheckEmail = (props: { next: any }): JSX.Element => {

  
  return (
    <div className='w-96 bg-base-100 p-6'>
      <div className='font-bold text-purple-600 text-center text-2xl'>RESET PASSWORD</div>
      <div className='mt-2 text-center pr-8 pl-8 text-base  flex'>We&apos;ve sent you an email about resetting your password.</div>
      <button className='btn w-full capitalize btn-primary text-base bg-purple-600 mt-4' onClick={()=>props.next('login')}>Back to log in</button>
    </div>
  );
}
export default ForgotPanelCheckEmail;