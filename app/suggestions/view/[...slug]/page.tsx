"use client";

import React, { useId } from 'react'
import { Button, Spin } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { useMainContext } from '@/context';
import CustomModal from '@/_mycomponents/foreignModal';
import ReviewForm from '@/suggestions/_components/reviewForm';
import { useGetSuggestionByID } from '@/_hooks/useSuggestions';
import { DescriptionBox } from '@/suggestions/_components/descriptionBox';
import { ImageContainer } from '@/suggestions/_components/imageContainer';
import { MiniImages } from '@/suggestions/_components/miniImages';
import { Reviews } from '@/suggestions/_components/reviews';
import { useGetReviewsBySuggestionID } from '@/_hooks/useReview';



// ? The param in the url is named slug and contains the name of the suggestion and the id in an array. The name is the first value of the array while the id is the second. So we need to use the second value of the slug to make our query.

const ReviewSection = ({params} : {params: {slug: string[]}}) => {
  const {slug} = params
  const { openModal, handleCloseModal, modal: {open, type}} = useMainContext();
  const id = useId();
  
  const {data: suggestionList, error: errorSuggestionList, isLoading: isLoadingSuggestionList } = useGetSuggestionByID(slug[1]);
  const {data: reviewData, error: errorReviews, isLoading: isLoadingReviews} = useGetReviewsBySuggestionID(slug[1]);
  
  // ? The returned data from the query is a list with just one value - the suggestion object. So we need to use the first value of the list. If the list is empty, it means the suggestion was not found.
  
  if (isLoadingReviews) return <Spin spinning={true} size="large" />;
  if(!reviewData || !suggestionList) return <h1>An issue occurred while loading this page. Please try again or contact administrator.</h1>;

  const suggestion = suggestionList[0];

  console.log(reviewData[0], "reviews");

  return (
    <div className='text-black w-full'>
      <h1 className='text-4xl font-semibold mb-2 text-center'>{suggestion.name}</h1>
      <div className='italic flex justify-center gap-10 mb-3'>
        <span>Suggested by: <strong>{suggestion.suggesterName}</strong></span>
        <span>Ready in: <strong>{suggestion.duration || 'N/A'}</strong></span>
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

      <section key={suggestion.id} className='border-dashed mt-5'>
        <DescriptionBox heading='Description' content={suggestion.description} type='textarea' />
        { suggestion.recipe && <DescriptionBox heading='How to make/Recipe' type='textarea' content={suggestion.recipe} /> }
        <div key={`${id}container`}>
          <div className='flex justify-between items-center pb-3 border-b-2 border-b-gray-200 mb-3'>
            <h1 className='text-lg font-bold'>Reviews</h1>
            <Button className='bg-yellow-700 font-semibold text-stone-200 rounded-xl border-2 border-yellow-700 hover:text-yellow-700 hover:border-yellow-700' onClick={() => openModal("add_review")}>Add review <FaPlus className='ml-3' /></Button>

          </div>
        </div>
        {
          !reviewData || reviewData.length === 0 ? (
            <p className='italic text-gray-300'>No reviews yet. Be the first to give a review.</p>
          ) : (
            reviewData.map((review : IReview, i : number) => (<Reviews review={review} key={`${review.email}${i}`} />))
          )
        }
      </section>


      {
        /* Review form modal */

        type === 'add_review' && (
        <CustomModal
          open={open}
          onCancel={handleCloseModal}
          okText='Add Review'
        >
          <ReviewForm id={slug[1]} />
        </CustomModal>
        )
      }
    </div>

  )

}

export default ReviewSection;

