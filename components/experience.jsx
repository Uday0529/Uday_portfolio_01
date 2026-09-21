'use client'

import { motion } from 'motion/react'
import { EASE, SectionLabel } from './primitives'

const TIMELINE = [
  {
    year: '2025',
    title: 'Software Development',
    body: 'Building production web applications end to end — ASP.NET MVC services, REST APIs, relational schema design and role-scoped dashboards.',
    tags: ['Backend Development', 'REST APIs', 'Database Systems', 'Security'],
  },
  {
    year: 'Earlier',
    title: 'Learning Journey',
    body: 'Moved from language fundamentals into architecture — layering, contracts, indexing and the security boundaries that keep an application honest.',
    tags: ['C#', 'JavaScript', 'Node.js', 'MongoDB'],
  },
]

const STATS = [
  { value: '03', label: 'Projects' },
  { value: '13', label: 'Technologies' },
  { value: '∞', label: 'Lines of Code' },
  { value: '01', label: 'Developer' },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36"
    >
      <SectionLabel>Experience</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1] font-light tracking-tight text-balance"
      >
        The path so far
      </motion.h2>

      <ol className="relative mt-16 border-l border-[rgba(197,154,85,0.22)] pl-8 sm:pl-12">
        {TIMELINE.map((item, i) => (
          <motion.li
            key={item.year}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.12 }}
            className="relative pb-14 last:pb-0"
          >
            <span className="absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full border border-[#c59a55] bg-[#080807] shadow-[0_0_12px_rgba(197,154,85,0.6)] sm:-left-[calc(3rem+5px)]" />
            <p className="label-xs text-[#c59a55]">{item.year}</p>
            <h3 className="mt-3 font-display text-2xl font-light tracking-tight text-[#f1ece2] sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#a49d90]">
              {item.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="label-xs rounded-full border border-[rgba(197,154,85,0.2)] px-3 py-1.5 text-[#a49d90]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 grid grid-cols-2 divide-[rgba(197,154,85,0.18)] rounded-2xl border border-[rgba(197,154,85,0.2)] bg-[#11100e]/70 sm:grid-cols-4 sm:divide-x"
      >
        {STATS.map((s) => (
          <div key={s.label} className="px-6 py-8 text-center">
            <p className="font-display text-4xl font-light text-[#e0be7a]">{s.value}</p>
            <p className="label-xs mt-3 text-[#a49d90]">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
