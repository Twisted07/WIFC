
import React from 'react'
import { Button } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { useMainContext } from '@/context';
import CustomModal from '@/_mycomponents/foreignModal';
import ReviewForm from '@/suggestions/_components/reviewForm';
import { getOneSuggestion } from '@/_lib/data-service';
import SuggestionDetails from './details';

const ReviewSection = async ({params} : {params: {slug: string[]}}) => {
  const {slug} = params
  const suggestion = await getOneSuggestion(slug[1]);

  return (
    <SuggestionDetails suggestion={suggestion[0]} />
  )

}

export default ReviewSection;