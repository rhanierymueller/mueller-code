import { ButtonHTMLAttributes } from "react"
import { cn } from "../lib/utils"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn("inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus:outline-none focus:ring-2 focus:ring-ring", className)}
      {...props}
    />
  )
}
