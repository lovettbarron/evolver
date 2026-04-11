"use client"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

const SPRING_REVEAL = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={SPRING_REVEAL}
    >
      {children}
    </motion.div>
  )
}
