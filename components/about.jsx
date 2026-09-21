'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { EASE, Reveal, RevealGroup, SectionLabel, revealChild } from './primitives'

const VALUES = ['Clean Code', 'Secure', 'Scalable', 'Performance']

const APPROACH = [
  { n: '01', title: 'Understand', text: 'Map the real problem and the constraints around it.' },
  { n: '02', title: 'Design', text: 'Model the data and the contracts before writing code.' },
  { n: '03', title: 'Build', text: 'Small, readable, testable units in a clear layer structure.' },
  { n: '04', title: 'Secure', text: 'Authentication, authorization and validation from day one.' },
  { n: '05', title: 'Test', text: 'Verify behaviour, edge cases and failure paths.' },
  { n: '06', title: 'Deploy', text: 'Ship, observe, and iterate on what production tells you.' },
]

export function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36"
    >
      <SectionLabel>About Me</SectionLabel>

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.85, ease: EASE }}
            className="font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.98] font-light tracking-tight text-balance"
          >
            I build software
            <br />
            <span className="text-[#a49d90]">that holds up.</span>
          </motion.h2>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-[#a49d90]">
              I&apos;m a software developer focused on building reliable backend systems,
              secure APIs and modern web applications. Most of my work lives in C# and
              .NET — ASP.NET MVC services, REST APIs, JWT-protected endpoints and
              relational schemas that stay fast as data grows.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#a49d90]">
              What I actually enjoy is the moment an idea turns into a real product —
              when a schema, a set of endpoints and an interface come together into
              something people use every day. I care about the parts that are invisible
              when they work: correct data, enforced permissions, predictable
              performance.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-4">
            {VALUES.map((v) => (
              <motion.div
                key={v}
                variants={revealChild}
                className="rounded-xl border border-[rgba(197,154,85,0.2)] bg-[#11100e]/60 px-3 py-4 text-center"
              >
                <span className="label-xs text-[#e0be7a]">{v}</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>

        {/* image */}
        <div ref={ref} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[rgba(197,154,85,0.22)]"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-6%]">
              <Image
                src="/images/uday-photo.jpg"
                alt="Uday Gupta"
                fill
                sizes="(max-width: 1024px) 90vw, 34rem"
                className="object-cover object-top"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-[#080807]/20 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem]"
              style={{ boxShadow: 'inset 0 0 120px -30px rgba(197,154,85,0.35)' }}
            />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10"
            style={{ animation: 'orbit-spin 70s linear infinite' }}
          >
            <div className="absolute inset-0 rounded-full border border-[rgba(197,154,85,0.12)]" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-[rgba(197,154,85,0.08)]" />
          </div>
        </div>
      </div>

      {/* approach */}
      <div className="mt-24 lg:mt-32">
        <SectionLabel>My Approach</SectionLabel>
        <RevealGroup className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {APPROACH.map((a) => (
            <motion.div key={a.n} variants={revealChild} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(197,154,85,0.35)] label-xs text-[#c59a55]">
                {a.n}
              </span>
              <div>
                <h3 className="font-display text-lg font-normal text-[#f1ece2]">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#a49d90]">{a.text}</p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
