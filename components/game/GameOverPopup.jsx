import { useGameStore } from '@/lib/stores/gameStore'
import { Button } from "@/components/ui/button"

export function GameOverPopup() {
  const { score, highScore, wave, actions } = useGameStore()

  const isNewHighScore = score >= highScore

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg text-center neubrutalism-border neubrutalism-shadow">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        
        <div className="space-y-4 mb-6">
          <div className="text-lg">
            Wave Reached: <span className="font-mono font-bold">{wave}</span>
          </div>
          <div className="text-lg">
            Final Score: <span className="font-mono font-bold">{score}</span>
          </div>
          
          {isNewHighScore ? (
            <div className="text-lg text-green-600 font-bold">
              🎉 New High Score! 🎉
            </div>
          ) : (
            <div className="text-lg">
              High Score: <span className="font-mono font-bold">{highScore}</span>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={actions.startGame}>
            Try Again
          </Button>
          <Button 
            size="lg" 
            variant="destructive" 
            onClick={actions.quitGame}
          >
            Quit
          </Button>
        </div>
      </div>
    </div>
  )
} 