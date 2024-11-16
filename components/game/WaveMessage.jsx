import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function WaveMessage({ wave }) {
  const messageRef = useRef()

  useEffect(() => {
    const element = messageRef.current
    if (!element) return

    gsap.fromTo(element,
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5,
        ease: "back.out" 
      }
    )

    const tl = gsap.timeline()
    tl.to(element, {
      opacity: 1,
      duration: 1
    })
    .to(element, {
      opacity: 0,
      duration: 0.5,
      delay: 1
    })

    return () => tl.kill()
  }, [wave])

  return (
    <div 
      ref={messageRef}
      className="absolute inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-black/80 px-8 py-4 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Wave {wave}</h2>
        <p className="text-gray-300">
          {wave === 1 && "Simple words, take it easy!"}
          {wave === 2 && "Picking up the pace!"}
          {wave === 3 && "Multiple enemies incoming!"}
          {wave === 4 && "Complex words ahead!"}
          {wave === 5 && "Final challenge - Boss wave!"}
        </p>
      </div>
    </div>
  )
} 