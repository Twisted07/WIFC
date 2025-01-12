"use client"
import { Button } from '@/_components/ui/button'
import CustomModal from '@/_mycomponents/foreignModal'
import React, { useContext } from 'react'
import CreateSuggestion from '../_create/page'
import { MainContext } from '@/context'

const AddSuggestionButton = () => {
  const { handleCloseModal, modal: {type, open}, openModal, signin } = useContext(MainContext);

  function handleSuggestClick() {
    signin ? openModal('create_suggestion') : openModal('signin')
  }
  return (
    <>
      <Button className='bg-yellow-500 border-2 border-yellow-700 text-stone-100 font-semibold rounded-full' onClick={ handleSuggestClick }>Suggest Meal</Button>

    {
      type === "create_suggestion" && (
        <CustomModal
          open={open}
          onCancel={handleCloseModal}
          title={"Create suggestion"}
        >
          <CreateSuggestion />
        </CustomModal>
      )
    }
    </>
  )
}

export default AddSuggestionButton