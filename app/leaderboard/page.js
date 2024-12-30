import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/ui/card"

const getMedalEmoji = (rank) => {
  switch (rank) {
    case 1:
      return "🥇"
    case 2:
      return "🥈"
    case 3:
      return "🥉"
    default:
      return null
  }
}

export default function Leaderboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] p-8 bg-gradient-to-b from-background to-background/80">
        <main className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
          <Card className="p-6 neubrutalism-border neubrutalism-shadow">
            <div className="space-y-4">
              <div className="grid grid-cols-3 font-bold text-lg border-b pb-2">
                <span className="w-32">Rank</span>
                <span>Player</span>
                <span className="text-right">Score</span>
              </div>
              {/* Example leaderboard entries */}
              {[
                { rank: 1, name: "Player 1", score: 10000 },
                { rank: 2, name: "Player 2", score: 8500 },
                { rank: 3, name: "Player 3", score: 7200 },
                { rank: 4, name: "Player 4", score: 6000 },
              ].map((entry) => (
                <div key={entry.rank} className="grid grid-cols-3 items-center">
                  <span className="font-mono flex items-center gap-2 w-32">
                    {getMedalEmoji(entry.rank)}
                    #{entry.rank}
                  </span>
                  <span>{entry.name}</span>
                  <span className="font-mono text-right">{entry.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </>
  )
} 