import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold font-mono">
              ⌨️ Typo Defence
            </span>
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
