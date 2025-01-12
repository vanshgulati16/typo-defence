import { useGameStore } from '@/lib/stores/gameStore'

// Default word lists in case API fails
const defaultWordLists = {
  wave1: {
    typos: ['cat', 'dog', 'run', 'jump', 'typ', 'cod', 'play'],
    special: ['cat', 'dog', 'run', 'jump', 'type', 'code', 'play']
  },
  wave2: {
    typos: ['quik', 'sped', 'flsh', 'swft', 'rapd', 'dash'],
    special: ['quick', 'speed', 'flash', 'swift', 'rapid', 'dash']
  },
  wave3: {
    typos: ['typng', 'fastr', 'codng', 'racng', 'sprnt'],
    special: ['typing', 'faster', 'coding', 'racing', 'sprint']
  },
  wave4: {
    typos: ['velocty', 'keybord', 'lightnng', 'spdtype'],
    special: ['velocity', 'keyboard', 'lightning', 'speedtype']
  },
  wave5: {
    typos: ['chalenge', 'mastring', 'qiksilver', 'thundrblt'],
    special: ['challenge', 'mastering', 'quicksilver', 'thunderbolt']
  }
}

export function generateWord(wave = 1, yPosition = 50) {
  const store = useGameStore.getState();
  const waveKey = `wave${Math.min(wave, 5)}`;
  
  // Use default words if API words aren't loaded yet
  const wordLists = store.wordLists || defaultWordLists;
  
  const specialWordChance = wave === 1 ? 0 : Math.min(0.1 + (wave * 0.05), 0.3);
  const isSpecial = wave > 1 && Math.random() < specialWordChance;
  
  const words = isSpecial ? 
    wordLists[waveKey].special : 
    wordLists[waveKey].typos;
    
  const word = words[Math.floor(Math.random() * words.length)];

  console.log(`Generated ${isSpecial ? 'special' : 'typo'} word:`, word);

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