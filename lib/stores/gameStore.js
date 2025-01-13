import { create } from 'zustand'
import { generateWord } from '@/lib/utils/wordGenerator'


// const getInitialHighScore = () => {
//   if (typeof window !== 'undefined') {
//     return parseInt(localStorage.getItem('highScore') || '0')
//   }
//   return 0
// }

export const useGameStore = create((set, get) => ({
  // State
  enemies: [],
  health: 100,
  score: 0,
  highScore: 0,
  wave: 1,
  isPlaying: false,
  showWaveMessage: true,
  destroyedCount: 0,
  gameOver: false,
  wordLists: null,
  isLoading: false,
  currentWord: '',
  scoreUpdated: false,
  lastFetchedAt: null,
  username: '',

  // Actions
  actions: {
    spawnEnemy: (yPosition) => {
      const { wave } = get()
      const newEnemy = generateWord(wave, yPosition)
      set((state) => ({
        enemies: [...state.enemies, newEnemy]
      }))
    },

    fetchHighScore: async () => {
      const state = get();
      const now = Date.now();
      // Only fetch if no cache or cache expired (5 minutes)
      if (!state.lastFetchedAt || now - state.lastFetchedAt > 300000) {
        try {
          const response = await fetch('/api/leaderboard/my-score', {
            credentials: 'include'
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ 
              highScore: data.score || 0,
              lastFetchedAt: now
            });
          }
        } catch (error) {
          console.error('Error fetching high score:', error);
        }
      }
    },

    startGame: async () => {
      const actions = get().actions;
      set({ isLoading: true });
      
      try {
        // Only fetch high score if not cached
        if (!get().lastFetchedAt) {
          await actions.fetchHighScore();
        }
        await actions.fetchWords();
        
        set({ 
          isPlaying: true, 
          showWaveMessage: true, 
          gameOver: false, 
          health: 100, 
          score: 0, 
          wave: 1, 
          destroyedCount: 0,
          isLoading: false,
          scoreUpdated: false // Reset score update flag
        });
      } catch (error) {
        console.error('Error starting game:', error);
        set({ isLoading: false });
      }
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
      const damage = isSpecial ? 15 : amount;
      const newHealth = Math.max(0, state.health - damage);

      if (newHealth === 0) {
        return { 
          health: newHealth, 
          gameOver: true,
          enemies: [],
        };
      }

      return { health: newHealth };
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

    quitGame: () => {
      set({
        isPlaying: false,
        gameOver: false,
        health: 100,
        score: 0,
        wave: 1,
        enemies: [],
        currentWord: '',
        showWaveMessage: false,
        isLoading: false,
        scoreUpdated: false
      });
    },

    updateHighScore: async () => {
      const state = get();
      
      // Prevent multiple updates in the same session
      if (!state.gameOver || state.scoreUpdated || state.score <= state.highScore) {
        return false;
      }

      try {
        const response = await fetch('/api/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: state.score,
            username: state.username
          }),
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            set({ 
              highScore: state.score,
              scoreUpdated: true
            });
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error('Error updating leaderboard:', error);
        return false;
      }
    },

    endGame: () => {
      set({
        gameOver: true,
        enemies: [],
        isPlaying: true,
        scoreUpdated: false
      });
    },

    fetchWords: async () => {
      try {
        const response = await fetch('/api/generate-words', {
          method: 'POST'
        });
        const words = await response.json();
        set({ wordLists: words });
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    },

    setUsername: (name) => set({ username: name }),
  }
}))