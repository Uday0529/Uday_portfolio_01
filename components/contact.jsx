'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, AtSign, Code2, Contact as ContactIcon } from 'lucide-react'
import Image from 'next/image'
import { EASE, SectionLabel } from './primitives'

const SOCIALS = [
  { label: 'GitHub', href: 'https://www.github.com/Uday0529', icon: Code2 },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/uday-gupta-0923ab311/', icon: ContactIcon },
  { label: 'Email', href: 'mailto:udayg0529@gmail.com', icon: AtSign },
]

const PARTICLES = [
  { top: '18%', left: '4%', d: '9s' },
  { top: '52%', left: '12%', d: '12s' },
  { top: '32%', left: '46%', d: '10s' },
  { top: '70%', left: '30%', d: '14s' },
  { top: '12%', left: '62%', d: '11s' },
  { top: '62%', left: '58%', d: '13s' },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background:
            'radial-gradient(80% 60% at 30% 40%, rgba(197,154,85,0.09), transparent 65%)',
        }}
      />

      <div className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <SectionLabel>Contact</SectionLabel>

          <div className="relative">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                aria-hidden
                className="absolute size-[3px] rounded-full bg-[#e0be7a]"
                style={{
                  top: p.top,
                  left: p.left,
                  boxShadow: '0 0 10px rgba(197,154,85,0.8)',
                  animation: `float-particle ${p.d} ease-in-out ${i * 0.7}s infinite`,
                }}
              />
            ))}

            <motion.h2
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 1.1, ease: EASE }}
              className="mt-8 font-display text-[clamp(2.6rem,8vw,5.6rem)] leading-[0.94] font-light tracking-tight text-balance"
            >
              LET&apos;S BUILD
              <br />
              <span className="text-[#e0be7a]">SOMETHING GREAT.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            className="mt-8 max-w-md text-[17px] leading-relaxed text-[#a49d90]"
          >
            Have a project in mind or want to work together?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="mailto:udayg0529@gmail.com"
              className="rounded-full bg-[#c59a55] px-7 py-3.5 label-xs font-semibold text-[#080807] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0be7a]"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/uday-gupta-0923ab311/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-full border border-[rgba(197,154,85,0.3)] px-7 py-3.5 label-xs text-[#a49d90] transition-all duration-300 hover:border-[#c59a55] hover:text-[#f1ece2]"
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group relative flex items-center gap-2 label-xs text-[#a49d90] transition-colors hover:text-[#e0be7a]"
                  >
                    <Icon className="size-3.5" strokeWidth={1.5} />
                    {s.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#c59a55] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[rgba(197,154,85,0.22)]"
        >
          <Image
            src="/images/uday-photo.jpg"
            alt="Uday Gupta"
            fill
            sizes="(max-width: 1024px) 90vw, 30rem"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-[#080807]/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
