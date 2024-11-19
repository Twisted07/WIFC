import { Card } from '@/_components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


type TSuggestionCard = {
  data: any
}

const SuggestionCard = ({data} : TSuggestionCard) => {
  const pathname = usePathname();

  return (
    // <div className='flex'>
      <Link href={`${pathname}/view/${data}`}><Card className='h-[25rem] justify-self-center md:w-full w-[18rem] bg-stone-300 text-yellow-700' /></Link>
    // </div>
  )
}

export default SuggestionCard