import { SectionHeading } from '@/components/section-heading'
import { cn } from 'cn'
import { Medal } from 'lucide-react'
import Image from 'next/image'
import { SurfaceCard } from '@/components/surface-card'
import type {
  Award,
  Degree,
  Education as EducationContent,
} from '@/lib/content/education'

type EducationProps = {
  education: EducationContent
}

const medals = {
  gold: 'from-gold to-gold-end text-gold-foreground',
  silver: 'from-silver to-silver-end text-silver-foreground',
}

function AwardPanel({ award }: { award: Award }) {
  return (
    <div className="bg-muted/60 flex items-start gap-4 rounded-2xl p-4">
      <span
        aria-hidden
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-145 shadow-[inset_0_-3px_0_rgb(0_0_0/0.12),0_4px_10px_rgb(0_0_0/0.15)]',
          medals[award.medal]
        )}
      >
        <Medal className="size-4.5" />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="font-bold">{award.place}</p>
        <p className="text-muted-foreground text-sm">{award.label}</p>
        <p className="text-muted-foreground mt-1.5 text-sm">“{award.thesis}”</p>
      </div>
    </div>
  )
}

function DegreeItem({ degree }: { degree: Degree }) {
  return (
    <li className="flex flex-col gap-4 py-5 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold">{degree.level}</h4>
          <p className="text-muted-foreground text-sm">{degree.field}</p>
        </div>
        <p className="text-primary pt-1 text-sm font-semibold whitespace-nowrap">
          {degree.period}
        </p>
      </div>
      <AwardPanel award={degree.award} />
    </li>
  )
}

export function Education({ education }: EducationProps) {
  const { school } = education

  return (
    <div className="flex flex-col gap-4" aria-labelledby="education-title">
      <SectionHeading
        id="education-title"
        title={education.title}
        className="mb-5"
      />
      <SurfaceCard className="gap-0 px-6 py-6 text-base">
        <div className="flex items-center gap-4 pb-5">
          <Image
            src={school.logo}
            alt={school.logoLabel}
            sizes="60px"
            className="size-15 shrink-0 object-contain"
          />
          <h3 className="text-lg font-bold">{school.name}</h3>
        </div>
        <ul className="divide-y border-t">
          {school.degrees.map((degree) => (
            <DegreeItem key={degree.period} degree={degree} />
          ))}
        </ul>
      </SurfaceCard>
    </div>
  )
}
