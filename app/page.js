'use client'
import { GameBoard } from "@/components/game/GameBoard"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/stores/gameStore"
import { Navbar } from "@/components/Navbar"
import { cn } from "@/lib/utils"
import { Keyboard, Sparkles, Target } from "lucide-react"
import { useState, useEffect } from "react"
import { Cover } from "@/components/ui/cover";
import Particles from "@/components/ui/particles";
import RetroGrid from "@/components/ui/retro-grid";

export default function Home() {
  const { isPlaying, gameOver, actions } = useGameStore()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")


  // Reset loading states when game is over or not playing
  useEffect(() => {
    if (!isPlaying || gameOver) {
      setIsLoading(false)
      setLoadingText("")
    }
  }, [isPlaying, gameOver])

  const handleStartGame = async () => {
    setIsLoading(true)
    const text = "LOADING..."
    let currentText = ""
    
    for (let i = 0; i < text.length; i++) {
      currentText += text[i]
      setLoadingText(currentText)
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    actions.startGame()
  }


  return (
    <>
      {!isPlaying && <Navbar />}
      <div className={cn(
        "min-h-screen bg-gradient-to-b from-background to-background/80",
        !isPlaying ? "pt-[calc(2rem+64px)] px-8" : "p-8"
      )}>
        {(!isPlaying && !gameOver) ? (
          <div className="relative">
            <RetroGrid />
            <Particles
              className="absolute inset-0 z-0"
              quantity={100}
              ease={80}
              color="#000000"
              refresh
            />
            <main className="container max-w-5xl mx-auto relative z-10">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-6">
                  <Cover>Typo Defence</Cover>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  A unique typing challenge where you must match the typos exactly! See "accomodate"? 
                  Type it wrong, just like that. But watch out for special golden words - 
                  these rare appearances require the correct spelling for bonus points!
                </p>
                <Button 
                  size="lg" 
                  onClick={handleStartGame}
                  disabled={isLoading}
                  className="neubrutalism-border neubrutalism-shadow text-lg px-8 py-6"
                >
                  {isLoading ? loadingText : "Start Game"}
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
          </div>
        ) : (
          <main className="container max-w-4xl mx-auto">
            <GameBoard />
          </main>
        )}
      </div>
    </>
  )
}
