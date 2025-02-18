import { Carousel } from 'antd'
import Image from 'next/image'
import React from 'react'

const ImageCarousel = ({images} : {images: any}) => {
  console.log(images, "images")
  return (
    <div className='p-5 bg-yellow-700 rounded-xl w-[700px]'>
      <Carousel arrows fade adaptiveHeight>
        {
          images.map((image : string) => (
            <div key={image} className='flex justify-center items-center'>
              <Image src={image} alt='Food image' width={700} height={700} />
              {/* <img src={image} width={700} /> */}
            </div>
            
          ))
        }
      </Carousel>
    </div>
  )
}

export default ImageCarousel