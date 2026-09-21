'use client'

import { motion } from 'motion/react'
import { EASE } from './primitives'

export function PageTransition({
  children,
  direction = 'up',
}) {
  const offset = direction === 'right' ? { x: 60, y: 0 } : { x: 0, y: 34 }

  return (
    <>
      {/* dark overlay lifting away */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-[#080807]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
      />
      {/* gold line sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[91] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(224,190,122,0.9), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.85, ease: EASE }}
      />
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
      >
        {children}
      </motion.div>
    </>
  )
}
