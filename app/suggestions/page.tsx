"use client"
import React, { Key, useContext, useEffect } from 'react'
import SuggestionCard from './_components/suggestionCard'
import AddSuggestionButton from './_components/createButton';

const SuggestionPage = () => {
  // ? This is meant to render the suggestions from the database and a button that allows users add their own suggestion
  // ? The suggestions are rendered as cards with the following actions: like, view, and these attributes: image, title, by, category (breakfast, lunch, dinner, any time)


  const tempList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-5 gap-3 justify-center mx-auto my-0">
      {tempList.map(suggestion => (<SuggestionCard key={suggestion} />))}

      <div className="fixed bottom-10 left-[50%] translate-x-[-50%]">
        <AddSuggestionButton />
      </div>
    </div>
  )
}

export default SuggestionPage