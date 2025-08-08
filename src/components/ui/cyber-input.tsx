import * as React from "react"
import { cn } from "@/lib/utils"

export interface CyberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full glass-panel px-3 py-2 text-sm text-glass-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:border-neon-cyan/60 focus-visible:shadow-neon disabled:cursor-not-allowed disabled:opacity-50 font-sans transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CyberInput.displayName = "CyberInput"

export { CyberInput }