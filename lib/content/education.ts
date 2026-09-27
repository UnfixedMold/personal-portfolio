import type { StaticImageData } from 'next/image'
import vilniusUniversityLogo from '@/assets/images/vilnius-university.png'

export type Degree = {
  period: string
  level: string
  field: string
}

export type Award = {
  place: string
  label: string
  medal: 'gold' | 'silver'
}

export type Education = {
  title: string
  school: {
    name: string
    logo: StaticImageData
    logoLabel: string
    degrees: readonly Degree[]
  }
  awardsTitle: string
  awards: readonly Award[]
}

export const education: Education = {
  title: 'Education',
  school: {
    name: 'Vilnius University',
    logo: vilniusUniversityLogo,
    logoLabel: 'Vilnius University logo',
    degrees: [
      { period: '2022 — 25', level: 'Master’s', field: 'Computer Science' },
      { period: '2018 — 22', level: 'Bachelor’s', field: 'Computer Science' },
    ],
  },
  awardsTitle: 'Thesis awards',
  awards: [
    {
      place: '1st place',
      label: 'Best master’s thesis in course',
      medal: 'gold',
    },
    {
      place: '2nd place',
      label: 'Best bachelor’s thesis in “Innovations for Life” category',
      medal: 'silver',
    },
  ],
}
