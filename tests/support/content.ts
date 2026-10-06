import { BrainCircuit, MonitorSmartphone, Sparkles } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import type { Contact } from '@/lib/content/contact'
import type { Education } from '@/lib/content/education'
import type { Experience } from '@/lib/content/experience'
import type { Projects } from '@/lib/content/projects'
import type { Services } from '@/lib/content/services'
import type { Site } from '@/lib/site'

export const testSite: Site = {
  name: 'Test Owner',
  shortName: 'Test',
  mark: 't',
  city: 'Testville',
  description: 'Test description',
  url: 'https://example.test',
  email: 'owner@example.test',
  phone: { display: '+1 555 0100', href: 'tel:+15550100' },
  linkedIn: 'https://www.linkedin.com/in/test-owner/',
  callToAction: 'Say hello',
  nav: [
    { label: 'Things', href: '#things' },
    { label: 'History', href: '#history' },
  ],
  themeColor: '#ffffff',
  backgroundColor: '#ffffff',
}

export const testServices: Services = {
  title: 'Things I make',
  subtitle: 'From sketch to server.',
  items: [
    {
      icon: Sparkles,
      title: 'Alpha service',
      text: 'Alpha text',
      stack: ['A1', 'A2'],
    },
    {
      icon: BrainCircuit,
      title: 'Beta service',
      text: 'Beta text',
      stack: ['B1'],
    },
    {
      icon: MonitorSmartphone,
      title: 'Gamma service',
      text: 'Gamma text',
      stack: ['C1'],
    },
  ],
}

export const testExperience: Experience = {
  title: 'Where I worked',
  jobs: [
    {
      period: '2030 — now',
      role: 'Lead Tester',
      organisation: 'Test Corp',
      highlights: ['Led the test team.', 'Shipped the test plan.'],
      tags: ['Vitest', 'Playwright'],
    },
    {
      period: '2020 — 2030',
      role: 'Junior Tester',
      organisation: 'Test Inc',
      highlights: ['Wrote the first tests.'],
      tags: ['Jest'],
    },
  ],
}

export const testImage: StaticImageData = {
  src: '/test-screenshot.png',
  width: 160,
  height: 100,
  blurDataURL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
}

export const testEducation: Education = {
  title: 'Where I studied',
  school: {
    name: 'Test University',
    logo: testImage,
    logoLabel: 'Test University logo',
    degrees: [
      {
        period: '2018 — 20',
        level: 'Master',
        field: 'Testing',
        award: {
          place: '1st place',
          label: 'Best test',
          thesis: 'Gold thesis',
          medal: 'gold',
        },
      },
      {
        period: '2014 — 18',
        level: 'Bachelor',
        field: 'Testing',
        award: {
          place: '2nd place',
          label: 'Runner-up test',
          thesis: 'Silver thesis',
          medal: 'silver',
        },
      },
    ],
  },
}

export const testProjects: Projects = {
  title: 'Things I shipped',
  subtitle: 'Two of them.',
  items: [
    {
      title: 'Pictured project',
      tags: ['Web app'],
      description: 'Has a screenshot.',
      url: 'https://pictured.example.test/',
      domain: 'pictured.example.test',
      image: testImage,
      imageLabel: 'pictured project screenshot',
    },
    {
      title: 'Bare project',
      tags: ['ML models', 'Web app'],
      description: 'Has no screenshot yet.',
      url: 'https://bare.example.test/',
      domain: 'bare.example.test',
      imageLabel: 'bare project screenshot',
    },
  ],
}

const testField = {
  label: 'Field',
  placeholder: 'Field',
  required: 'Fill this in.',
  tooLong: 'Too long.',
}

export const testContactForm: Contact['form'] = {
  name: testField,
  email: { ...testField, invalid: 'Not an email.' },
  message: testField,
  submit: 'Send',
  pending: 'Sending',
  success: { title: 'Got it', text: 'Talk soon.', again: 'Write again' },
  error: 'Something broke, write to',
  limited: 'Slow down a little.',
}
