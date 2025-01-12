"use client"

import { createUser, getUsers } from '@/_lib/data-service';
import MyInput from '@/_mycomponents/input';
import PasswordInput from '@/_mycomponents/password';
import { useMainContext } from '@/context';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
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

  const {handleCloseModal, handleSignin} = useMainContext();

  const {data: users, error} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  const {mutate: createUserMutate, isPending: createUserLoading, error: createUserError} = useMutation({
    mutationFn: (data : IUser) => createUser(data),
  });
  
  
  function __reset() {
    setEmail("");
    setPasswd("");
    setSignup(false);
    setName("");
  }

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
      email,
      password: passwd
    };


    if (error) {
      toast.error("An error occurred. Please try again in a few minutes.");
      __reset();
      return;
    }

    const userExists = users?.find((user) => user.email === email);
    

    // Check if user exists
    if (userExists) {
      if (passwd !== userExists.password) {
        toast.error("Incorrect login details.")
        return;
      }
      // If user exists, return user data to session storage
      toast.success("Signin successful!");
      sessionStorage.setItem('wifc-user', JSON.stringify(userExists));
    
    } else {
      if (!signup) {
        setSignup(true); return;
      } else {
        const updatedUser = { ...user, name }

        createUserMutate(updatedUser);
        sessionStorage.setItem('wifc-user', JSON.stringify(updatedUser));
      }
    }


    handleSignin();

    setTimeout(() => {
      handleCloseModal();
      __reset();
    }, 2000);
  }



  return (
    <div className='text-stone-900'>
      <Toaster />
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