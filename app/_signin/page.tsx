"use client"

import { MainContext } from '@/context';
import React, { useContext, useRef, useState } from 'react'


/**
 * 
 * @returns 
 * * a sign in form that takes in the email and password as input, then checks the data store to see if user exists.
 * * If user exists, the user data is returned to the session storage, else, another form is opened for user to input Display name, then the user data is updated with the display name.
 */

const Signin = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const {handleCloseModal} = useContext(MainContext);

  const emailRef = useRef<any>(null);
  const passRef = useRef<any>(null);



  const errorBorder = 'border-red-500 focus:border-red-500 outline-red-500';
  const greenBorder = 'border-yellow-700 focus:border-green-500 outline-green-500';

  function handleSubmit(e: any) {
    e.preventDefault();

    // if (!email) { setError("email"); emailRef.current.focus(); return; }
    // else if (!passwd) { setError("passwd"); passRef.current.focus(); return; }

    const user = {
      email: email,
      password: passwd
    };

    console.log(user);
    handleCloseModal();

    setEmail("");
    setPasswd("");


  }

  return (
    <div className='text-stone-900'>
      <h1 className='text-3xl font-semibold'>Welcome Foodie!</h1>
      <h6 className='text-xl'>Please Sign In to Continue</h6>

      <form onSubmit={handleSubmit} className='mt-5'>
        <div className='space-y-3 mb-5'>
          <div>
            <label htmlFor="signin_email" className='block text-lg'>Email</label>
            <input ref={emailRef} className={`${!emailRef?.current?.validity?.valid ? (errorBorder) : (greenBorder)} w-full border-yellow-700 border rounded-md py-1 px-2`} type="email" id="signin_email" name="signin_email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="signin_passwd" className='block text-lg'>Password</label>
            <input ref={passRef} className={`${!passRef?.current?.validity?.valid ? (errorBorder) : (greenBorder)} w-full border-yellow-700 border rounded-md py-1 px-2`} type="password" name='signin_passwd' id='signin_passwd' value={passwd} onChange={(e)=> setPasswd(e.target.value)} minLength={7} required />
            {passwd.length < 7 && <p className='text-red-500'>Password must be at least 7 characters long</p>}
          </div>
        </div>

        <button className='rounded-lg py-2 px-3 border bg-yellow-700 text-stone-100 w-full'>Signin</button>
      </form>
    </div>
  )
}

export default Signin