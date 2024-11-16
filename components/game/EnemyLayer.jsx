import { useEffect, useRef } from 'react'
import { useGameStore } from '@/lib/stores/gameStore'
import { Enemy } from './Enemy'
import { ParticleEffect } from './ParticleEffect'

export function EnemyLayer() {
  const containerRef = useRef()
  const { enemies, actions } = useGameStore()

  useEffect(() => {
    const interval = setInterval(() => {
      actions.moveEnemies()
    }, 100) // Adjust the interval as needed for smooth movement

    return () => clearInterval(interval)
  }, [actions])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
    >
      {enemies.map((enemy) => {
        if (enemy.isDestroyed) return null; // Skip rendering destroyed enemies

        const handleReachEnd = () => {
          const defenseLinePosition = 70; // Adjust this value to match the Defense Line position
          if (enemy.x >= defenseLinePosition) {
            actions.damageHealth(10)
            actions.removeEnemy(enemy.id)
          }
        }

        return (
          <Enemy
            key={enemy.id}
            {...enemy}
            onReachEnd={handleReachEnd}
          />
        )
      })}
      <ParticleEffect />
    </div>
  )
}