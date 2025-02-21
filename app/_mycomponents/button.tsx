import { Button } from 'antd'
import React from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

type TButton = {
  type?: "button" | "submit" | "reset"
  className?: string
  text: string
  role?: string
}
const MyButton = ({type, className, text, role} : TButton) => {
  return (
    <button className={`w-full text-stone-50 py-2 px-3 rounded-lg border-2 border-yellow-900 bg-yellow-500 text-lg ${className}`} type={type || "button"} role={role}>{text}</button>
  )
}

export const BackButton = () => {
  function handleBack () {
    window.history.back()
  }
  
  return (
    <button onClick={handleBack}><IoArrowBackCircleOutline color='#000000' size={50} /></button>
  );
}

export default MyButton