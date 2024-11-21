"use client"
import CustomModal from '@/_mycomponents/foreignModal'
import MyInput from '@/_mycomponents/input'
import { Button, ConfigProvider } from 'antd'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import PasswordEdit from './password'
import { useMainContext } from '@/context'

const ProfilePage = () => {
  const suggestionList = [1, 2, 3, 4, 5];
  const [edit, setEdit] = useState("");
  const [displayName, setDisplayName] = useState("Twisted");

  const { openModal, handleCloseModal, modal: {open, type}} = useMainContext();

  function toggleEdit(input : string) {
    setEdit(input);
  }

  function handleEdit() {
    console.log(displayName, "display name");
    toggleEdit("");
  }

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorBorder: '#00cc00',
              colorText: '#00cc00',
              colorBgContainer: '#ffffff00',
              fontSize: 16,
            }
          }
        }}
      >
        <section className='space-y-5 mb-7 text-stone-700'>
          <div className="flex gap-5 items-center">
            <h6 className='basis-[12%]'>Display Name</h6>
            <div className="flex gap-3 basis-[40%] items-center">
              <MyInput value={displayName} onChange={(e) => setDisplayName(e.target.value)} type="text" name="name" id="name" disabled={!(edit === "displayName")} validity={false}/>
              {
                edit === "displayName" ? <Button onClick={handleEdit} variant='solid'>Save</Button>
                  : <button type="button" onClick={() => toggleEdit("displayName")}><FaEdit /></button>
              }
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <h6 className='basis-[12%]'>Email</h6>
            <div className="flex gap-3 basis-[40%]">
              <MyInput value={"test@gmail.com"} onChange={() => console.log("input")} type="email" name="email" id="email" disabled={!(edit === "email")} validity={false} />
              {
                edit === "email" ? <Button onClick={handleEdit} variant='solid'>Verify</Button>
                  : <button type="button" onClick={() => toggleEdit("email")}><FaEdit /></button>
              }
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <h6 className='basis-[12%]'>Password</h6>
            <div className="flex gap-3 basis-[40%]">
              <MyInput value={"password"} onChange={() => console.log("input")} type="password" name="password" id="password" disabled />
              <button type="button" onClick={() => openModal("editPass")}><FaEdit /></button>
            </div>
          </div>
        </section>
      </ConfigProvider>

      <section>
        <h6 className='text-stone-700 text-xl font-semibold'>Suggestions</h6>
        <hr className='border-1 mt-2 border-yellow-700' />
        <div className='flex items-center gap-5 mt-7'>
          {suggestionList.map(suggestion => (<ProfileSuggestion key={suggestion} />))}
        </div>
      </section>

      <Button type='primary' className='mt-10' danger>Delete Account</Button>

      {
        type === "editPass" &&  
          <CustomModal
            open={open}
            onCancel={handleCloseModal}
          >
            <PasswordEdit />
          </CustomModal>
      }
    </div>

  )
}

const ProfileSuggestion = () => {
  return (
    <div className='w-[10rem] h-[12rem] bg-yellow-700 rounded-md'></div>
  );
}

export default ProfilePage