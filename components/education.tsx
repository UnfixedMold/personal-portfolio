import { SectionHeading } from '@/components/section-heading'
import { cn } from 'cn'
import { GraduationCap, Medal } from 'lucide-react'
import Image from 'next/image'
import { SurfaceCard } from '@/components/surface-card'
import type {
  Award,
  Education as EducationContent,
} from '@/lib/content/education'

type EducationProps = {
  education: EducationContent
}

const medals = {
  gold: 'from-gold to-gold-end text-gold-foreground',
  silver: 'from-silver to-silver-end text-silver-foreground',
}

function AwardRow({ award }: { award: Award }) {
  return (
    <li className="flex items-center gap-4 rounded-[14px] border border-white/18 bg-white/12 p-3.5">
      <span
        aria-hidden
        className={cn(
          'flex size-13 shrink-0 items-center justify-center rounded-full bg-linear-145 shadow-[inset_0_-3px_0_rgb(0_0_0/0.12),0_6px_16px_rgb(0_0_0/0.18)]',
          medals[award.medal]
        )}
      >
        <Medal className="size-6.5" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[17px] font-extrabold">{award.place}</span>
        <span className="text-sm opacity-90">{award.label}</span>
      </span>
    </li>
  )
}

export function Education({ education }: EducationProps) {
  const { school, awards } = education

  return (
    <div className="flex flex-col gap-4" aria-labelledby="education-title">
      <SectionHeading
        id="education-title"
        title={education.title}
        className="mb-5"
      />
      <SurfaceCard className="gap-4 px-5 py-5 text-base">
        <div className="flex items-center gap-4">
          <Image
            src={school.logo}
            alt={school.logoLabel}
            sizes="60px"
            className="size-15 shrink-0 object-contain"
          />
          <h3 className="font-bold">{school.name}</h3>
        </div>
        <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-2">
          {school.degrees.map((degree) => (
            <div key={degree.period} className="contents">
              <dt className="text-primary text-sm font-semibold">
                {degree.period}
              </dt>
              <dd className="text-muted-foreground">
                <span className="whitespace-nowrap">{degree.level} ·</span>{' '}
                <span className="whitespace-nowrap">{degree.field}</span>
              </dd>
            </div>
          ))}
        </dl>
      </SurfaceCard>
      <SurfaceCard className="gradient-primary text-primary-foreground shadow-glow gap-3.5 border-0 px-5 py-5 text-base">
        <h3 className="flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] uppercase opacity-85">
          <GraduationCap aria-hidden className="size-4.5" />
          {education.awardsTitle}
        </h3>
        <ul className="flex flex-col gap-3">
          {awards.map((award) => (
            <AwardRow key={award.label} award={award} />
          ))}
        </ul>
      </SurfaceCard>
    </div>
  )
}
