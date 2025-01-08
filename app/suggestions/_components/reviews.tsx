export const Reviews = ({ review }: { review: IReview }) => {
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