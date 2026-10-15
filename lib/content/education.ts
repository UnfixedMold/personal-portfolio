import type { StaticImageData } from 'next/image'
import bachelorsThesisPhoto from '@/assets/images/education/bachelors-thesis.webp'
import mastersThesisPhoto from '@/assets/images/education/masters-thesis.webp'
import vilniusUniversityLogo from '@/assets/images/education/vilnius-university.png'

export type Award = {
  place: string
  label: string
  medal: 'gold' | 'silver'
  photo: StaticImageData
  photoLabel: string
}

export type Degree = {
  year: string
  level: string
  field: string
  award: Award
}

export type Education = {
  title: string
  photoHint: string
  school: {
    name: string
    logo: StaticImageData
    logoLabel: string
    degrees: readonly Degree[]
  }
}

export const education: Education = {
  title: 'Education',
  photoHint: 'View photo',
  school: {
    name: 'Vilnius University',
    logo: vilniusUniversityLogo,
    logoLabel: 'Vilnius University logo',
    degrees: [
      {
        year: '2026',
        level: 'Master’s degree',
        field: 'Computer Science',
        award: {
          place: '1st place',
          label: 'Best master’s thesis in course',
          medal: 'gold',
          photo: mastersThesisPhoto,
          photoLabel:
            'IEEE Lithuania Section certificate naming the master’s thesis the best in course',
        },
      },
      {
        year: '2022',
        level: 'Bachelor’s degree',
        field: 'Computer Science',
        award: {
          place: '2nd place',
          label: 'Best bachelor’s thesis in “Innovations for Life” category',
          medal: 'silver',
          photo: bachelorsThesisPhoto,
          photoLabel:
            'Vilnius University Tech Hub certificate awarding the bachelor’s thesis 2nd place in the Innovations for Life category',
        },
      },
    ],
  },
}
