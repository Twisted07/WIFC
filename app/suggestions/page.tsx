"use client"
import React from 'react'
import SuggestionCard from './_components/suggestionCard'
import AddSuggestionButton from './_components/createButton';
import { useQuery } from '@tanstack/react-query';
import { getSuggestions } from '@/_lib/data-service';
import { Spin } from 'antd';

const SuggestionPage = () => {
  // ? This is meant to render the suggestions from the database and a button that allows users add their own suggestion
  // ? The suggestions are rendered as cards with the following actions: like, view, and these attributes: image, title, by, category (breakfast, lunch, dinner, any time)

  const { data: suggestions, isLoading, isError, error } = useQuery({queryKey: ["Suggest"], queryFn: getSuggestions});

  if (isLoading) return <div className='text-center'><Spin size='large' /></div>;

  if (!suggestions) return(<h1 className='text-black text-xl text-center'>We are having trouble loading the data for this page. Please try reloading the page. If problem persists, please contact the administrator and check back later.</h1>);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-5 gap-3 justify-center mx-auto my-0">
      {suggestions?.map(suggestion => (<SuggestionCard key={suggestion.id} data={suggestion} />))}

      <div className="fixed bottom-10 left-[50%] translate-x-[-50%]">
      <AddSuggestionButton />
      </div>
    </div>
  )
}

export default SuggestionPage