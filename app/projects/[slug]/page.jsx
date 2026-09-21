import { notFound } from 'next/navigation'
import { GoldCursor } from '@/components/gold-cursor'
import { PageTransition } from '@/components/page-transition'
import { ProjectDetail } from '@/components/project-detail'
import { SiteBackground } from '@/components/site-background'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { getProject, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: `${project.title} — Uday Gupta`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <SiteBackground />
      <GoldCursor />
      <SiteNav />
      <PageTransition>
        <ProjectDetail project={project} />
        <div className="relative z-10">
          <SiteFooter />
        </div>
      </PageTransition>
    </>
  )
}
