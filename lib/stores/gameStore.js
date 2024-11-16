import { create } from 'zustand'
import { generateWord } from '@/lib/utils/wordGenerator'

export const useGameStore = create((set, get) => ({
  // State
  enemies: [],
  health: 100,
  score: 0,
  wave: 1,
  isPlaying: false,
  showWaveMessage: false,

  // Actions
  actions: {
    spawnEnemy: (yPosition) => {
      const { wave } = get()
      const newEnemy = generateWord(wave, yPosition)
      set((state) => ({
        enemies: [...state.enemies, newEnemy]
      }))
    },

    startGame: () => {
      set({ isPlaying: true, showWaveMessage: false });
    },

    destroyEnemy: (id) => set((state) => ({
      enemies: state.enemies.map(enemy => 
        enemy.id === id ? { ...enemy, isDestroyed: true } : enemy
      )
    })),

    removeEnemy: (id) => set((state) => ({
      enemies: state.enemies.filter(enemy => enemy.id !== id)
    })),

    damageHealth: (amount) => set((state) => ({
      health: Math.max(0, state.health - amount)
    })),

    updateScore: (points) => set((state) => ({
      score: state.score + points
    })),

    highlightMatchingEnemies: (input) => set((state) => ({
      enemies: state.enemies.map(enemy => ({
        ...enemy,
        isMatching: enemy.word.toLowerCase().startsWith(input.toLowerCase())
      }))
    })),

    moveEnemies: () => {
      set((state) => ({
        enemies: state.enemies.map(enemy => ({
          ...enemy,
          x: enemy.x + enemy.speed
        }))
      }))
    },
  }
}))