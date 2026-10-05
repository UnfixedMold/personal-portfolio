import { GradientTile } from '@/components/gradient-tile'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { SurfaceCard } from '@/components/surface-card'
import { TagPill } from '@/components/tag-pill'
import type { Services as ServicesContent } from '@/lib/content/services'

type ServicesProps = {
  services: ServicesContent
}

export function Services({ services }: ServicesProps) {
  return (
    <Section id="services" aria-labelledby="services-title">
      <SectionHeading
        id="services-title"
        title={services.title}
        subtitle={services.subtitle}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {services.items.map((service) => (
          <SurfaceCard key={service.title} className="gap-3.5 px-6 text-base">
            <GradientTile className="size-12" aria-hidden>
              <service.icon className="size-6" />
            </GradientTile>
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p className="text-muted-foreground">{service.text}</p>
            <p className="text-faint-foreground text-sm">{service.examples}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-1">
              {service.stack.map((tag) => (
                <li key={tag}>
                  <TagPill>{tag}</TagPill>
                </li>
              ))}
            </ul>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  )
}
