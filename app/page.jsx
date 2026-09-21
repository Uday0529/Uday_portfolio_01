import { About } from '@/components/about'
import { Architecture } from '@/components/architecture'
import { Contact } from '@/components/contact'
import { CurrentlyBuilding } from '@/components/currently-building'
import { Experience } from '@/components/experience'
import { GoldCursor } from '@/components/gold-cursor'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Security } from '@/components/security'
import { SiteBackground } from '@/components/site-background'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { Technologies } from '@/components/technologies'
import { projects } from '@/lib/projects'

export default function HomePage() {
  return (
    <>
      <SiteBackground />
      <GoldCursor />
      <SiteNav />
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Technologies />
        <Architecture />
        <Projects projects={projects} />
        <Security />
        <CurrentlyBuilding />
        <Experience />
        <Contact />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </>
  )
}
