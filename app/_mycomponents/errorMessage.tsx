import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

type TErrorMessage = {
  message: string
  className?: string
}
const ErrorMessage = ({message, className} : TErrorMessage) => {
  return (
    <p className={`text-red-500 text-sm flex items-center gap-1 mt-1 ${className}`}><FaExclamationCircle />{message}</p>
  )
}

export default ErrorMessage