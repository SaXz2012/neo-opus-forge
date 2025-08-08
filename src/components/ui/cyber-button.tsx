import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cyberButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-cyber tracking-wide relative overflow-hidden",
  {
    variants: {
      variant: {
        default: 
          "glass-panel text-glass-foreground hover:shadow-neon border-neon-cyan/20 hover:border-neon-cyan/60 hover:text-neon-cyan",
        neon: 
          "bg-gradient-neon text-background hover:shadow-neon border border-neon-cyan hover:shadow-pink scale-100 hover:scale-105",
        ghost: 
          "border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon",
        outline: 
          "border-2 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon",
        destructive:
          "glass-panel text-destructive-foreground border-destructive/20 hover:border-destructive hover:shadow-[0_0_20px_hsl(var(--destructive)/0.5)]",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 border border-secondary/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CyberButton.displayName = "CyberButton"

export { CyberButton, cyberButtonVariants }