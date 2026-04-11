"use client"
import { motion, useReducedMotion } from "motion/react"

const SPRING_HOVER = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 1,
}

interface SpringCardProps {
  children: React.ReactNode
  className?: string
}

export function SpringCard({ children, className }: SpringCardProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        y: -2,
        boxShadow: "0 4px 12px oklch(0.85 0.18 105 / 0.06)",
      }}
      transition={SPRING_HOVER}
    >
      {children}
    </motion.div>
  )
}
