import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md bg-white px-4 py-2 text-base shadow-sm",
        "neubrutalism-border neubrutalism-shadow",
        "focus-visible:outline-none focus-visible:ring-0",
        "placeholder:text-gray-500",
        className
      )}
      ref={ref}
      {...props} 
    />
  )
})
Input.displayName = "Input"

export { Input }
