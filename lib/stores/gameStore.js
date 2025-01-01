import { create } from 'zustand'
import { generateWord } from '@/lib/utils/wordGenerator'

export const useGameStore = create((set, get) => ({
  // State
  enemies: [],
  health: 100,
  score: 0,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
  wave: 1,
  isPlaying: false,
  showWaveMessage: true,
  destroyedCount: 0,
  gameOver: false,

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
      set({ isPlaying: true, showWaveMessage: true, gameOver: false, health: 100, score: 0, wave: 1, destroyedCount: 0 });
    },

    destroyEnemy: (id) => set((state) => {
      const newDestroyedCount = state.destroyedCount + 1
      const waveThreshold = 10 + (state.wave - 1) * 5
      const enemy = state.enemies.find(e => e.id === id)
      // console.log('Enemy found:', enemy)

      const actions = get().actions
      actions.updateScore(100, enemy?.isSpecial)

      if (newDestroyedCount >= waveThreshold) {
        return {
          enemies: state.enemies.map(enemy => 
            enemy.id === id ? { ...enemy, isDestroyed: true } : enemy
          ),
          destroyedCount: 0,
          wave: state.wave + 1,
          showWaveMessage: true
        }
      }

      return {
        enemies: state.enemies.map(enemy => 
          enemy.id === id ? { ...enemy, isDestroyed: true } : enemy
        ),
        destroyedCount: newDestroyedCount
      }
    }),

    removeEnemy: (id) => set((state) => ({
      enemies: state.enemies.filter(enemy => enemy.id !== id)
    })),

    damageHealth: (amount, isSpecial = false) => set((state) => {
      const damage = isSpecial ? 15 : amount
      const newHealth = Math.max(0, state.health - damage)

      console.log('isSpecial:', isSpecial, 'Damage dealt:', damage)

      if (newHealth === 0) {
        const newHighScore = state.score > state.highScore ? state.score : state.highScore
        localStorage.setItem('highScore', newHighScore.toString())
        
        return { 
          health: newHealth, 
          gameOver: true,
          highScore: newHighScore,
          enemies: [],
        }
      }
      return { health: newHealth }
    }),

    updateScore: (points, isSpecial = false) => set((state) => ({
      score: state.score + (isSpecial ? points * 2 : points)
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

    hideWaveMessage: () => set({ showWaveMessage: false }),

    quitGame: () => set({
      isPlaying: false,
      gameOver: false,
      health: 100,
      score: 0,
      wave: 1,
      enemies: [],
      destroyedCount: 0,
      showWaveMessage: true
    }),

    endGame: () => set({
      gameOver: true,
      enemies: [], // Clear enemies when ending game
    })
  }
}))