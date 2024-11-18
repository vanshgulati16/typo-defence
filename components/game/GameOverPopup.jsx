import { useGameStore } from '@/lib/stores/gameStore'
import { Button } from "@/components/ui/button"

export function GameOverPopup() {
  const { actions } = useGameStore()

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">You couldn't protect your defense line!</h2>
        <Button size="lg" onClick={actions.startGame}>
          Retry
        </Button>
        <Button size="lg" onClick={actions.quitGame} className="ml-4">
          Quit
        </Button>
      </div>
    </div>
  )
} 