'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE, BronzeSurface } from './primitives'

const STACK = ['.NET', 'C#', 'ASP.NET', 'API', 'JAVASCRIPT', 'NODE.JS']
const CARD_TAGS = ['C#', '.NET', 'API', 'SQL', 'JS', 'NODE']

function up(delay) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: EASE, delay },
  }
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl scroll-mt-24 flex-col justify-center px-5 pt-32 pb-20 sm:px-6 lg:pt-36"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* left */}
        <div>
          <motion.p {...up(0.55)} className="label-xs text-[#c59a55]">
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, letterSpacing: '0.16em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
            transition={{ duration: 1.25, ease: EASE, delay: 0.7 }}
            className="mt-5 font-display text-[clamp(2.9rem,10vw,6.8rem)] leading-[0.92] font-light text-[#f1ece2]"
          >
            UDAY
            <br />
            <span className="text-[#e0be7a]">GUPTA</span>
          </motion.h1>

          <motion.p
            {...up(1.05)}
            className="mt-6 font-display text-[clamp(1.1rem,2.4vw,1.6rem)] font-light tracking-[0.18em] text-[#a49d90] uppercase"
          >
            Software Developer
          </motion.p>

          <motion.div
            {...up(1.2)}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {STACK.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="label-xs text-[#a49d90]">{s}</span>
                {i < STACK.length - 1 && (
                  <span className="size-1 rounded-full bg-[#6b5130]" />
                )}
              </span>
            ))}
          </motion.div>

          <motion.p
            {...up(1.35)}
            className="mt-8 max-w-md text-[17px] leading-relaxed text-[#a49d90]"
          >
            Building scalable web applications, secure REST APIs and modern digital
            experiences.
          </motion.p>

          <motion.div {...up(1.5)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full bg-[#c59a55] px-7 py-3.5 label-xs font-semibold text-[#080807] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0be7a] hover:shadow-[0_16px_40px_-18px_rgba(197,154,85,0.7)]"
            >
              View Projects
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[rgba(197,154,85,0.28)] bg-[#11100e]/60 px-7 py-3.5 label-xs text-[#a49d90] transition-all duration-300 hover:border-[#c59a55] hover:bg-[#15130f] hover:text-[#f1ece2]"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* right — portrait + orbit */}
        <div className="relative flex items-center justify-center gap-5 sm:gap-8">
          <div className="relative aspect-square w-full max-w-[26rem] flex-1">
            {/* orbits */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.6, ease: EASE, delay: 1.7 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 rounded-full border border-[rgba(197,154,85,0.22)]"
                style={{ animation: 'orbit-spin 44s linear infinite' }}
              >
                <span className="absolute -top-[3px] left-1/2 size-1.5 rounded-full bg-[#e0be7a] shadow-[0_0_10px_rgba(197,154,85,0.9)]" />
              </div>
              <div
                className="absolute inset-[8%] rounded-full border border-dashed border-[rgba(197,154,85,0.16)]"
                style={{ animation: 'orbit-spin 34s linear infinite reverse' }}
              >
                <span className="absolute top-1/2 -right-[3px] size-1 rounded-full bg-[#c59a55] shadow-[0_0_8px_rgba(197,154,85,0.8)]" />
              </div>
              <div
                className="absolute inset-[-9%] rounded-full border border-[rgba(197,154,85,0.1)]"
                style={{ animation: 'orbit-spin 60s linear infinite' }}
              >
                <span className="absolute bottom-0 left-[18%] size-1 rounded-full bg-[#6b5130]" />
              </div>
              <svg className="absolute inset-[-14%]" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 2 A48 48 0 0 1 98 50"
                  stroke="rgba(197,154,85,0.35)"
                  strokeWidth="0.4"
                />
                <path
                  d="M2 50 A48 48 0 0 0 50 98"
                  stroke="rgba(197,154,85,0.25)"
                  strokeWidth="0.4"
                />
              </svg>
            </motion.div>

            {/* portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1.45 }}
              className="absolute inset-[13%] overflow-hidden rounded-full border border-[rgba(197,154,85,0.3)]"
              style={{ boxShadow: '0 0 90px -20px rgba(197,154,85,0.35) inset' }}
            >
              <BronzeSurface seed={3} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="font-display text-[clamp(3rem,9vw,5.5rem)] leading-none font-light tracking-tight text-[#e0be7a]">
                  UG
                </span>
                <span className="label-xs text-[#a49d90]">Software Developer</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* identity card */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.95 }}
            className="flex w-[74px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-[rgba(197,154,85,0.24)] bg-[#11100e]/70 px-2 py-6 backdrop-blur-sm sm:w-[86px]"
          >
            <span className="label-xs font-display font-semibold text-[#f1ece2]">
              UDAY
            </span>
            <span
              className="label-xs text-[10px] text-[#c59a55]"
              style={{ writingMode: 'vertical-rl' }}
            >
              Software Dev
            </span>
            <span className="h-px w-6 gold-rule" />
            <div className="flex flex-col items-center gap-2.5">
              {CARD_TAGS.map((t) => (
                <span key={t} className="label-xs text-[10px] text-[#a49d90]">
                  {t}
                </span>
              ))}
            </div>
            <span className="h-px w-6 gold-rule" />
            <span className="label-xs text-[10px] text-[#6b5130]">2026</span>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
