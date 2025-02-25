'use client'
import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

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
  const { user } = useUser()
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    async function animateLoading() {
      const text = "Loading..."
      let currentText = ""
      
      while (loading) {
        for (let i = 0; i < text.length; i++) {
          if (!loading) break;
          currentText += text[i]
          setLoadingText(currentText)
          await new Promise(resolve => setTimeout(resolve, 300))
        }
        if (!loading) break;
        await new Promise(resolve => setTimeout(resolve, 1000))
        currentText = ""
        setLoadingText("")
      }
    }

    if (loading) {
      animateLoading()
    }
  }, [loading])

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

  const isCurrentUser = (username) => {
    if (!user) return false;
    const currentUsername = user.username || user.firstName || 'Player';
    return username === currentUsername;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] p-8 bg-gradient-to-b from-background to-background/80">
        <main className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
          <Card className="p-6 neubrutalism-border neubrutalism-shadow">
            {loading ? (
              <div className="text-center py-8">{loadingText}</div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 font-bold text-lg border-b pb-2">
                  <span className="w-32">Rank</span>
                  <span>Player</span>
                  <span className="text-right">High Score</span>
                </div>
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={cn(
                      "grid grid-cols-3 items-center p-2 rounded-lg transition-colors",
                      isCurrentUser(entry.username) && "bg-primary/10 font-medium"
                    )}
                  >
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