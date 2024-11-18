import { ParticleEffect } from '@/components/game/ParticleEffect'
import { gsap } from 'gsap'

export function popAnimation(element) {
  gsap.fromTo(element, 
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
  )
}

export function destroyAnimation(element) {
//   gsap.to(element, {
//     scale: 0,
//     opacity: 0,
//     duration: 0.3,
//     ease: 'power2.in',
//     onComplete: () => {
//       gsap.set(element, { clearProps: 'all' })
//     }
//   })
<ParticleEffect/>
}
