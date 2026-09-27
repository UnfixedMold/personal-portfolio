import { SectionHeading } from '@/components/section-heading'
import { JobAccordion } from '@/components/job-accordion'
import type { Experience as ExperienceContent } from '@/lib/content/experience'

type ExperienceProps = {
  experience: ExperienceContent
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <div className="flex flex-col gap-4" aria-labelledby="experience-title">
      <SectionHeading
        id="experience-title"
        title={experience.title}
        className="mb-5"
      />
      <JobAccordion jobs={experience.jobs} />
    </div>
  )
}
