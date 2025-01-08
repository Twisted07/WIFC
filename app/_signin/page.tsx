"use client"

import { getUsers } from '@/_lib/data-service';
import MyInput from '@/_mycomponents/input';
import PasswordInput from '@/_mycomponents/password';
import { useMainContext } from '@/context';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'


/**
 * 
 * @returns 
 * * a sign in form that takes in the email and password as input, then checks the data store to see if user exists.
 * * If user exists, the user data is returned to the session storage, else, another form is opened for user to input Display name, then the user data is updated with the display name.
 */

const Signin = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");

  const {handleCloseModal} = useMainContext();

  const {data: users, error} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  
  console.log(users, "users");

  async function handleSubmit(e: any) {
    e.preventDefault();

    /**
     * * check if user exists in database
     * * if user exists, return user data to session storage
     * * else open display name input form
     * * then update user data with display name
     * * finally, send the user data to database
     * * update session storage with the new user data
     * * reset form
     */

    const user = {
      email: email,
      password: passwd
    };


    if (error) {
      alert("An error occurred. Please try again in a few minutes.");
      return;
    }


    const userFound = users?.find((user: IUser) => user.email === email && user.password === passwd);

    if (!userFound) {
      if (!signup) {
        setSignup(true);
        return

      } else {
        const updatedUser = {
          ...user,
          displayName: name
        }

        // TODO: upload to database
        createUser();
        // setSesstion storage
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }

    if (userFound) {
      sessionStorage.setItem('user', JSON.stringify(userFound));
    }


    handleCloseModal();

    setEmail("");
    setPasswd("");


  }

  return (
    <div className='text-stone-900'>
      <h1 className='text-3xl font-semibold'>Welcome Foodie!</h1>
      { !signup && <h6 className='text-xl'>Please Sign In to Continue</h6> }

      <form onSubmit={handleSubmit} className='mt-5'>
        {
          !signup ?
          (<>
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
          </>)
          :
          <>
            <p>Looks like you are a first timer, if not, you can go back to signin with a registered email</p>
            <h2>Please enter a display name</h2>
            <MyInput type="text" id='signup_display-name' name='signup_display-name' value={name} onChange={(e) => setName(e.target.value)} required={true} />
          </>
        }
      </form>

    </div>
  )
}

export default Signin