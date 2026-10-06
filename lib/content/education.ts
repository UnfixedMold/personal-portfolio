import type { StaticImageData } from 'next/image'
import vilniusUniversityLogo from '@/assets/images/vilnius-university.png'

export type Award = {
  place: string
  label: string
  thesis: string
  medal: 'gold' | 'silver'
}

export type Degree = {
  period: string
  level: string
  field: string
  award: Award
}

export type Education = {
  title: string
  school: {
    name: string
    logo: StaticImageData
    logoLabel: string
    degrees: readonly Degree[]
  }
}

export const education: Education = {
  title: 'Education',
  school: {
    name: 'Vilnius University',
    logo: vilniusUniversityLogo,
    logoLabel: 'Vilnius University logo',
    degrees: [
      {
        period: '2022 — 25',
        level: 'Master’s degree',
        field: 'Computer Science',
        award: {
          place: '1st place',
          label: 'Best master’s thesis in course',
          thesis:
            'Aggressive inline trick classification & performance feedback',
          medal: 'gold',
        },
      },
      {
        period: '2018 — 22',
        level: 'Bachelor’s degree',
        field: 'Computer Science',
        award: {
          place: '2nd place',
          label: 'Best bachelor’s thesis in “Innovations for Life” category',
          thesis: 'Finding Hamiltonian circuits using quantum calculations',
          medal: 'silver',
        },
      },
    ],
  },
}
