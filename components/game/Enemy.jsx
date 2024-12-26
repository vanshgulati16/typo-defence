import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { popAnimation, destroyAnimation } from '@/lib/utils/animations'

export function Enemy({ 
  id, 
  word, 
  x, 
  y, 
  speed, 
  wave, 
  isMatching,
  isDestroyed,
  onReachEnd 
}) {
  const enemyRef = useRef()

  useEffect(() => {
    if (x >= 85) { // Adjust this value to match the Defense Line position
      onReachEnd()
    }
  }, [x, onReachEnd])

  useEffect(() => {
    if (enemyRef.current) {
      popAnimation(enemyRef.current)
    }
  }, [])

  useEffect(() => {
    if (isDestroyed && enemyRef.current) {
      destroyAnimation(enemyRef.current)
    }
  }, [isDestroyed])

  return (
    <div
      ref={enemyRef}
      className={cn(
        "absolute px-4 py-2 rounded-md font-mono text-base font-bold",
        "neubrutalism-border neubrutalism-shadow",
        "transition-all duration-100",
        wave <= 2 && "bg-[#FFE14C] text-black",
        wave > 2 && wave <= 4 && "bg-[#9EE493] text-black",
        wave > 4 && "bg-[#FF6B6B] text-black",
        isMatching && "ring-4 ring-black scale-110",
        isDestroyed && "pointer-events-none"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className={cn(
        "transition-colors",
        isMatching && "text-white font-bold"
      )}>
        {word}
      </span>

      {isDestroyed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="particle-container" />
        </div>
      )}
    </div>
  )
}