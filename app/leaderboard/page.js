'use client'
import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

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
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/leaderboard', {
          credentials: 'include'
        });
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] p-8 bg-gradient-to-b from-background to-background/80">
        <main className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
          <Card className="p-6 neubrutalism-border neubrutalism-shadow">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 font-bold text-lg border-b pb-2">
                  <span className="w-32">Rank</span>
                  <span>Player</span>
                  <span className="text-right">High Score</span>
                </div>
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="grid grid-cols-3 items-center">
                    <span className="font-mono flex items-center gap-2 w-32">
                      {entry.rank <= 3 && getMedalEmoji(entry.rank)}
                      #{entry.rank}
                    </span>
                    <span>{entry.username}</span>
                    <span className="font-mono text-right">{entry.score}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </main>
      </div>
    </>
  )
} 