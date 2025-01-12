"use client"
import { Toast } from '@/_components/ui/toast';
import { createReview, updateSuggestion } from '@/_lib/data-service';
import ErrorMessage from '@/_mycomponents/errorMessage';
import ModalFooter from '@/_mycomponents/modalFooter';
import { MainContext } from '@/context';
import { useMutation } from '@tanstack/react-query';
import { Button, ConfigProvider, Switch } from 'antd'
import React, { useContext, useRef, useState } from 'react'


const ReviewForm = ({id} : {id: string}) => {
  const [anon, setAnon] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(3);

  const {handleCloseModal} = useContext(MainContext);

  const mutation = useMutation({
    mutationFn: (formData : IReview) => createReview(id, formData),
    onSuccess: () => {location.reload()}
  })


  function __reset() {
    setAnon(false);
    setEmail("");
    setDisplayName("");
    setReview("");
    setError("");
    setRating(3);
  }

  function toggleAnon() {
    setAnon((anon) => !anon);

  }

  function handleEmail(e: any) {
    setEmail(e.target.value);
  }

  function handleDisplayName(e: any) {
    setDisplayName(e.target.value);
  }

  function handleReview(e: any) {
    setReview(e.target.value);
  }

  function handleRating(e: any) {
    setRating(+e.target.value);
  }

  function handleCancel() {
    // Clear the input and close the modal
    __reset();
    handleCloseModal();
  }

  function handleSubmit(e: any) {
    /**
     * The schema => {
     * "email": "string",
     * "displayName": "string",
     * "review": "string",
     * "rating": "number"
     * }
     * 
     * ? The form is meant to contain the values used to render the review cards. Since we have the anonymous option, we need to have that handled as well. We should also see how to handle malicious inputs to the database 'cause I currently don't know how to implement strict schema check in the database, so as to forbid wrong payloads. In the meantime, we ensure the data is as clean as possible before sending it to the server.
     */
    
    e.preventDefault();
    
    if (!review.trim()) { setError("review"); return; }

    if (!anon) {
      if (!email.trim()) { setError("email"); return; }
      else if (!displayName.trim()) { setError("displayName"); return; }
    }


    const formData : IReview = {
      email: email.trim() || "",
      name: displayName.trim() || "Anonymous",
      review: review.trim(),
      rating,
      suggestionID: +id,
    };
    
    mutation.mutate(formData);
    
    __reset();
    handleCloseModal();
  }



  return (
    <form>
      <div className='flex items-center font-semibold gap-5 mb-5 text-md lg:text-xl'>
        <label htmlFor='anonymous w-full'>Add review anonymously</label>
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: "rgb(161, 98, 7)",
                colorPrimaryHover: "rgb(190, 120, 4)"
              }
            }
          }}
        >
          <Switch size='small' checked={anon} onChange={toggleAnon} id='anonymous' autoFocus />
        </ConfigProvider>
      </div>
      
      {
        !anon && (
          <div className='space-y-3'>
            <div>
              <label htmlFor="review_email" className='md:text-lg lg:block'>Email</label>
              <input className='border border-gray-300 rounded-md w-full py-1 px-2 active:outline-none active:border-yellow-700 focus:outline-none focus:border-yellow-700 focus:border-2' type="email" placeholder='abc@gmail.com' name='review_email' id='review_email' value={email} onChange={handleEmail} required={!anon} />
              {error === "email" && <ErrorMessage message='Please fill in a valid input' />}
            </div>
            <div>
              <label htmlFor="review_display_name" className='md:text-lg lg:block'>Preferred Display Name</label>
              <input type="text" placeholder='Food Lover' name='display_name' className='border border-gray-300 rounded-md w-full py-1 px-2 active:outline-none active:border-yellow-700 focus:outline-none focus:border-yellow-700 focus:border-2' id='review_display_name' value={displayName} onChange={handleDisplayName} />
              {error === "displayName" && <ErrorMessage message='Please fill in a valid input' />}
            </div>
          </div>
        )
      }
      <div className='mt-3'>
        <label htmlFor="review_rating" className='md:text-lg lg:block'>Rating</label>
        <input type="number" value={rating} onChange={handleRating} name="review_rating" className='w-full resize-none border rounded-md active:outline-none active:border-yellow-700 focus:outline-none focus:border-yellow-700 focus:border-2 py-2 px-3' min={1} max={5} id="review_rating" />
      </div>

      <div className='mt-3'>
        <label htmlFor="review_content" className='md:text-lg lg:block'>Review</label>
        {/* <TextArea name='review_content' id='review_content' value={review} onChange={handleReview} rows={7}/> */}
        <textarea name="review_content" id="review_content" rows={7} className='w-full resize-none border rounded-md active:outline-none active:border-yellow-700 focus:outline-none focus:border-yellow-700 focus:border-2 py-2 px-3' value={review} onChange={handleReview} required spellCheck={true} ></textarea>
        {error === "review" && <ErrorMessage message='Please fill in a valid input' />}
      </div>

      <ModalFooter className='mt-5' onSubmit={handleSubmit} onCancel={handleCancel} /> 
    </form>
  )
}

export default ReviewForm