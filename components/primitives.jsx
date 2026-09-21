'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const EASE = [0.22, 1, 0.36, 1]

export const revealParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const revealChild = {
  hidden: { opacity: 0, y: 30, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}

export function RevealGroup({
  children,
  className,
  as = 'div',
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      variants={revealParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </Comp>
  )
}

export function SectionLabel({
  children,
  className,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="size-[5px] rotate-45 bg-[#c59a55]" />
      <span className="label-xs text-[#c59a55] font-medium">{children}</span>
      <span className="h-px w-10 gold-rule sm:w-16" />
    </div>
  )
}

/**
 * A CSS-rendered cinematic bronze surface used in place of photography.
 * `seed` shifts the light position and hue so each instance reads differently.
 */
export function BronzeSurface({
  seed = 0,
  label,
  className,
}) {
  const x = 28 + ((seed * 37) % 45)
  const y = 22 + ((seed * 23) % 40)
  const rot = (seed * 31) % 180

  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 overflow-hidden bg-[#0c0b09]', className)}
    >
      {/* primary bronze light source */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 55% at ${x}% ${y}%, rgba(224,190,122,0.34), rgba(197,154,85,0.14) 38%, transparent 72%)`,
        }}
      />
      {/* counter light for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at ${100 - x}% ${100 - y}%, rgba(107,81,48,0.4), transparent 68%)`,
        }}
      />
      {/* raking metal sheen */}
      <div
        className="absolute inset-[-30%]"
        style={{
          transform: `rotate(${rot}deg)`,
          background:
            'repeating-linear-gradient(90deg, transparent 0 14px, rgba(224,190,122,0.05) 14px 15px, transparent 15px 40px)',
        }}
      />
      {/* soft sculptural bands */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(224,190,122,0.12) 0%, transparent 26%, rgba(8,8,7,0.55) 58%, rgba(197,154,85,0.08) 78%, transparent 100%)',
        }}
      />
      {/* concentric orbital etching */}
      <div
        className="absolute top-1/2 left-1/2 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            'repeating-radial-gradient(circle, transparent 0 26px, rgba(197,154,85,0.12) 26px 27px)',
          maskImage:
            'radial-gradient(circle, rgba(0,0,0,0.9) 20%, transparent 70%)',
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.5] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 85% at 50% 50%, transparent 35%, rgba(8,8,7,0.85) 100%)',
        }}
      />
      {label ? (
        <span className="absolute bottom-5 left-5 label-xs text-[rgba(197,154,85,0.5)]">
          {label}
        </span>
      ) : null}
    </div>
  )
}

export function Pill({ children }) {
  return (
    <span className="label-xs rounded-full border border-[rgba(197,154,85,0.3)] bg-[#11100e] px-3 py-1.5 text-[#a49d90]">
      {children}
    </span>
  )
}
