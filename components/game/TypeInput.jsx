import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useGameStore } from '@/lib/stores/gameStore'
// import { playSound } from '@/lib/utils/sound'  // Commented for now

export function TypeInput() {
  const [input, setInput] = useState('')
  const { enemies, actions } = useGameStore()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      
      const matchedEnemy = enemies.find(enemy => 
        enemy.word.toLowerCase() === input.toLowerCase() &&
        !enemy.isDestroyed
      )

      if (matchedEnemy) {
        // playSound('hit')  // Commented for now
        actions.destroyEnemy(matchedEnemy.id)
        actions.updateScore(100)
        setInput('')
      } else {
        // playSound('error')  // Commented for now
      }
    }
  }

  const handleInput = (e) => {
    const value = e.target.value
    setInput(value)
  }

  return (
    <Input
      value={input}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      className="mt-4 text-lg font-mono"
      placeholder="Type the word and press Enter..."
      autoFocus
    />
  )
}