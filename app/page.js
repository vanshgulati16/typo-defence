'use client'
import { GameBoard } from "@/components/game/GameBoard"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/stores/gameStore"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  const { isPlaying, gameOver, actions } = useGameStore()

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] p-8 bg-gradient-to-b from-background to-background/80">
        <main className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Typo Defense</h1>
          {(!isPlaying && !gameOver) ? (
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
    </>
  )
}
