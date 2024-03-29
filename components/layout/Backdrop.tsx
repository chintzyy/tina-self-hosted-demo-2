// 'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

      {/* <style jsx global> */}
      {/*   {backdropStyling} */}
      {/* </style> */}

const Backdrop = ({ image }) => {
//   const [isPortalReady, setIsPortalReady] = useState(null)
//   let portalContainerRef = useRef(null)

//   const backdropStyling = `
// body {
// background-image: linear-gradient(rgba(255, 255, 255, 0.7) 30%, rgba(255, 255, 255, 0) 70%), url(${image});
// background-attachment: fixed;
// background-size: cover;
// background-repeat: no-repeat;
// }
// ` 


//   useLayoutEffect(() => {
//     const portalContainer = document.createElement('div')

//     portalContainer.setAttribute('id', 'backdrop-container')


//     document.body.prepend(portalContainer)
//     if (portalContainer) portalContainerRef.current = portalContainer 

//     // Render the portal content into the ref's container
//     // const portalContainerEl = document.getElementById('backdrop-container');
//     setIsPortalReady(true)
//   }, [])

  if (!image) return null

  return (
    <Image
      src={image}
      alt="background image"
      loading="lazy"
      width="0"
      height="0"
      sizes="100vh"
      style={{position: 'fixed', height: 'auto', width: '100vw', zIndex: '-10'}}
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMM0Nr1HwAEOwI1Q0SZcwAAAABJRU5ErkJggg=="
      placeholder="blur"
      // unoptimized
    />

  )

  // return (
  //   <style jsx global>
  //     {backdropStyling}
  //   </style>

  // )

  // return (
  //   isPortalReady ?
  //     createPortal(
  //       <Image
  //         src="http://assets.cliftonpark.wa.edu.au.s3.ap-southeast-1.amazonaws.com/background-images/wood-work.jpg"
  //         alt="background image"
  //         loading="lazy"
  //         width="0"
  //         height="0"
  //         sizes="100vh"
  //         style={{position: 'fixed', height: 'auto', width: '100vw', zIndex: '-10'}}
  //       />,
  //       portalContainerRef.current
  //     )
  //     : null
  // )
}

export default Backdrop
