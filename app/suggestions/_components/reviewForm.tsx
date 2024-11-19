
import { Toast } from '@/_components/ui/toast';
import ErrorMessage from '@/_mycomponents/errorMessage';
import { MainContext } from '@/context';
import { Button, ConfigProvider, Switch } from 'antd'
import React, { useContext, useRef, useState } from 'react'

const ReviewForm = ({onDone} : any) => {
  const [anon, setAnon] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(3);


  function __reset() {
    setAnon(false);
    setEmail("");
    setDisplayName("");
    setReview("");
    setError("");
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
    onDone();
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    
    if (!review.trim()) { setError("review"); return; }

    if (!anon) {
      if (!email.trim()) { setError("email"); return; }
      else if (!displayName.trim()) { setError("displayName"); return; }
    }

    const formData = {
      email: email.trim() ?? "",
      displayName: displayName.trim() ?? "Anonymous",
      review: review.trim(),
    };

    console.log(formData, "formData");
    __reset();
    onDone();

    // TODO: Send the review to the server
  }




  return (
    <form className='pt-10 pb-3 md:pb-5 md:px-5'>
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

      <div className='justify-end mt-5 flex'>
        <Button variant='outlined' className='mr-5' style={{borderColor: "rgb(161, 98, 7)", color: "rgb(161, 98, 7)"}} onClick={handleCancel}>Cancel</Button>
        <Button type='primary' style={{backgroundColor: "rgb(161, 98, 7)"}} onClick={handleSubmit}>Submit</Button>
      </div>
    </form>
  )
}

export default ReviewForm