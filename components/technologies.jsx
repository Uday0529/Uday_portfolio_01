'use client'

import { motion } from 'motion/react'
import {
  Braces,
  Database,
  FileCode2,
  Hexagon,
  KeyRound,
  Layers,
  Leaf,
  Network,
  Palette,
  ShieldCheck,
  Terminal,
  Boxes,
} from 'lucide-react'
import { EASE, SectionLabel } from './primitives'

const GROUPS = [
  {
    group: 'Backend',
    items: [
      { name: 'C#', icon: Hexagon },
      { name: '.NET', icon: Layers },
      { name: 'ASP.NET MVC', icon: Boxes },
      { name: 'REST API', icon: Network },
      { name: 'JWT', icon: KeyRound },
      { name: 'RBAC', icon: ShieldCheck },
    ],
  },
  {
    group: 'Database',
    items: [
      { name: 'SQL Server', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'MongoDB', icon: Leaf },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'HTML', icon: FileCode2 },
      { name: 'CSS', icon: Palette },
      { name: 'JavaScript', icon: Braces },
      { name: 'Node.js', icon: Terminal },
    ],
  },
]

function TechTile({ tech, index }) {
  const Icon = tech.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[rgba(197,154,85,0.18)] bg-[#15130f]/70 px-4 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c59a55] hover:shadow-[0_20px_45px_-28px_rgba(197,154,85,0.75)]"
    >
      <Icon
        className="size-6 text-[#a49d90] transition-all duration-300 group-hover:scale-110 group-hover:text-[#e0be7a]"
        strokeWidth={1.25}
      />
      <span className="label-xs text-center text-[#a49d90] transition-colors duration-300 group-hover:text-[#f1ece2]">
        {tech.name}
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 40px -12px rgba(197,154,85,0.35)' }} />
    </motion.div>
  )
}

export function Technologies() {
  let counter = 0
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36"
    >
      <SectionLabel>Technology</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1] font-light tracking-tight text-balance"
      >
        Technologies I work with
      </motion.h2>

      <div className="mt-16 flex flex-col gap-14">
        {GROUPS.map((g) => (
          <div key={g.group}>
            <div className="flex items-center gap-4">
              <span className="label-xs text-[#c59a55]">{g.group}</span>
              <span className="h-px flex-1 bg-[rgba(197,154,85,0.16)]" />
              <span className="label-xs text-[#6b5130]">
                {String(g.items.length).padStart(2, '0')}
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {g.items.map((t) => (
                <TechTile key={t.name} tech={t} index={counter++ % 6} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
