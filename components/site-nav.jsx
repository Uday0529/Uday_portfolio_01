'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Gamepad2, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EASE } from './primitives'
import { ArcadeGameModal } from './arcade-game'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [arcadeOpen, setArcadeOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const href = (hash) => (isHome ? hash : `/${hash}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Handle smooth scroll to hash when navigating from another page
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
        return () => clearTimeout(t)
      }
    }
  }, [pathname])

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border px-5 py-3 transition-all duration-[350ms] sm:px-7"
          style={{
            backgroundColor: scrolled ? 'rgba(8,8,7,0.85)' : 'rgba(17,16,14,0.45)',
            borderColor: scrolled ? 'rgba(197,154,85,0.34)' : 'rgba(197,154,85,0.18)',
            backdropFilter: 'blur(16px)',
            boxShadow: scrolled ? '0 18px 50px -30px rgba(197,154,85,0.4)' : 'none',
          }}
        >
          <Link
            href={href('#home')}
            className="label-xs font-display font-semibold text-[#f1ece2] transition-colors hover:text-[#e0be7a]"
          >
            UDAY<span className="text-[#c59a55]">.DEV</span>
          </Link>

          <ul className="hidden items-center md:flex md:gap-4 lg:gap-7">
            {LINKS.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.07 }}
              >
                <Link href={href(l.href)} className="group relative label-xs text-[#a49d90]">
                  <span className="transition-colors duration-300 group-hover:text-[#e0be7a]">
                    {l.label}
                  </span>
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#c59a55] transition-all duration-[250ms] ease-out group-hover:w-full" />
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setArcadeOpen(true)}
              aria-label="Play mini game"
              className="group flex items-center gap-2 rounded-full border border-[rgba(197,154,85,0.3)] bg-[#15130f]/80 px-3.5 py-2 label-xs text-[#e0be7a] transition-all duration-300 hover:border-[#c59a55] hover:bg-[#c59a55] hover:text-[#080807]"
            >
              <Gamepad2 className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden lg:inline">Arcade</span>
            </button>

            <Link
              href={href('#contact')}
              className="group hidden items-center gap-2 rounded-full border border-[rgba(197,154,85,0.35)] px-4 py-2 label-xs text-[#e0be7a] transition-all duration-300 hover:bg-[#c59a55] hover:text-[#080807] sm:flex"
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-full border border-[rgba(197,154,85,0.3)] text-[#e0be7a] transition-colors hover:border-[#c59a55] md:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <ArcadeGameModal
        isOpen={arcadeOpen}
        onClose={() => setArcadeOpen(false)}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-0 bg-[rgba(8,8,7,0.85)] backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0 flex flex-col bg-[#0b0a09]/95 backdrop-blur-md px-6 pt-6 pb-12"
            >
              <div className="flex items-center justify-between">
                <span className="label-xs font-display font-semibold">
                  UDAY<span className="text-[#c59a55]">.DEV</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full border border-[rgba(197,154,85,0.3)] text-[#e0be7a]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <ul className="my-auto flex flex-col gap-2 overflow-y-auto max-h-[70vh] py-6">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18, transition: { delay: (LINKS.length - i) * 0.03 } }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08 }}
                    className="border-b border-[rgba(197,154,85,0.14)] py-4"
                  >
                    <Link
                      href={href(l.href)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between font-display text-4xl font-light tracking-tight text-[#f1ece2]"
                    >
                      {l.label.toUpperCase()}
                      <span className="label-xs text-[#6b5130]">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + LINKS.length * 0.08 }}
                  className="border-b border-[rgba(197,154,85,0.14)] py-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      setArcadeOpen(true)
                    }}
                    className="flex w-full items-baseline justify-between font-display text-4xl font-light tracking-tight text-[#e0be7a]"
                  >
                    PLAY ARCADE
                    <Gamepad2 className="size-6 text-[#c59a55]" />
                  </button>
                </motion.li>
              </ul>

              <p className="label-xs text-[#a49d90]">
                C# &bull; .NET &bull; API &bull; WEB
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
