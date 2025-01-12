import { Loader2 } from "lucide-react"

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg text-center neubrutalism-border neubrutalism-shadow">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-lg font-bold">Generating Words...</p>
        <p className="text-sm text-muted-foreground">Preparing your challenge</p>
      </div>
    </div>
  )
} 