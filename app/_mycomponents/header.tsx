"use client"

import { UserCircleIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import CustomModal from './foreignModal';
import Signin from '@/_signin/page';
import { MainContext } from '@/context';

const Header = () => {
  const {modal , handleCloseModal, openModal} = useContext(MainContext);

  function handleClick() {
    console.log("clicked");
    openModal();
    console.log(modal, "modal");
  }

  return (
    <div className='h-[5rem] px-5 w-full bg-yellow-500 border-b-2 border-b-yellow-600 text-stone-200 flex justify-between items-center'>
      <h1 className='text-3xl font-bold text-center'>WIFC</h1>
      <button type="button" onClick={openModal}><UserCircleIcon size={50} /></button>

      <CustomModal
        open={modal}
        onCancel={handleCloseModal}
      >
        <Signin />
      </CustomModal>
    </div>
  )
}

export default Header