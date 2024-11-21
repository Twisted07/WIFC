"use client"

import React, { InputHTMLAttributes, useRef } from 'react'

interface TInput extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  validity?: boolean
}

export const errorBorder = 'border-red-500 focus:border-red-500 outline-red-500';
export const greenBorder = 'border-yellow-700 focus:border-green-500 outline-green-500';

const MyInput = (props : TInput) => {

  const ref = useRef<any>(null);
  const {type = 'text', id, name, value, onChange, placeholder, required = false, className, validity = true, ...rest} = props;

  return (
    <input ref={ref} className={`${validity ? (!ref?.current?.validity?.valid ? (errorBorder) : (greenBorder)) : ('focus:border-yellow-700 outline-yellow-700')} w-full border-yellow-700 border rounded-md py-1 px-2 ${className}`} type={type} id={id} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} {...rest} />
  )
}

export default MyInput