'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { EASE, SectionLabel } from './primitives'

export function Projects({ projects }) {
  const router = useRouter()
  const [expanding, setExpanding] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleNavigate(e, project) {
    // allow default new tab / context menu behavior for modifier keys
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    e.preventDefault()
    const card = e.currentTarget.closest('article')
    if (card) {
      const box = card.getBoundingClientRect()
      setExpanding({
        project,
        rect: { top: box.top, left: box.left, width: box.width, height: box.height },
      })
      timerRef.current = setTimeout(() => {
        router.push(`/projects/${project.slug}`)
      }, 550)
    } else {
      router.push(`/projects/${project.slug}`)
    }
  }

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-28 sm:px-6 lg:py-36"
    >
      <SectionLabel>Selected Work</SectionLabel>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-8 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1] font-light tracking-tight text-balance"
      >
        Some things I&apos;ve built
      </motion.h2>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.12 }}
            className="group relative overflow-hidden rounded-3xl border border-[rgba(197,154,85,0.18)] bg-[#11100e]/70 p-4 transition-all duration-[350ms] hover:-translate-y-2 hover:border-[#c59a55] sm:p-5"
          >
            {/* light sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(197,154,85,0.14)_50%,transparent_65%)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
            />

            <Link
              href={`/projects/${p.slug}`}
              onClick={(e) => handleNavigate(e, p)}
              className="group/thumb block relative overflow-hidden rounded-2xl border border-[rgba(197,154,85,0.2)] bg-[#080807]"
              aria-label={`View details for ${p.title}`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={p.image || '/placeholder.svg'}
                  alt={`${p.title} interface`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 40rem"
                  className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[#080807]/55 transition-colors duration-500 group-hover:bg-[#080807]/20" />
                {p.video && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                    <span className="flex size-12 items-center justify-center rounded-full border border-[rgba(197,154,85,0.6)] bg-[#080807]/85 text-[#e0be7a] shadow-[0_0_25px_rgba(197,154,85,0.4)] backdrop-blur-md transition-transform duration-300 group-hover/thumb:scale-110">
                      <Play className="ml-0.5 size-5 fill-current" />
                    </span>
                  </div>
                )}
              </div>
              <span className="label-xs absolute top-4 left-4 rounded-full border border-[rgba(197,154,85,0.4)] bg-[#080807]/70 px-3 py-1.5 text-[#e0be7a] backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(197,154,85,0.55)]">
                Project {p.number}
              </span>
              {p.video && (
                <span className="label-xs absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-[rgba(197,154,85,0.35)] bg-[#080807]/80 px-2.5 py-1.5 text-[#e0be7a] backdrop-blur-sm">
                  <Play className="size-2.5 fill-[#e0be7a]" />
                  Video Demo
                </span>
              )}
            </Link>

            <div className="px-1 pt-6 pb-2">
              <Link
                href={`/projects/${p.slug}`}
                onClick={(e) => handleNavigate(e, p)}
                className="block group/title"
              >
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-light tracking-tight text-[#f1ece2] transition-colors group-hover/title:text-[#e0be7a]">
                  {p.title}
                </h3>
              </Link>
              <p className="mt-3 text-[15px] leading-relaxed text-[#a49d90]">
                {p.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="label-xs rounded-full border border-[rgba(197,154,85,0.22)] px-3 py-1.5 text-[#a49d90]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-between">
                <Link
                  href={`/projects/${p.slug}`}
                  onClick={(e) => handleNavigate(e, p)}
                  className="group/cta inline-flex items-center gap-3 label-xs text-[#e0be7a]"
                >
                  View Project
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                </Link>
                {p.video && (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#a49d90]">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#c59a55]" />
                    {p.video.duration} demo
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* cinematic card expansion */}
      <AnimatePresence>
        {expanding && (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#080807]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <motion.div
              className="absolute overflow-hidden rounded-3xl border border-[rgba(197,154,85,0.4)]"
              initial={{
                top: expanding.rect.top,
                left: expanding.rect.left,
                width: expanding.rect.width,
                height: expanding.rect.height,
                borderRadius: 24,
              }}
              animate={{ top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0 }}
              transition={{ duration: 0.72, ease: EASE }}
            >
              <Image
                src={expanding.project.image || '/placeholder.svg'}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#080807]/70" />
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.24 }}
                className="absolute bottom-16 left-6 max-w-3xl font-display text-[clamp(1.8rem,6vw,4.5rem)] leading-none font-light tracking-tight text-[#f1ece2] sm:left-12"
              >
                {expanding.project.title}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
