'use client'

import { useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { useGameStore } from '@/lib/stores/gameStore'
import { gameConfig } from '@/lib/utils/gameConfig'
import { EnemyLayer } from './EnemyLayer'
import { TypeInput } from './TypeInput'
import { GameHUD } from './GameHUD'
import { WaveMessage } from './WaveMessage'
import { GameOverPopup } from './GameOverPopup'

export function GameBoard() {
  const { 
    health, 
    score, 
    wave, 
    isPlaying, 
    showWaveMessage, 
    gameOver, 
    actions 
  } = useGameStore()
  
  // Handle wave spawning
  useEffect(() => {
    if (!isPlaying || showWaveMessage || gameOver) return
    
    console.log("Spawning enemies...");
    const waveConfig = gameConfig.waves[wave]
    const spawnInterval = setInterval(() => {
      const randomY = Math.random() * 60 + 20
      actions.spawnEnemy(randomY)
    }, waveConfig.spawnInterval)

    return () => clearInterval(spawnInterval)
  }, [isPlaying, wave, showWaveMessage, gameOver, actions])

  // Hide wave message after a delay
  useEffect(() => {
    if (showWaveMessage) {
      const timer = setTimeout(() => {
        actions.hideWaveMessage()
      }, 2000) // Adjust duration as needed

      return () => clearTimeout(timer)
    }
  }, [showWaveMessage, actions])

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <GameHUD health={health} score={score} wave={wave} />
      <div className="h-[480px] relative border rounded-lg bg-black/10 overflow-hidden">
        {/* Defense Line */}
        <div className="absolute right-8 top-0 bottom-0 w-1 bg-red-500/20" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-red-500/5" />
        
        <EnemyLayer />
        {showWaveMessage && <WaveMessage wave={wave} />}
        {gameOver && <GameOverPopup />}
      </div>
      <TypeInput />
    </Card>
  )
} 