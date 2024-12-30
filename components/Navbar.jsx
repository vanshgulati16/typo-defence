import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold font-mono">
              ⌨️ Typo Defence
            </Link>
            <div className="flex gap-4">
              <Link 
                href="/" 
                className="font-medium hover:text-primary/80"
              >
                Home
              </Link>
              <Link 
                href="/leaderboard" 
                className="font-medium hover:text-primary/80"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              className="neubrutalism-border neubrutalism-shadow"
            >
              Log in
            </Button>
            <Button 
              className="neubrutalism-border neubrutalism-shadow"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
