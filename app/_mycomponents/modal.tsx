"use client"
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

type TModal = {
  open: any
  onClose: any
  children: React.ReactNode
}
const Modal : React.FC<TModal> = ({open, onClose, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleCloseModal () {
    if (onClose) {
      onClose();
    }
    setIsOpen(false);
  }

  useEffect(()=> {
    if (open) {
      setIsOpen(true)
    }
  }, [open])


  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#00000077',
        backdropFilter: 'blur(5px)',
        position: 'fixed',
        top: '0',
        left: '0',
        display: isOpen ? 'block' : 'none',
      }}

    >
      <div
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFFFFF',
          height: '30rem'
        }}
      >
        <button className='absolute right-5 top-3' onClick={handleCloseModal}><IoClose /></button>
        {children}
      </div>
    </div>
  )
}

export default Modal