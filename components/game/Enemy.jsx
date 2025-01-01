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
  isSpecial,
  onReachEnd 
}) {
  const enemyRef = useRef()

  useEffect(() => {
    if (x >= 85) {
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
        isSpecial ? "bg-amber-300 border-amber-600" : cn(
          wave === 1 && "bg-[#ffb800] text-black", // Warm yellow that matches the game's playful style
          wave === 2 && "bg-[#9EE493] text-black",
          wave === 3 && "bg-[#FF6B6B] text-black",
          wave === 4 && "bg-[#A78BFA] text-black",
          wave === 5 && "bg-[#F472B6] text-black",
        ),
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
      {isSpecial && <span className="absolute -top-2 -right-2 text-xs">✨</span>}

      {isDestroyed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="particle-container" />
        </div>
      )}
    </div>
  )
}