'use client'
import { GameBoard } from "@/components/game/GameBoard"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/stores/gameStore"
import { Navbar } from "@/components/Navbar"
import { cn } from "@/lib/utils"
import { Keyboard, Sparkles, Target } from "lucide-react"

export default function Home() {
  const { isPlaying, gameOver, actions } = useGameStore()

  return (
    <>
      {!isPlaying && <Navbar />}
      <div className={cn(
        "min-h-screen bg-gradient-to-b from-background to-background/80",
        !isPlaying ? "pt-[calc(2rem+64px)] px-8" : "p-8"
      )}>
        {(!isPlaying && !gameOver) ? (
          <main className="container max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold mb-6">
                Typo Defense
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A unique typing challenge where you must match the typos exactly! See "accomodate"? 
                Type it wrong, just like that. But watch out for special golden words - 
                these rare appearances require the correct spelling for bonus points!
              </p>
              <Button 
                size="lg" 
                onClick={actions.startGame}
                className="neubrutalism-border neubrutalism-shadow text-lg px-8 py-6"
              >
                Start Game
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-lg neubrutalism-border neubrutalism-shadow">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <Keyboard className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Match The Typos</h3>
                <p className="text-muted-foreground">
                  See "definately"? Type it exactly like that! Master the art of 
                  matching common typing mistakes like "recieve" and "seperate"
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg neubrutalism-border neubrutalism-shadow">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Golden Word Bonus</h3>
                <p className="text-muted-foreground">
                  Special golden words appear randomly - type these correctly 
                  ("definitely", "receive") for double points and extra time!
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg neubrutalism-border neubrutalism-shadow">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Progressive Waves</h3>
                <p className="text-muted-foreground">
                  Face increasingly challenging typos and more frequent golden words 
                  as you advance through waves. How long can you keep up?
                </p>
              </div>
            </div>
          </main>
        ) : (
          <main className="container max-w-4xl mx-auto">
            <GameBoard />
          </main>
        )}
      </div>
    </>
  )
}
