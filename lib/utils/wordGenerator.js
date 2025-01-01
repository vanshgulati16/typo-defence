const wordLists = {
  // Regular typos (intentionally misspelled)
  wave1: ['cat', 'dog', 'run', 'jump', 'typ', 'cod', 'play'],
  wave2: ['quik', 'sped', 'flsh', 'swft', 'rapd', 'dash'],
  wave3: ['typng', 'fastr', 'codng', 'racng', 'sprnt'],
  wave4: ['velocty', 'keybord', 'lightnng', 'spdtype'],
  wave5: ['chalenge', 'mastring', 'qiksilver', 'thundrblt'],

  // Special words (correct spelling)
  special: {
    wave1: ['cat', 'dog', 'run', 'jump', 'type', 'code', 'play'],
    wave2: ['quick', 'speed', 'flash', 'swift', 'rapid', 'dash'],
    wave3: ['typing', 'faster', 'coding', 'racing', 'sprint'],
    wave4: ['velocity', 'keyboard', 'lightning', 'speedtype'],
    wave5: ['challenge', 'mastering', 'quicksilver', 'thunderbolt']
  }
}

export function generateWord(wave = 1, yPosition = 50) {
  const waveKey = `wave${Math.min(wave, 5)}`
  
  // Calculate chance of special word based on wave
  const specialWordChance = wave === 1 ? 0 : Math.min(0.1 + (wave * 0.05), 0.3)
  
  // Determine if this should be a special word
  const isSpecial = wave > 1 && Math.random() < specialWordChance
  
  // Select word list and get random word
  const words = isSpecial ? wordLists.special[waveKey] : wordLists[waveKey]
  const word = words[Math.floor(Math.random() * words.length)]

  return {
    id: Math.random().toString(36).substring(2, 9),
    word,
    wave,
    x: 0,
    y: yPosition,
    speed: 0.5 + (wave * 0.1),
    isMatching: false,
    isDestroyed: false,
    isSpecial: isSpecial,
    points: isSpecial ? 200 : 100
  }
}