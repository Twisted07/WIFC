"use client"
import { Button } from '@/_components/ui/button';
import { FaPlus } from 'react-icons/fa'
import React, { useContext, useEffect, useRef, useState } from 'react'
// import Modal from '@/_mycomponents/modal';
import { Modal } from 'antd';
import CustomModal from '@/_mycomponents/foreignModal';
import ReviewForm from '@/suggestions/_components/reviewForm';
import { MainContext } from '@/context';

type TReview = {
  name: string,
  review: string,
  rating: string,
  email: string,
}

type TSuggestion = {
  userName: string,
  duration: string,
  meal: string,
  images?: [],
  description: string,
  recipe: string,
  reviews: TReview[]
}


const suggestion: TSuggestion = {
  userName: 'Twisted',
  duration: '30 minutes',
  meal: 'Bread and Beans',
  images: [],
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque minus assumenda rerum pariatur non voluptates illum aliquid, fugiat qui et iste ducimus aspernatur consequuntur. Eveniet, est nostrum? Molestiae, fugit laboriosam. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse ducimus velit. Autem, quod tempore? Repellendus quo facere necessitatibus minima illo doloremque molestiae cupiditate explicabo molestias distinctio aliquid, dolore quam!',
  recipe: `Here are the steps to make this recipe:
        1. Preheat oven to 350°F (180°C).
        2. Mix all the ingredients together in a bowl.
        3. Pour the mixture into a baking dish.
        4. Bake for 30 minutes.
        5. Serve hot.`,
  reviews: [
    {
      name: 'Twisted',
      review: "Tastes so good and wasn't so difficult to prepare. Great meal!",
      rating: '5',
      email: 'twisted@gmail.com',
    },
    {
      name: 'Bravo',
      review: "Nice suggestion. I enjoyed it as a breakfast dish.",
      rating: '4',
      email: 'bravo@gmail.com'
    },
    {
      name: 'Morikonkolo',
      review: "Lovely meal! I enjoyed mine glazing it with honey... so heavenly!",
      rating: '5',
      email: 'morikonkolo@gmail.com'
    }
  ],

};

const SuggestionDetails = () => {
  const [modal, setModal] = useState(false);


  function handleModalToggle() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }



  return (
    <div className='text-black w-full'>
      <h1 className='text-4xl font-semibold mb-2 text-center'>{suggestion.meal}</h1>
      <div className='italic flex justify-center gap-10 mb-3'>
        <span>Suggested by: <strong>{suggestion.userName}</strong></span>
        <span>Ready in: <strong>{suggestion.duration}</strong></span>
      </div>
      <section className='flex flex-col items-center'>
        <div className='mb-5'>
          <ImageContainer />
          <div className='flex gap-3 mt-5'>
            <MiniImages />
            <MiniImages />
            <MiniImages />
            <MiniImages />
            <MiniImages />
            <MiniImages text="View All" />
          </div>
        </div>
      </section>
      <section className='border-dashed mt-5'>
        <DescriptionBox heading='Description' content={suggestion.description} />

        <DescriptionBox heading='How to make/Recipe' type='textarea' content={suggestion.recipe} />

        <div>
          <div className='flex justify-between items-center pb-3 border-b-2 border-b-gray-200 mb-3'>
            <h1 className='text-lg font-bold'>Reviews</h1>
            <Button className='bg-yellow-700 font-semibold text-stone-200 rounded-xl border-2 border-yellow-700 hover:text-yellow-700 hover:border-yellow-700' onClick={handleModalToggle}>Add review <FaPlus className='ml-3' /></Button>
          </div>
        </div>
        {
          suggestion.reviews.map(review => (<Reviews review={review} key={review.email} />))
        }
      </section>

      
      <CustomModal
        open={modal}
        onCancel={handleCloseModal}
        onSubmit={handleCloseModal}
        okText='Add Review'
      >
        <ReviewForm onDone={handleCloseModal} />
      </CustomModal>
    </div>
  )
}

const ImageContainer = () => {
  return (
    <div className='w-[50rem] h-[30rem] bg-yellow-700'></div>
  );
}

const MiniImages = ({ text = "" }) => {
  return (
    <div className='w-[7rem] h-[5rem] bg-yellow-300'>{text}</div>
  );
}

const DescriptionBox = ({ heading, content = "", type }: { heading: string, content: string, type?: string }) => {
  return (
    <article className='mt-5'>
      <h1 className='text-lg font-semibold pb-3 border-b-2 border-b-gray-200 mb-3'>{heading}</h1>
      {
        type === 'textarea' ? (
          <textarea className='italic tracking-wide bg-transparent w-full resize-none' rows={15} value={content} disabled></textarea>
        ) : (
          <p className='italic tracking-wide'>{content}</p>
        )
      }
    </article>
  );
}

const Reviews = ({ review }: { review: TReview }) => {
  return (
    <div className='border-2 py-3 px-5 rounded-xl bg-white bg-opacity-5 text-black mb-3'>
      <div className='flex justify-between items-start mb-2'>
        <div className='font-semibold'>
          <h1 className='text-lg'>{review.name}</h1>
          <h6 className='text-gray-400 italic'>{review.email}</h6>
        </div>
        <span className='font-bold'>{review.rating} star</span>
      </div>
      <p className='italic tracking-wide text-lg'>{review.review}</p>
    </div>
  );
}


export default SuggestionDetails