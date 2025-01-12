"use client"

import { UserCircleIcon } from 'lucide-react'
import React from 'react'
import CustomModal from './foreignModal';
import Signin from '@/_signin/page';
import { useMainContext } from '@/context';
import Link from 'next/link';


const Header = () => {
  const { openModal, modal: { open, type }, handleCloseModal, signin, handleSignout} = useMainContext();

  return (
    <header className='h-[5rem] px-5 w-full bg-yellow-500 border-b-2 border-b-yellow-600 text-stone-200 flex justify-between items-center'>
      <Link href="/suggestions" className='text-3xl font-bold text-center'>WIFC</Link>
      
      { signin 
        ? ( <button type='button' className='text-3xl' onClick={handleSignout}>{JSON.parse(sessionStorage.getItem("wifc-user") as string).name}</button> )
        : ( <button type="button" onClick={() => openModal("signin")}><UserCircleIcon size={50} /></button> )
      }

      {
        type === "signin" && (
          <CustomModal
            open={open}
            onCancel={handleCloseModal}
          >
            <Signin />
          </CustomModal>
        )
      }
    </header>
  )
}

export default Header