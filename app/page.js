'use client'
import { GameBoard } from "@/components/game/GameBoard"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/stores/gameStore"

export default function Home() {
  const { isPlaying, actions } = useGameStore()

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-background to-background/80">
      <main className="container max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Typo Defense</h1>
        {!isPlaying ? (
          <div className="text-center">
            <Button size="lg" onClick={actions.startGame}>
              Start Game
            </Button>
          </div>
        ) : (
          <GameBoard />
        )}
      </main>
    </div>
  )
}
