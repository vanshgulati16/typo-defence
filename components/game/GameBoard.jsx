'use client'

import { useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useGameStore } from '@/lib/stores/gameStore'
import { gameConfig } from '@/lib/utils/gameConfig'
import { EnemyLayer } from './EnemyLayer'
import { TypeInput } from './TypeInput'
import { GameHUD } from './GameHUD'
import { WaveMessage } from './WaveMessage'
import { GameOverPopup } from './GameOverPopup'
import { Progress } from "@/components/ui/progress"

export function GameBoard() {
  const { 
    health, 
    score, 
    wave, 
    highScore,
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

  const handleExit = () => {
    // Instead of quitting directly, set gameOver to true
    actions.endGame()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Progress value={health} className="w-32" />
          <span className="text-sm">Health: {health}%</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 font-mono">
            <div className="flex flex-col items-end">
              <span className="text-sm text-muted-foreground">High Score</span>
              <span>{highScore}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-muted-foreground">Score</span>
              <span>{score}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-muted-foreground">Wave</span>
              <span>{wave}</span>
            </div>
          </div>
          <Button 
            variant="destructive" 
            size="icon"
            onClick={handleExit}
            className="neubrutalism-border neubrutalism-shadow"
            title="Exit Game"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="h-[480px] relative rounded-lg bg-[#F5F5F5] overflow-hidden neubrutalism-border">
        {/* Defense Line */}
        <div className="absolute right-8 top-0 bottom-0 w-2 bg-black/20" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-black/5" />
        
        <EnemyLayer />
        {showWaveMessage && <WaveMessage wave={wave} />}
        {gameOver && <GameOverPopup />}
      </div>
      <TypeInput />
    </Card>
  )
} 