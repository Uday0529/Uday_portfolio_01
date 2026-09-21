'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { EASE, SectionLabel } from './primitives'

const NODES = [
  { label: 'Client', meta: 'Browser / Mobile' },
  { label: 'Frontend', meta: 'HTML / CSS / JS' },
  { label: 'REST API', meta: 'Controllers / DTOs' },
  { label: 'Authentication', meta: 'JWT / Roles' },
  { label: 'Business Logic', meta: 'Services / Models' },
  { label: 'Database', meta: 'SQL / MongoDB' },
]

export function Architecture() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-6 lg:py-36">
      <SectionLabel>How I Build</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1] font-light tracking-tight text-balance"
      >
        My architecture approach
      </motion.h2>

      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#a49d90]">
        Every application I build follows the same spine: a thin client, a contract-first
        API, an explicit security boundary, and a service layer that owns the rules.
      </p>

      <div ref={ref} className="mt-16 flex flex-col items-center">
        {NODES.map((node, i) => (
          <div key={node.label} className="flex w-full flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.55 }}
              className="relative w-full max-w-md rounded-2xl border border-[rgba(197,154,85,0.26)] bg-[#15130f]/80 px-6 py-5 text-center backdrop-blur-sm"
              style={{ boxShadow: '0 22px 60px -45px rgba(197,154,85,0.9)' }}
            >
              <span className="label-xs absolute top-4 left-5 text-[#6b5130]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-display text-lg font-normal tracking-[0.06em] text-[#f1ece2] uppercase">
                {node.label}
              </p>
              <p className="label-xs mt-2 text-[#c59a55]">{node.meta}</p>
            </motion.div>

            {i < NODES.length - 1 && (
              <div className="relative h-16 w-px overflow-hidden sm:h-20">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.55 + 0.3 }}
                  className="h-full w-full bg-gradient-to-b from-[rgba(197,154,85,0.4)] to-transparent"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
