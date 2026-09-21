'use client'

import { motion } from 'motion/react'
import { FileCheck2, KeyRound, Lock, UserCheck } from 'lucide-react'
import { EASE, SectionLabel } from './primitives'

const CARDS = [
  {
    kicker: 'JWT',
    title: 'Authentication',
    icon: KeyRound,
    text: 'Short-lived bearer tokens, refresh flow and signed claims on every request.',
  },
  {
    kicker: 'Role',
    title: 'Authorization',
    icon: UserCheck,
    text: 'Permissions enforced at controller and service level, never in the UI alone.',
  },
  {
    kicker: 'API',
    title: 'Security',
    icon: Lock,
    text: 'Rate limits, scoped credentials and least-privilege access to every resource.',
  },
  {
    kicker: 'Data',
    title: 'Validation',
    icon: FileCheck2,
    text: 'Parameterised queries and server-side validation on every write path.',
  },
]

export function Security() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-6 lg:py-36">
      <SectionLabel>Security</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1] font-light tracking-tight text-balance"
      >
        Built with security in mind
      </motion.h2>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(197,154,85,0.2)] bg-[#15130f]/75 p-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(197,154,85,0.22), transparent 70%)',
                  animation: `glow-pulse ${6 + i}s ease-in-out ${i * 0.6}s infinite`,
                }}
              />
              <Icon className="size-6 text-[#c59a55]" strokeWidth={1.25} />
              <p className="label-xs mt-8 text-[#6b5130]">{c.kicker}</p>
              <h3 className="mt-2 font-display text-xl font-light tracking-tight text-[#f1ece2]">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a49d90]">{c.text}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
