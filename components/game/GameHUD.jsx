import { Progress } from "@/components/ui/progress"

export function GameHUD({ health, score, wave, highScore }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <Progress value={health} className="w-32" />
        <span className="text-sm">Health: {health}%</span>
      </div>
      <div className="flex gap-4">
        <span className="font-mono">Score: {score}</span>
        <span className="font-mono">Wave: {wave}</span>
        <span className="font-mono">High Score: {highScore}</span>
      </div>
    </div>
  )
}