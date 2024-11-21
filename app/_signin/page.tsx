"use client"

import MyInput from '@/_mycomponents/input';
import PasswordInput from '@/_mycomponents/password';
import { MainContext, useMainContext } from '@/context';
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

  const {handleCloseModal} = useMainContext();


  function handleSubmit(e: any) {
    e.preventDefault();

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
            <MyInput type="email" id="signin_email" name="signin_email" value={email} onChange={(e)=> setEmail(e.target.value)} required={true} />

          </div>
          <div>
            <label htmlFor="signin_passwd" className='block text-lg'>Password</label>
            <PasswordInput name='signin_passwd' id='signin_passwd' value={passwd} setValue={setPasswd} />
          </div>
        </div>

        <button className='rounded-lg py-2 px-3 border bg-yellow-700 text-stone-100 w-full'>Signin</button>
      </form>
    </div>
  )
}

export default Signin