"use client"

import { Card } from '@/_components/ui/card'
import Image from 'next/image'
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
      <Link href={`${pathname}/view/${data.name}/${data.id}`}>
        {
          data.image.length === 0
          ? <Card className='h-[25rem] justify-self-center rounded-lg md:w-full w-[18rem] bg-stone-300 text-yellow-700' />
          : <div className=' justify-self-center md:w-full w-[18rem] rounded-lg' style={{backgroundImage: `url(${data.image[0]})`, aspectRatio: 1/1, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
          // : <Image src={data.image[0]} alt={`${data.name} image`} className='aspect-square object-contain' width={50} height={50} />
        }
      </Link>
    // </div>
  )
}

/**
 * TODO: use object-cover and aspect-ratio: square to define the image sizes
 */
export default SuggestionCard