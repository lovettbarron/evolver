"use client"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef, useMemo } from "react"

const SPRING_REVEAL = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
}

interface StaggerGroupProps {
  children: React.ReactNode
  className?: string
  staggerMs?: number
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function StaggerGroup({ children, className, staggerMs = 50 }: StaggerGroupProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const shouldReduce = useReducedMotion()

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerMs / 1000,
        },
      },
    }),
    [staggerMs]
  )

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={SPRING_REVEAL}
    >
      {children}
    </motion.div>
  )
}
