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
        "absolute",
        "px-4 py-2 rounded-md font-mono text-sm",
        "transition-all duration-100",
        wave <= 2 && "bg-primary/80 text-primary-foreground",
        wave > 2 && wave <= 4 && "bg-yellow-500/80 text-black",
        wave > 4 && "bg-destructive/80 text-destructive-foreground",
        isMatching && "ring-2 ring-white scale-110 shadow-lg",
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