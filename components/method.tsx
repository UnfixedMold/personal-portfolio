import { GradientTile } from '@/components/gradient-tile'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { SurfaceCard } from '@/components/surface-card'
import type { Method as MethodContent } from '@/lib/content/method'

type MethodProps = {
  method: MethodContent
}

export function Method({ method }: MethodProps) {
  return (
    <Section id="method" aria-labelledby="method-title">
      <SectionHeading
        id="method-title"
        title={method.title}
        subtitle={method.subtitle}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {method.steps.map((step) => (
          <SurfaceCard key={step.number} className="gap-3 px-6 text-base">
            <GradientTile className="size-10 text-sm" aria-hidden>
              {step.number}
            </GradientTile>
            <h3 className="text-lg font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.text}</p>
          </SurfaceCard>
        ))}
      </div>
    </Section>
  )
}
