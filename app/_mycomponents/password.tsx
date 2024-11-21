import React from 'react'
import MyInput from './input'
import ErrorMessage from './errorMessage'

type TPassInput = {
  value: string
  setValue: (value: string) => void
  id: string
  name: string
}

const PasswordInput = ({value, setValue, id, name}: TPassInput) => {
  return (
    <>
      <MyInput type="password" name={name} id={id} value={value} onChange={(e) => setValue(e.target.value)} minLength={7} required />
      {(value && value.length < 7) && <ErrorMessage message='Password must be at least 7 characters long' />}
    </>
  )

}

export default PasswordInput