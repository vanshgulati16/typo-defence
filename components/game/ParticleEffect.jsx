import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGameStore } from '@/lib/stores/gameStore'

export function ParticleEffect() {
  const particlesRef = useRef([])
  const { particles } = useGameStore()

  useEffect(() => {
    if (!particles) return // Guard clause for undefined particles

    particles.forEach((particle, index) => {
      const element = particlesRef.current[index]
      if (!element) return

      gsap.to(element, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(element, { clearProps: "all" })
        }
      })
    })
  }, [particles])

  if (!particles || particles.length === 0) return null // Return null if no particles

  return (
    <div className="pointer-events-none">
      {particles?.map((particle, index) => (
        <div
          key={particle.id}
          ref={el => particlesRef.current[index] = el}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}