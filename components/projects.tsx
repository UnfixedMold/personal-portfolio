import Image from 'next/image'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { SurfaceCard } from '@/components/surface-card'
import { TagPill } from '@/components/tag-pill'
import { Skeleton } from '@/components/ui/skeleton'
import type {
  Project,
  Projects as ProjectsContent,
} from '@/lib/content/projects'

type ProjectsProps = {
  projects: ProjectsContent
}

function ProjectImage({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageLabel}
        sizes="(min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        className="size-full object-cover object-top"
      />
    )
  }

  return (
    <Skeleton
      role="img"
      aria-label={project.imageLabel}
      className="size-full rounded-none"
    />
  )
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section id="work" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        title={projects.title}
        subtitle={projects.subtitle}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.items.map((project) => (
          <a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-3xl hover:opacity-100"
          >
            <SurfaceCard className="hover:border-primary/35 hover:shadow-lift h-full gap-0 py-0 text-base transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5">
              <div className="aspect-[16/10] overflow-hidden border-b">
                <ProjectImage project={project} />
              </div>
              <div className="flex flex-1 flex-col gap-3.5 p-6">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  {project.tags.map((tag) => (
                    <TagPill key={tag}>{tag}</TagPill>
                  ))}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
                <p className="text-faint-foreground text-sm">{project.shows}</p>
                <p className="text-primary mt-auto text-sm font-semibold">
                  {project.domain} ↗
                </p>
              </div>
            </SurfaceCard>
          </a>
        ))}
      </div>
    </Section>
  )
}
