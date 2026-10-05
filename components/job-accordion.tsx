'use client'

import { useState } from 'react'
import { TagPill } from '@/components/tag-pill'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Job } from '@/lib/content/experience'

type JobAccordionProps = {
  jobs: readonly Job[]
}

function getJobKey(job: Job) {
  return `${job.period} ${job.role}`
}

function isMouse(event: React.PointerEvent) {
  return event.pointerType === 'mouse'
}

export function JobAccordion({ jobs }: JobAccordionProps) {
  const [open, setOpen] = useState(getJobKey(jobs[0]))

  return (
    <Accordion
      type="single"
      value={open}
      onValueChange={(value) => value && setOpen(value)}
      className="@container gap-3"
    >
      {jobs.map((job) => (
        <AccordionItem
          key={getJobKey(job)}
          value={getJobKey(job)}
          onPointerEnter={(event) => isMouse(event) && setOpen(getJobKey(job))}
          className="bg-card/60 data-open:bg-card data-open:shadow-lift ease-smooth rounded-[18px] border px-6 transition-[background-color,box-shadow] duration-450"
        >
          <AccordionTrigger className="py-4 text-base font-normal hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
            <span className="grid flex-1 gap-0.5 @md:grid-cols-[1fr_auto] @md:items-baseline @md:gap-x-3">
              <span className="text-lg font-bold">{job.role}</span>
              <span className="text-primary order-last text-sm font-semibold @md:order-0">
                {job.period}
              </span>
              <span className="text-muted-foreground text-sm @md:col-span-2">
                {job.organisation}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="h-auto pb-5">
            <ul className="text-muted-foreground flex list-disc flex-col gap-1.5 pl-4.5 leading-normal">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <li key={tag}>
                  <TagPill>{tag}</TagPill>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
