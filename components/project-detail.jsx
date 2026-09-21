'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { EASE, Reveal, SectionLabel } from './primitives'
import { ProjectVideo } from './project-video'

function Block({
  label,
  title,
  children,
}) {
  return (
    <Reveal className="border-t border-[rgba(197,154,85,0.16)] pt-10">
      <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="mt-5 font-display text-2xl font-light tracking-tight text-[#f1ece2] sm:text-3xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </Reveal>
  )
}

export function ProjectDetail({ project }) {
  const router = useRouter()
  const [closing, setClosing] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleGoBack(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    setClosing(true)
    timerRef.current = setTimeout(() => {
      router.push('/#projects')
    }, 550)
  }

  return (
    <>
      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 pt-28 pb-24 sm:px-6 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <Link
            href="/#projects"
            onClick={handleGoBack}
            className="group inline-flex items-center gap-3 label-xs text-[#a49d90] transition-colors hover:text-[#e0be7a]"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="label-xs mt-12 text-[#c59a55]"
        >
          Project {project.number}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26, letterSpacing: '0.08em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.38 }}
          className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.96] font-light text-balance"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#a49d90]"
        >
          {project.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="relative mt-14 aspect-video overflow-hidden rounded-[1.75rem] border border-[rgba(197,154,85,0.24)]"
        >
          <Image
            src={project.image || '/placeholder.svg'}
            alt={`${project.title} interface`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/70 via-transparent to-transparent" />
          {project.video && (
            <a
              href="#video-demo"
              className="group/badge absolute bottom-5 right-5 z-10 flex items-center gap-2.5 rounded-full border border-[rgba(197,154,85,0.4)] bg-[#080807]/85 px-4 py-2 label-xs text-[#e0be7a] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#c59a55] hover:bg-[#c59a55] hover:text-[#080807] sm:bottom-6 sm:right-6"
            >
              <Play className="size-3 fill-current" />
              Watch Video Demo
            </a>
          )}
        </motion.div>

        <div className="mt-24 flex flex-col gap-20">
          <Block label="Overview" title="What it is">
            <p className="text-[17px] leading-relaxed text-[#a49d90]">{project.overview}</p>
          </Block>

          <Block label="Features" title="What it does">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 rounded-xl border border-[rgba(197,154,85,0.16)] bg-[#11100e]/60 px-4 py-3.5 text-sm leading-relaxed text-[#a49d90]"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-[#c59a55]" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          {project.video && (
            <div id="video-demo" className="scroll-mt-28">
              <Block label="Demonstration" title="Walkthrough Video">
                <ProjectVideo project={project} />
              </Block>
            </div>
          )}

          <Block label="Architecture" title="How it is put together">
            <div className="flex flex-col">
              {project.architecture.map((a, i) => (
                <div key={a.label} className="flex flex-col">
                  <div className="rounded-xl border border-[rgba(197,154,85,0.2)] bg-[#15130f]/80 px-5 py-4">
                    <p className="label-xs text-[#e0be7a]">{a.label}</p>
                    <p className="mt-2 text-sm text-[#a49d90]">{a.detail}</p>
                  </div>
                  {i < project.architecture.length - 1 && (
                    <span className="mx-auto h-8 w-px bg-gradient-to-b from-[rgba(197,154,85,0.5)] to-[rgba(197,154,85,0.15)]" />
                  )}
                </div>
              ))}
            </div>
          </Block>

          <Block label="Tech Stack" title="What it runs on">
            <div className="grid gap-8 sm:grid-cols-3">
              {project.stack.map((s) => (
                <div key={s.group}>
                  <p className="label-xs text-[#c59a55]">{s.group}</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="text-sm text-[#a49d90]">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Security" title="How it is protected">
            <ul className="flex flex-col gap-3">
              {project.security.map((s) => (
                <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-[#a49d90]">
                  <span className="label-xs mt-1 text-[#6b5130]">&mdash;</span>
                  {s}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <Reveal className="mt-24">
          <Link
            href="/#projects"
            onClick={handleGoBack}
            className="group inline-flex items-center gap-3 rounded-full border border-[rgba(197,154,85,0.3)] px-6 py-3.5 label-xs text-[#e0be7a] transition-all duration-300 hover:bg-[#c59a55] hover:text-[#080807]"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            Back to Projects
          </Link>
        </Reveal>
      </main>

      {/* reverse cinematic transition */}
      <AnimatePresence>
        {closing && (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#080807]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <motion.div
              className="absolute overflow-hidden border border-[rgba(197,154,85,0.4)]"
              initial={{ top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0 }}
              animate={{
                top: '38vh',
                left: '50%',
                width: 'min(34rem, 84vw)',
                height: '18rem',
                x: '-50%',
                borderRadius: 24,
                opacity: 0.35,
              }}
              transition={{ duration: 0.68, ease: EASE }}
            >
              <Image
                src={project.image || '/placeholder.svg'}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#080807]/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
