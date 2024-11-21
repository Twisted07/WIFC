import MyInput from '@/_mycomponents/input'
import MyLabel from '@/_mycomponents/label'
import ModalFooter from '@/_mycomponents/modalFooter'
import PasswordInput from '@/_mycomponents/password'
import { useMainContext } from '@/context'
import React, { useState } from 'react'

const PasswordEdit = () => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [error, setError] = useState("");

  const {handleCloseModal} = useMainContext();

  function __reset() {
    setCurrPass("");
    setNewPass("");
    setRePass("");
    setError("");
  }

  function handleCancel() {
    __reset();
    handleCloseModal();
  }

  function handleSubmit() {
    if (newPass !== rePass || !currPass || !newPass || !rePass) {
      setError("Please fill in all fields correctly");
      return;
    }
  }

  return (
    <form>
      <div className='space-y-3 mb-7'>
        {error &&  <p className='text-lg text-red-500 font-semibold'>{error}</p> }
        <div>
          <MyLabel htmlFor='currPass'>Old Password</MyLabel>
          <MyInput type='password' value={currPass} onChange={(e) => setCurrPass(e.target.value)} name='curr_password' id='currPass' validity={false} />
        </div>

        <div>
          <MyLabel htmlFor='newPass'>New Password</MyLabel>
          <PasswordInput name='new_password' id='newPass' value={newPass} setValue={setNewPass} />
        </div>

        <div>
          <MyLabel htmlFor='rePass'>Confirm Password</MyLabel>
          <PasswordInput name='confirm_password' id='rePass' value={rePass} setValue={setRePass} />
          { (newPass !== rePass && rePass && newPass) && <span className='text-red-500 text-sm font-semibold italic'>Passwords are not the same ❌</span> }
        </div>
      </div>

      <ModalFooter onCancel={handleCancel} onSubmit={handleSubmit} confirmText="Reset" />
    </form>
  )
}

export default PasswordEdit 