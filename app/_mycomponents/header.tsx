"use client"

import { UserCircleIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import CustomModal from './foreignModal';
import Signin from '@/_signin/page';
import { useMainContext } from '@/context';


const Header = () => {
  const { openModal, modal: { open, type }, handleCloseModal} = useMainContext();

  return (
    <div className='h-[5rem] px-5 w-full bg-yellow-500 border-b-2 border-b-yellow-600 text-stone-200 flex justify-between items-center'>
      <h1 className='text-3xl font-bold text-center'>WIFC</h1>
      <button type="button" onClick={() => openModal("signin")}><UserCircleIcon size={50} /></button>

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
    </div>
  )
}

export default Header