"use client"
import CustomModal from '@/_mycomponents/foreignModal'
import MyInput from '@/_mycomponents/input'
import { Button, ConfigProvider, Spin } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import PasswordEdit from './password'
import { useMainContext } from '@/context'
import { useRouter } from 'next/navigation'
import { fetchUserSuggestions, getUserByEmail, updateUser } from '@/_lib/data-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'

const ProfilePage = () => {
  /**
   * Load the profile data from the database:
   *  - User data: name, email, password, etc.
   *  - User suggestions
   * Render the data
   * Give room for mutation of the data:
   *  - Edit name
   *  - Edit email: has to come with authentication before approving the process
   *  - Edit password
   */

  // TODO: Handle authorization
  // TODO: Use graphQL for fetching data
  const [edit, setEdit] = useState("");
  const [currUser, setCurrUser] = useState({} as IUser);
  const [displayName, setDisplayName] = useState("");
  const [currEmail, setCurrEmail] = useState("");
  const [email, setEmail] = useState("");
  const { openModal, handleCloseModal, modal: {open, type}} = useMainContext();

  // ? The sessionStorage seems to load late, so it throws an error in the console before it updates. This is a temporary fix pending a better solution.
  useEffect(()=> {
    if (sessionStorage){
      let user = JSON.parse(sessionStorage.getItem('wifc-user') as string);
      setEmail(user.email);
    }
  }, [email])


  // * Fetch user data and Suggestions data
  const {data: user, error, isLoading} = useQuery(
    {
      queryKey: ["user", email],
      queryFn: () => getUserByEmail(email)
    }
  )
  const {data: userSuggestions, isLoading: isLoadingSuggestions} = useQuery({
    queryKey: ["userSuggestions", currUser.id],
    queryFn: () => fetchUserSuggestions(currUser.id as number)
  })


  // * Handle user data update
  const mutation = useMutation({
    mutationFn: (data : {userData: Partial<IUser>, id: number}) => updateUser(data.userData, data.id),
  })
  
  
  // * Subscribe to the user data update and use it to update the user, displayname and email
  useEffect(() => {
    if (user) {
      setCurrUser(user[0])
      setDisplayName(user[0].name)
      setCurrEmail(user[0].email)
    }
  }, [user])
  

  // * FUNCTIONS
  function toggleEdit(input : string) {
    setEdit(input);
  }
  
  function handleEdit() {
    // TODO: Check if the display name already exists
    const updatedData = {
      name: displayName.trim()
    }

    mutation.mutate({userData: updatedData, id: currUser.id as number});
    if (mutation.isSuccess) {
     toast.success("Display name updated successfully!");
     setTimeout(()=>{
       toggleEdit("");
     }, 2000) 
    }
  }
  
  

  // * MAIN
  if (isLoading) return <Spin />
  if (error) return <div>Failed to load user data</div>


  return (
    <div>
      <Toaster />
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
              <MyInput value={displayName} onChange={(e) => setDisplayName(e.target.value)} type="text" name="name" id="name" disabled={!(edit === "displayName") || mutation.isPending} validity={false}/>
              {
                edit === "displayName" ? <Button onClick={handleEdit} variant='solid' loading={mutation.isPending}>Save</Button>
                  : <button type="button" onClick={() => toggleEdit("displayName")}><FaEdit /></button>
              }
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <h6 className='basis-[12%]'>Email</h6>
            <div className="flex gap-3 basis-[40%]">
              <MyInput value={currEmail} onChange={() => console.log("input")} type="email" name="email" id="email" disabled={!(edit === "email")} validity={false} />

                {/* To be re-introduced when a proper system for editing user data is implemented */}
              {/* {
                edit === "email" ? <Button onClick={handleEdit} variant='solid'>Verify</Button>
                  : <button type="button" onClick={() => toggleEdit("email")}><FaEdit /></button>
              } */}
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
        {isLoadingSuggestions ? (<Spin />) :
          (<div className='flex items-center gap-5 mt-7'>
            {/* {suggestionList.map(suggestion => (<ProfileSuggestion key={suggestion} />))} */}
            {
              userSuggestions?.length === 0 ? (<h6>You do not have any suggestions yet.</h6>)
              : (userSuggestions?.map((suggestion : ISuggestion) => <ProfileSuggestion image={suggestion.image} key={suggestion.id} />))
            }
          </div>)
        }
      </section>

      <Button type='primary' className='mt-10' danger>Delete Account</Button>

      {
        type === "editPass" &&  
          <CustomModal
            open={open}
            onCancel={handleCloseModal}
          >
            <PasswordEdit id={currUser.id as number} />
          </CustomModal>
      }
    </div>
  )
}

const ProfileSuggestion = ({image} : any) => {
  return (
    <div className='w-[10rem] h-[12rem] rounded-md' style={{backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
  );
}

export default ProfilePage