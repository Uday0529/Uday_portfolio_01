'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export function GoldCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.35 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    let currentActive = false

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const el = e.target
      const isInteractive = Boolean(el?.closest('a, button, [role="button"], input, textarea, select'))
      if (isInteractive !== currentActive) {
        currentActive = isInteractive
        setActive(isInteractive)
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [x, y, visible])

  if (!enabled) return null

  return (
    <motion.span
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden rounded-full border border-[#c59a55] lg:block"
      style={{
        x: sx,
        y: sy,
        width: 26,
        height: 26,
        marginLeft: -13,
        marginTop: -13,
        backgroundColor: active ? 'rgba(197,154,85,0.16)' : 'transparent',
      }}
      animate={{
        scale: active ? 1.6 : 1,
        opacity: visible ? (active ? 1 : 0.6) : 0,
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
