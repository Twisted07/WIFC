"use client"
import React from 'react'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { UserCircleIcon } from 'lucide-react'
import CustomModal from './foreignModal';
import Signin from '@/_signin/page';
import { useMainContext } from '@/context';
import Link from 'next/link';


const Header = () => {
  const { openModal, modal: { open, type }, handleCloseModal, signin, handleSignout } = useMainContext();
  const items: MenuProps['items'] = [
    {
      key: 'profile-view',
      label: (
        <Link target="_self" rel="noopener noreferrer" href="/profile">
          Profile
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <button onClick={handleSignout}>
          Logout
        </button>
      ),
    },
  ];

  return (
    <header className='h-[5rem] px-5 w-full bg-yellow-500 border-b-2 border-b-yellow-600 text-stone-200 flex justify-between items-center'>
      <Link href="/suggestions" className='text-3xl font-bold text-center'>WIFC</Link>

      {signin
        ? (
          <Dropdown menu={{ items }} placement="bottomRight">
            <button type='button' className='text-3xl'>{JSON.parse(sessionStorage.getItem("wifc-user") as string).name}</button>
          </Dropdown>
        )
        : (<button type="button" onClick={() => openModal("signin")}><UserCircleIcon size={50} /></button>)
      }

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
    </header>
  )
}


// const items: MenuProps['items'] = [
//   {
//     key: 'profile-view',
//     label: (
//       <Link target="_blank" rel="noopener noreferrer" href="/profile">
//         Profile
//       </Link>
//     ),
//   },
//   {
//     key: 'logout',
//     label: (
//       <button onClick={handleSignout}>
//         Logout
//       </button>
//     ),
//   },
// ];

// <Space direction="vertical">
//   <Space wrap>
//     <Dropdown menu={{ items }} placement="bottomRight">
//       <button type='button' className='text-3xl'>{JSON.parse(sessionStorage.getItem("wifc-user") as string).name}</button>
//     </Dropdown>
//   </Space>
// </Space>

export default Header