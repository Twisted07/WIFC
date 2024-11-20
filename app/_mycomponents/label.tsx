import React, { LabelHTMLAttributes } from 'react'

const MyLabel = (props : LabelHTMLAttributes<HTMLLabelElement>) => {
  const {htmlFor, children, className, ...rest} = props;
  return (
    <label className={`w-full text-lg ${className}`} htmlFor={htmlFor} {...rest}>{children}</label>
  )
}

export default MyLabel