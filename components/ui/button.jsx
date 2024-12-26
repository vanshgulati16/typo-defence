import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neubrutalism-border neubrutalism-shadow",
  {
    variants: {
      variant: {
        default: "bg-[#FFE14C] hover:bg-[#FFD700] text-black",
        destructive: "bg-[#FF6B6B] hover:bg-[#FF4949] text-black",
        outline: "bg-white hover:bg-gray-100 text-black",
        secondary: "bg-[#9EE493] hover:bg-[#7ED672] text-black",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
