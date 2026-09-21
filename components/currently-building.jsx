'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { EASE, SectionLabel } from './primitives'

const TAGS = [
  '.NET Core',
  'Microservices',
  'RabbitMQ',
  'Redis',
  'JWT & Refresh Tokens',
  'Event-Driven',
  'Docker',
]

export function CurrentlyBuilding() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative overflow-hidden rounded-[2rem] border border-[rgba(197,154,85,0.35)] bg-[#0e0d0b] px-6 py-12 sm:px-12 sm:py-16"
        style={{ boxShadow: '0 40px 120px -70px rgba(197,154,85,0.9)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 120% at 100% 0%, rgba(197,154,85,0.16), transparent 60%)',
          }}
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <SectionLabel>Currently Building</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.02] font-light tracking-tight text-balance">
              ShopSphere
              <span className="text-[#6b5130]"> — </span>
              <span className="text-[#e0be7a]">E-Commerce Backend</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-[#a49d90]">
              ShopSphere is a production-oriented e-commerce backend built using .NET
              Microservices architecture. The system is designed with independent services for
              authentication, products, cart, inventory, orders, payments, notifications, and
              reviews, with separate databases for service-level data ownership.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#8a8479]">
              It uses JWT-based authentication, refresh tokens, Redis for caching, and RabbitMQ
              for asynchronous event-driven communication between services with fault isolation.
              AI-powered features such as an intelligent shopping assistant and semantic product
              search are planned as a future extension.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="label-xs rounded-full border border-[rgba(197,154,85,0.3)] bg-[#15130f] px-3 py-1.5 text-[#e0be7a]"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href="/projects/shopsphere"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-[rgba(197,154,85,0.4)] px-6 py-3 label-xs text-[#e0be7a] transition-all duration-300 hover:bg-[#c59a55] hover:text-[#080807]"
            >
              Read the case study
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Microservices mesh / event-driven orbit visual */}
          <div className="relative mx-auto aspect-square w-full max-w-[20rem]">
            <div
              className="absolute inset-0 rounded-full border border-[rgba(197,154,85,0.28)]"
              style={{ animation: 'orbit-spin 50s linear infinite' }}
            >
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full border border-[#c59a55] bg-[#0e0d0b] px-2 py-0.5 text-[10px] font-mono text-[#e0be7a] shadow-[0_0_14px_rgba(197,154,85,0.9)]">
                Auth
              </span>
              <span className="absolute top-1/2 -right-3 -translate-y-1/2 rounded-full border border-[#c59a55] bg-[#0e0d0b] px-2 py-0.5 text-[10px] font-mono text-[#e0be7a]">
                Orders
              </span>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-[#c59a55] bg-[#0e0d0b] px-2 py-0.5 text-[10px] font-mono text-[#e0be7a]">
                Payments
              </span>
              <span className="absolute top-1/2 -left-3 -translate-y-1/2 rounded-full border border-[#c59a55] bg-[#0e0d0b] px-2 py-0.5 text-[10px] font-mono text-[#e0be7a]">
                Products
              </span>
            </div>
            <div
              className="absolute inset-[18%] rounded-full border border-dashed border-[rgba(197,154,85,0.25)]"
              style={{ animation: 'orbit-spin 30s linear infinite reverse' }}
            >
              <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-[#c59a55] shadow-[0_0_8px_#c59a55]" />
              <span className="absolute top-1/2 -right-1 size-2 rounded-full bg-[#e0be7a] shadow-[0_0_8px_#e0be7a]" />
            </div>
            <div
              className="absolute inset-[34%] rounded-full border border-[rgba(197,154,85,0.2)]"
              style={{ animation: 'orbit-spin 20s linear infinite' }}
            />
            <div
              className="absolute inset-[40%] rounded-full flex flex-col items-center justify-center border border-[rgba(197,154,85,0.4)]"
              style={{
                background:
                  'radial-gradient(circle, rgba(224,190,122,0.25), rgba(14,13,11,0.9) 70%)',
                animation: 'glow-pulse 4s ease-in-out infinite',
              }}
            >
              <span className="label-xs text-[11px] font-semibold text-[#e0be7a]">Event Bus</span>
              <span className="text-[9px] font-mono text-[#a49d90]">RabbitMQ</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
