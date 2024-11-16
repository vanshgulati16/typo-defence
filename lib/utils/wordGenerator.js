const wordLists = {
  wave1: ['cat', 'dog', 'run', 'jump', 'type', 'code', 'play'],
  wave2: ['quick', 'speed', 'flash', 'swift', 'rapid', 'dash'],
  wave3: ['typing', 'faster', 'coding', 'racing', 'sprint'],
  wave4: ['velocity', 'keyboard', 'lightning', 'speedtype'],
  wave5: ['challenge', 'mastering', 'quicksilver', 'thunderbolt']
}

export function generateWord(wave = 1, yPosition = 50) {
  const waveKey = `wave${Math.min(wave, 5)}`
  const words = wordLists[waveKey]
  const word = words[Math.floor(Math.random() * words.length)]

  return {
    id: Math.random().toString(36).substring(2, 9),
    word,
    wave,
    x: 0,
    y: yPosition,
    speed: 0.5 + (wave * 0.1),
    isMatching: false,
    isDestroyed: false
  }
}