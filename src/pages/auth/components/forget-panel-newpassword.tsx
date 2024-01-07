import React from 'react';

const ForgotPanelNewPassword = (props: { next: any }): JSX.Element => {

  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [rePassword, setRePassword] = React.useState<string>("");
  const [isSimilar, setIsSimilar] = React.useState<boolean>(true);
  return (
    <div className='w-96 bg-base-100 p-6'>
      <div className='font-bold text-purple-600 text-center text-2xl'>NEW PASSWORD</div>
      <div className=' text-gray-500 mt-4 text-base text-left font-semibold'>Password</div>
      <div className='mt-2 w-full'>
        <input type='password' className='input input-bordered h-12 w-full max-w-full'
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value !== password) {
              setIsSimilar(false);
            }
            else { setIsSimilar(true) }
          }}></input>

      </div>
      <div className=' text-gray-500 mt-4 text-base text-left font-semibold'>Revalidate Password</div>
      <div className='mt-2 w-full'>
        <input type='password' className='input input-bordered h-12 w-full max-w-full'
          onChange={(e) => setRePassword(e.target.value)}></input>

      </div>
      {(!isSimilar && rePassword !== "" && password !== "") && <p className="text-error">The revalidate password does not match</p>}
      <button className='btn w-full capitalize btn-primary text-base bg-purple-600 mt-4' onClick={()=>props.next('login')}>Submit</button> 
    </div>
  );
}
export default ForgotPanelNewPassword;