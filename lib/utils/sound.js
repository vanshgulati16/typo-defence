import { Howl } from 'howler'

// Create sound sprites
const sounds = {
  type: new Howl({
    src: ['/sounds/type.mp3'],
    volume: 0.2,
    sprite: {
      key: [0, 50]
    }
  }),
  
  hit: new Howl({
    src: ['/sounds/hit.mp3'],
    volume: 0.4
  }),

  damage: new Howl({
    src: ['/sounds/damage.mp3'],
    volume: 0.5
  }),

  gameOver: new Howl({
    src: ['/sounds/game-over.mp3'],
    volume: 0.6
  }),

  levelUp: new Howl({
    src: ['/sounds/level-up.mp3'],
    volume: 0.5
  }),

  error: new Howl({
    src: ['/sounds/error.mp3'],
    volume: 0.3
  })
}

// Temporarily disabled sound effects
export const playSound = (soundName) => {
  // Commented out for testing
  // if (sounds[soundName]) {
  //     sounds[soundName].play()
  // }
}

export const stopSound = (soundName) => {
  // Commented out for testing
  // if (sounds[soundName]) {
  //     sounds[soundName].stop()
  // }
}

export const stopAllSounds = () => {
  // Commented out for testing
  // Object.values(sounds).forEach(sound => sound.stop())
}
